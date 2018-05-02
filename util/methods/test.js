/**
 * 测试服务
 * @param {*} pool 
 * @param {*} queryparams 
 */
export const test = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                'result': "Hello World!"
            })
        }, 1000);
    });
}