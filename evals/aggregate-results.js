// Aggregates the latest promptfoo eval results per provider and per skill.
const {createClient} = require('@libsql/client');
const os = require('node:os');

(async () => {
	const client = createClient({url: `file://${os.homedir()}/.promptfoo/promptfoo.db`});
	const res = await client.execute(
		'SELECT provider, test_case, success, failure_reason, grading_result FROM eval_results ORDER BY id'
	);
	const byProvider = new Map();
	const bySkill = new Map();
	const byProviderSkill = new Map();
	const byProviderCaseType = new Map();
	const failureSamples = [];
	for (const row of res.rows) {
		const testCase = JSON.parse(row.test_case ?? '{}');
		const skill = testCase.vars?.skill_name ?? '(unknown)';
		const provider = row.provider ?? '(unknown)';
		const success = Number(row.success) === 1;
		const caseType = testCase.vars?.case_type ?? '(unknown)';
		for (const m of [byProvider, bySkill, byProviderSkill, byProviderCaseType]) {
			const key =
				m === byProvider
					? provider
					: m === bySkill
						? skill
						: m === byProviderSkill
							? `${provider} | ${skill}`
							: `${provider} | ${caseType}`;
			const entry = m.get(key) ?? {pass: 0, fail: 0};
			success ? entry.pass++ : entry.fail++;
			m.set(key, entry);
		}
		if (!success && failureSamples.length < 8) {
			const grading = JSON.parse(row.grading_result ?? '{}');
			const reason =
				(grading.componentResults ?? []).map(c => c.reason).join(' ') || grading.reason || '';
			failureSamples.push({provider, skill, id: testCase.description, reason});
		}
	}
	console.log('=== By provider ===');
	for (const [k, v] of byProvider) {
		console.log(`${k}: ${v.pass} passed, ${v.fail} failed`);
	}
	console.log('\n=== By skill ===');
	for (const [k, v] of bySkill) {
		console.log(`${k}: ${v.pass} passed, ${v.fail} failed`);
	}
	console.log('\n=== By provider x skill ===');
	for (const [k, v] of byProviderSkill) {
		console.log(`${k}: ${v.pass} passed, ${v.fail} failed`);
	}
	console.log('\n=== By provider x case type ===');
	for (const [k, v] of byProviderCaseType) {
		console.log(`${k}: ${v.pass} passed, ${v.fail} failed`);
	}
	console.log('\n=== Failure samples ===');
	for (const f of failureSamples) {
		console.log(`\n--- ${f.provider} | ${f.id}`);
		console.log(String(f.reason).slice(0, 350));
	}
})().catch(e => {
	console.error('ERR:', e.message);
	process.exit(1);
});
