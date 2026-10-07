// Builds promptfoo test cases from the per-skill evals.json files.
//
// Each eval case becomes one promptfoo test with vars.prompt and a
// llm-rubric assertion derived from expected_output. The generator reads the
// five skills/*/evals/evals.json files at run time, so new eval cases need no
// changes here.
//
// Usage: node evals/build-tests.js > evals/generated-tests.json

const fs = require('node:fs');
const path = require('node:path');

const skillsDir = path.join(__dirname, '..', 'skills');

// Behavior cases get the skill body injected into the prompt, so the eval
// measures the skill's guidance rather than the bare model. Near-miss cases
// (expected_output starts with "Does not") stay bare: they test that the
// model does not route the task to Oblique skills.
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

function loadEvals() {
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
}

const tests = loadEvals();
fs.writeFileSync(path.join(__dirname, 'generated-tests.json'), JSON.stringify(tests, null, '\t'));
console.log(`Wrote ${tests.length} test cases to evals/generated-tests.json`);
