// promptfoo test generator: loads the per-skill evals.json files at run time.
//
// Referenced from promptfooconfig.yaml as `tests: file://generate-tests.js`.
// promptfoo calls the exported function on every eval, so new or changed eval
// cases need no build step and no generated artifact.
//
// Each eval case becomes one promptfoo test with vars.prompt and an
// llm-rubric assertion derived from expected_output. Behavior cases get the
// skill body injected into the prompt, so the eval measures the skill's
// guidance rather than the bare model. Near-miss cases (expected_output
// starts with "Does not") stay bare: they test that the model does not route
// the task to Oblique skills.

const fs = require('node:fs');
const path = require('node:path');

const skillsDir = path.join(__dirname, '..', 'skills');

function loadSkillBody(skill) {
	const skillPath = path.join(skillsDir, skill, 'SKILL.md');
	if (!fs.existsSync(skillPath)) {
		return null;
	}
	return fs
		.readFileSync(skillPath, 'utf8')
		.replace(/^---\n[\s\S]*?\n---\n/, '')
		.trim();
}

module.exports = async function () {
	const tests = [];
	for (const skill of fs.readdirSync(skillsDir)) {
		const evalsPath = path.join(skillsDir, skill, 'evals', 'evals.json');
		if (!fs.existsSync(evalsPath)) {
			continue;
		}
		const parsed = JSON.parse(fs.readFileSync(evalsPath, 'utf8'));
		const skillBody = loadSkillBody(skill);
		for (const evalCase of parsed.evals) {
			const isNearMiss = /^Does not/i.test(evalCase.expected_output);
			const vars = {
				prompt: evalCase.prompt,
				skill_name: parsed.skill_name,
				eval_id: String(evalCase.id),
				case_type: isNearMiss ? 'trigger' : 'behavior',
			};
			if (!isNearMiss && skillBody) {
				vars.skill_content = skillBody;
			}
			tests.push({
				description: `${parsed.skill_name} #${evalCase.id}`,
				vars,
				assert: [
					{
						type: 'llm-rubric',
						value: evalCase.expected_output,
					},
				],
			});
		}
	}
	return tests;
};
