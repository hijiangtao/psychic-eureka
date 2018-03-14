import PythonShell from 'python-shell';
import path from 'path';
import fs from 'fs';

const ExecutePythonFile = async ({
    ResFileName,
    PyFilePath,
    PyFileName,
    Options
}) => {
    return new Promise((resolve, reject) => {
        PythonShell.run(ResFileName, Options, (error, result) => {
            // console.log(error);
            if (error) reject(error);
            // results is an array consisting of messages collected during execution
            let file = path.resolve(PyFilePath, PyFileName),
                ifResExist = fs.existsSync(file);
            if (ifResExist) {
                res = JSON.parse(fs.readFileSync(file));
                resolve(res);
            }
        });
    })
}

export const queryTreeMap = async (params) => {
    const ResFileName = params.ResFileName,
        ResFilePath = params.ResFilePath;

    const treeNum = params.treeNum,
        searchAngle = params.searchAngle,
        seedStrength = params.seedStrength,
        treeWidth = params.treeWidth,
        spaceInterval = params.spaceInterval,
        lineDirection = params.lineDirection,
        PyFilePath = params.PyFilePath,
        PyFileName = params.PyFileName,
        hourIndex = 9,
        jumpLength = 3;

    params.Options = {
        mode: 'text',
        // pythonPath: 'path/to/python',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: ResFilePath,
        args: [PyFilePath, PyFilePath, hourIndex, treeNum, searchAngle, seedStrength, treeWidth, jumpLength]
    };

    try {
        const result = await ExecutePythonFile(params);
        return result;
    } catch (e) {
        console.log('There was an error from PythonShell', e);
        // console.log(e);
        return {
            'error': e
        };
    }
}