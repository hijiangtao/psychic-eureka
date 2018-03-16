import PythonShell from 'python-shell';
import path from 'path';
import fs from 'fs';

const ExecutePythonFile = async ({
    ResFileName,
    ResFilePath,
    PyFileName,
    Options
}) => {
    return new Promise((resolve, reject) => {
        PythonShell.run(PyFileName, Options, (error, result) => {
            // console.log(error);
            if (error) reject(error);
            // results is an array consisting of messages collected during execution
            // console.log("FileName", file);
            let file = path.resolve(ResFilePath, ResFileName),
                ifResExist = fs.existsSync(file);
            if (ifResExist) {
                const res = JSON.parse(fs.readFileSync(file));
                resolve(res);
            } else {
                reject("No data of this timeSegID!");
            }
        });
    })
}

export const queryTreeMap = async (params) => {
    const PyFilePath = params.PyFilePath,
        PyInputPath = params.PyInputPath;

    const treeNumRate = params.treeNumRate,
        searchAngle = params.searchAngle,
        seedStrength = params.seedStrength,
        treeWidth = params.treeWidth,
        spaceInterval = params.spaceInterval,
        lineDirection = params.lineDirection,
        timeSegID = queryParams.timeSegID,
        jumpLength = params.jumpLength,
        seedUnit = params.seedUnit,
        gridDirNum = params.gridDirNum;

    params.Options = {
        mode: 'text',
        // pythonPath: 'path/to/python',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: PyFilePath,
        args: [PyInputPath, PyInputPath, timeSegID, treeNumRate, searchAngle, seedStrength, treeWidth, jumpLength, seedUnit, gridDirNum]
    };

    let result = {};
    try {
        result = await ExecutePythonFile(params);
    } catch (e) {
        console.log('There was an error from PythonShell', e);
        // console.log(e);
        result = {
            'error': e
        };
    } finally {
        return result;
    }
}