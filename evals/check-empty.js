// Counts empty model outputs per model and checks finish reasons.
const {createClient} = require('@libsql/client');
const os = require('node:os');

(async () => {
	const client = createClient({url: `file://${os.homedir()}/.promptfoo/promptfoo.db`});
	const res = await client.execute('SELECT provider, response, error FROM eval_results ORDER BY id');
	let emptyCount = 0;
	const emptyByModel = {};
	const finishByModel = {};
	for (const row of res.rows) {
		const resp = JSON.parse(row.response ?? '{}');
		const out = resp.output ?? '';
		const model = JSON.parse(row.provider ?? '{}').label ?? row.provider;
		const finish = resp.metadata?.finish_reason ?? '(none)';
		finishByModel[model] = finishByModel[model] ?? {};
		finishByModel[model][finish] = (finishByModel[model][finish] ?? 0) + 1;
		if (!out || String(out).trim() === '') {
			emptyCount++;
			emptyByModel[model] = (emptyByModel[model] ?? 0) + 1;
		}
	}
	console.log('empty outputs:', emptyCount, 'of', res.rows.length);
	console.log('empty by model:', JSON.stringify(emptyByModel, null, 2));
	console.log('finish reasons by model:', JSON.stringify(finishByModel, null, 2));
})().catch(e => {
	console.error('ERR:', e.message);
	process.exit(1);
});
