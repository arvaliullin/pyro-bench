import fs from 'fs';
import { performanceExperiments } from './performance/performance.js';

import './wasm_exec.js';

const cwd = process.cwd();
const filename = `${cwd}/public/lib_go.out.wasm`;
const source = fs.readFileSync(filename);
const typedArray = new Uint8Array(source);



const runPerformanceExperiment = async (experimentId) => {
    const experiment = performanceExperiments[experimentId];
    return experiment.calculatePerformance();
    };

const handleRecalculate = async () => {
    const experimentId = "fibonacciRecursive";
    runPerformanceExperiment(experimentId)
        .then((performanceValues) => {
            console.log(performanceValues);
        })
        .catch(() => {
            console.error("Error");
        });
};

const runWasm = async () => {
    const go = new globalThis.Go();
    const result = await WebAssembly.instantiate(typedArray, go.importObject);
    go.run(result.instance);

    handleRecalculate().then(() => {
        console.log("Success");
    });
};

runWasm();