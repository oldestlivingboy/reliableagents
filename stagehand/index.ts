import 'dotenv/config';
import filesystem from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import { Stagehand } from '@browserbasehq/stagehand';

const runnerRoot = path.dirname(fileURLToPath(import.meta.url));
const tasksCsv = path.resolve(runnerRoot, '../../webbenchfinal.csv');
const resultsCsv = path.resolve(runnerRoot, '../../results/stagehand.csv');
let fromTaskOrdinal: number;
let toTaskOrdinal: number;

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);

  process.exit(1);
});

if (process.argv.length == 4) {
  fromTaskOrdinal = Number(process.argv[2]);
  toTaskOrdinal = Number(process.argv[3]);
} else {
  console.error('Usage: npm start -- from_task_ordinal to_task_ordinal');

  process.exit(1);
}

const taskRows = parse(
  filesystem.readFileSync(tasksCsv, 'utf8'),
  { columns: true, skip_empty_lines: true }
) as any[];

(async () => {
  const stagehand = new Stagehand({ env: 'BROWSERBASE' });

  await stagehand.init();

  console.log(
    `Live Stagehand session: https://browserbase.com/sessions/${stagehand.browserbaseSessionID}\n`
  );

  const agent = stagehand.agent({
    instructions: 'You’re a helpful assistant that can control a web browser.'
  });

  for (let i = fromTaskOrdinal - 1; i < toTaskOrdinal && i < taskRows.length; i++) {
    const taskOrdinal = i + 1;
    const id = taskRows[i].ID;
    const url = taskRows[i]['Starting URL'];
    const task = taskRows[i].Task;
    const category = taskRows[i].Category;

    if (!id || !url || !task || !category) throw new Error(`Task row #${taskOrdinal} malformed`);

    console.log(`${taskOrdinal}. URL: ${url}\nTask: ${task}\n`);

    try {
      await stagehand.page.goto(url);

      const result = await agent.execute(task);

      console.log('Result:', result);
    } catch (error: any) {
      console.error('Task execution failure:', error.message);
    }
  }

  await stagehand.close();
})();
