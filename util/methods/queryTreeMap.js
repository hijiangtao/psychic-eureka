import {
    ExecutePythonFile
} from '../base';

export const queryTreeMap = async (params) => {
    const PyFilePath = params.PyFilePath,
        PyInputPath = params.PyInputPath;

    const treeNumRate = params.treeNumRate,
        searchAngle = params.searchAngle,
        seedStrength = params.seedStrength,
        treeWidth = params.treeWidth,
        spaceInterval = params.spaceInterval,
        lineDirection = params.lineDirection,
        timeSegID = params.timeSegID,
        jumpLength = params.jumpLength,
        seedUnit = params.seedUnit,
        gridDirNum = params.gridDirNum,
        delta = params.delta,
        maxDistance = params.maxDistance;

    params.Options = {
        mode: 'text',
        // pythonPath: 'path/to/python',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: PyFilePath,
        args: [PyInputPath, PyInputPath, timeSegID, treeNumRate, searchAngle, seedStrength, treeWidth, jumpLength, seedUnit, gridDirNum, delta, maxDistance]
    };

    let result = {};
    try {
        result = await ExecutePythonFile(params);
    } catch (e) {
        console.log('There was an error from PythonShell', e);
        result = {
            'error': e
        };
    } finally {
        return result;
    }
}