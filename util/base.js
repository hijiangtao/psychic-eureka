/**
 * 判断 data 是否需要转换为 JSONP 格式
 * @param {*} data 
 * @param {*} params 
 */
export const jsonpTransfer = (data, params) => {
    const callback = params.callback;
    if (callback) {
        return `${callback}(${JSON.stringify(data)})`;
    } else {
        return data;
    }
}