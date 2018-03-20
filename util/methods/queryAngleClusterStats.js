import {
    ExecutePythonFile
} from '../base';

export const queryAngleClusterStats = async (params) => {
    const PyFilePath = params.PyFilePath,
        PyInputPath = params.PyInputPath;

    const timeSegID = params.timeSegID,
        eps = params.eps,
        min_samples = params.min_samples;

    params.Options = {
        mode: 'text',
        // pythonPath: 'path/to/python',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: PyFilePath,
        args: [PyInputPath, PyInputPath, timeSegID, eps, min_samples]
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