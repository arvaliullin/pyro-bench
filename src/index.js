import fs from 'fs';
import path from 'path';
import os from 'os';

import { performanceExperiments } from './performance/performance.js';

import './wasm_exec.js';

const cwd = process.cwd();
const filename = `${cwd}/public/lib_go.out.wasm`;
const source = fs.readFileSync(filename);
const typedArray = new Uint8Array(source);


const osType = os.type(); 
const outputDir = path.join(cwd, 'out', osType); 

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const runPerformanceExperiment = async (experimentId) => {
    const experiment = performanceExperiments[experimentId];
    console.log(`Выполнение эксперимента: ${experiment.experimentName}`);
    
    const performanceValues = await experiment.calculatePerformance();

    // Вычисление значения Acceleration для каждого измерения
    performanceValues.forEach(value => {
        value.Acceleration = value.JavaScript / value.WebAssembly;
    });

    const csvData = convertToCSV(performanceValues);
    fs.writeFileSync(path.join(outputDir, `${experimentId}.csv`), csvData);
    
    console.log(`Эксперимент ${experiment.experimentName} завершен.`);
};

const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
};

const runAllExperiments = async () => {
    for (const experimentId in performanceExperiments) {
        try {
            await runPerformanceExperiment(experimentId);
        } catch (error) {
            console.error(`Ошибка выполнения эксперимента ${experimentId}: ${error.message}`);
        }
    }
    console.log('Все эксперименты завершены.');
};

const runWasm = async () => {
    const go = new globalThis.Go();
    const result = await WebAssembly.instantiate(typedArray, go.importObject);
    go.run(result.instance);

    runAllExperiments().then(() => {
        console.log("Выполнение всех экспериментов успешно завершено.");
    });
};

runWasm();