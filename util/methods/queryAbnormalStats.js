import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import {
    parseFormatGID
} from '../base';

const reverseSort = (a, b) => {
    return b[3] - a[3];
}

const optCSV = (file) => {
    return new Promise((resolve, reject) => {
        let res = {
            'from': [],
            'to': []
        };

        csv({
                noheader: true
            })
            .fromFile(file)
            .on('csv', (csvRow) => {
                let [gid, fromCount, toCount] = csvRow;
                fromCount = Number.parseInt(fromCount);
                toCount = Number.parseInt(toCount);
                const {
                    lat,
                    lng
                } = parseFormatGID(gid);
                res['from'].push([gid, lng, lat, fromCount]);
                res['to'].push([gid, lng, lat, toCount]);
            })
            .on('done', (error) => {
                res['from'].sort(reverseSort);
                res['to'].sort(reverseSort);
                resolve(res);
            })
    });

}

export const queryAbnormalStats = async ({
    ResFileName,
    ResFilePath
}) => {
    let file = path.resolve(ResFilePath, ResFileName),
        ifResExist = fs.existsSync(file),
        res = {};
    if (ifResExist) {
        res = await optCSV(file);
    }

    return res;
}