// promptfoo custom provider for the BIT AI model gateway (r.models.koby.admin.ch).
//
// The gateway is OpenAI-compatible (chat-completions). Each model is a separate
// deployment with its own URL, so the provider resolves the URL per model id.
// The API key comes from the BIT_LLM_API_KEY env var, sourced from
// ~/.agent-credentials/env. It is never logged or written to eval output.
//
// Deployment ids differ from the URL slugs (e.g. id glm-5-3-flash-r lives at
// .../glm-5.3-flash/v1), so the mapping below is explicit.
//
// promptfoo instantiates one provider per YAML entry; the entry's config.model
// selects the deployment. Multiple entries can share this file with different
// labels and configs.

const MODEL_URLS = {
	'nvidia-nemotron-3-ultra-550b-r':
		'https://r.models.koby.admin.ch/ai-model/nvidia-nemotron-3-ultra-550b/shared/v1',
	'deepseek-v4-flash-0731-r':
		'https://r.models.koby.admin.ch/ai-model/deepseek-v4-flash-0731/shared/v1',
	'koby-medium': 'https://r.models.koby.admin.ch/ai-model/koby-medium/v1',
	'glm-5-3-flash-r': 'https://r.models.koby.admin.ch/ai-model/glm-5.3-flash/v1',
};

// Reasoning models can spend many tokens thinking before the first content
// token. The gateway returns reasoning separately from content, so a generous
// cap keeps answers from being cut off mid-thought (finish_reason: length).
// glm-5-3-flash-r exhausted a 4096 cap on reasoning alone in the first full
// run; 32768 is the documented max output for the smallest-output model.
const DEFAULT_MAX_TOKENS = 32768;

class BitModelProvider {
	constructor(options) {
		this.config = options?.config ?? {};
		this.modelId = this.config.model ?? null;
		// When true, the skill body (vars.skill_content) is prepended to the
		// prompt so the eval measures the skill's guidance, not the bare model.
		this.injectSkill = this.config.inject_skill ?? false;
	}

	id() {
		return this.modelId ? `bit:${this.modelId}` : 'bit:model';
	}

	async callApi(prompt, context) {
		const apiKey = process.env.BIT_LLM_API_KEY;
		if (!apiKey) {
			return {
				error:
					'BIT_LLM_API_KEY is not set. Source ~/.agent-credentials/env before running evals.',
			};
		}
		if (!this.modelId) {
			return {error: 'No model configured. Set config.model on the provider entry.'};
		}
		const url = MODEL_URLS[this.modelId];
		if (!url) {
			return {
				error: `Unknown BIT model id: ${this.modelId}. Known ids: ${Object.keys(MODEL_URLS).join(', ')}`,
			};
		}
		if (!prompt) {
			return {error: 'No prompt received'};
		}

		const skillContent = this.injectSkill ? context?.vars?.skill_content : null;
		const actualPrompt = skillContent
			? `${skillContent}\n\n---\n\nTask:\n${prompt}`
			: prompt;

		const response = await fetch(`${url}/chat/completions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: this.modelId,
				messages: [{role: 'user', content: actualPrompt}],
				max_tokens: this.config.max_tokens ?? DEFAULT_MAX_TOKENS,
			}),
		});

		if (!response.ok) {
			const body = await response.text();
			return {error: `BIT gateway returned ${response.status}: ${body.slice(0, 300)}`};
		}

		const data = await response.json();
		const choice = data.choices?.[0] ?? {};
		const message = choice.message ?? {};

		return {
			output: message.content ?? '',
			// Report what was actually sent so the web UI shows whether the
			// skill body was part of the prompt.
			prompt: actualPrompt,
			// Reasoning is exposed separately so graders can inspect it without
			// it leaking into the graded output.
			metadata: {
				reasoning: message.reasoning ?? null,
				finish_reason: choice.finish_reason ?? null,
			},
			tokenUsage: data.usage
				? {
						total: data.usage.total_tokens,
						prompt: data.usage.prompt_tokens,
						completion: data.usage.completion_tokens,
					}
				: undefined,
		};
	}
}

module.exports = BitModelProvider;
