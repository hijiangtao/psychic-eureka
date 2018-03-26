import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import {
    parseFormatGID
} from '../base';

/**
 * 基于给定的第三栏属性进行从高到低的排列
 * @param {*} a 
 * @param {*} b 
 */
const reverseSort = (index) => {
    return (a, b) => {
        return b[index] - a[index];
    }
}

/**
 * 读取 CSV 文件并组成 JSON 格式对象返回
 * @param {*} file 
 */
const optCSV = (file, cols) => {
    return new Promise((resolve, reject) => {
        let res = {
            'from': [],
            'to': []
        };

        // 通过 csv 将文件切开
        csv({
                noheader: true
            })
            .fromFile(file)
            .on('csv', (csvRow) => {
                let [gid] = csvRow;
                const {
                    lat,
                    lng
                } = parseFormatGID(gid);

                let fromArray = [gid, lng, lat, Number.parseFloat(csvRow[cols[0]])],
                    toArray = [gid, lng, lat, Number.parseFloat(csvRow[cols[1]])];

                cols.forEach(e => {

                })
                res['from'].push(fromArray);
                res['to'].push(toArray);
            })
            .on('done', (error) => {
                res['from'].sort(reverseSort(3));
                res['to'].sort(reverseSort(3));
                resolve(res);
            })
    });
}

/**
 * 异常值查询数据列对应查询表
 */
const abnormalNameList = {
    'flow': [1, 2],
    'record': [-1],
    'ano1': [3, 4],
    'ano2': [5, 6]
}


export const queryAbnormalStats = async ({
    AnoResFileName,
    AnoResFilePath,
    RecResFileName,
    RecResFilePath,
    type
}) => {
    let ResFileName = type === 'record' ? RecResFileName : AnoResFileName,
        ResFilePath = type === 'record' ? RecResFilePath : AnoResFilePath;

    let file = path.resolve(ResFilePath, ResFileName),
        ifResExist = fs.existsSync(file),
        res = {};
    if (ifResExist) {
        res = type === 'record' ? JSON.parse(fs.readFileSync(file)) : await optCSV(file, abnormalNameList[type]);
    }

    return res;
}