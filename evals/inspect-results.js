// Inspects the latest promptfoo eval results: per-assertion pass/fail reasons.
// Reads the promptfoo sqlite database with @libsql/client (already installed
// with promptfoo; better-sqlite3 lacks a linux prebuilt here).
const {createClient} = require('@libsql/client');
const os = require('node:os');

(async () => {
	const client = createClient({url: `file://${os.homedir()}/.promptfoo/promptfoo.db`});
	const res = await client.execute(
		'SELECT id, test_case, success, failure_reason, grading_result FROM eval_results ORDER BY id DESC LIMIT 20'
	);
	for (const row of res.rows) {
		const testCase = JSON.parse(row.test_case ?? '{}');
		console.log('=== id:', row.id, '| success:', row.success, '| provider:', row.provider);
		console.log('  description:', testCase.description ?? '(none)');
		if (row.failure_reason) {
			console.log('  failure:', String(row.failure_reason).slice(0, 500));
		}
		const grading = JSON.parse(row.grading_result ?? '{}');
		for (const c of grading.componentResults ?? []) {
			console.log('  assertion:', c.assertion?.type, '| pass:', c.pass);
			console.log('  reason:', String(c.reason).slice(0, 400));
		}
		if (!(grading.componentResults ?? []).length && grading.reason) {
			console.log('  grading reason:', String(grading.reason).slice(0, 400));
		}
	}
})().catch(e => {
	console.error('ERR:', e.message);
	process.exit(1);
});


