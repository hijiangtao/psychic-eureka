import PythonShell from 'python-shell';

const ExecutePythonFile = async ({
    FileName,
    Options
}) => {
    return new Promise((resolve, reject) => {
        PythonShell.run(FileName, Options, (error, result) => {
            if (error) reject(false);
            // results is an array consisting of messages collected during execution
            let file = path.resolve(Options.scriptPath, FileName),
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
    let Options = {
        mode: 'text',
        // pythonPath: 'path/to/python',
        // pythonOptions: ['-u'], // get print results in real-time
        scriptPath: ResFilePath,
        args: ['value1', 'value2', 'value3']
    };

    const result = await ExecutePythonFile({
        ResFileName,
        Options
    });

    return result ? result : {};
}