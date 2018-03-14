import {
    connectMySQL,
    jsonpTransfer
} from '../../util/base';
import {
    queryGraph,
    queryTest,
    queryClusterDots,
    queryTripFlow,
    queryTreeMap
} from '../../util/agg-utils';
import {
    mysqlParams
} from '../../conf/db';
import path from 'path';
import fs from 'fs';

const mysqlPool = connectMySQL(mysqlParams);

const NumberToDecimal2 = (num) => {
    num = Number.parseFloat(num);

    return num.toFixed(2);
}

const testGraph = async (ctx, next) => {
    ctx.body = await queryTest(mysqlPool);
}

/**
 * 基本图查询后台 API 实现
 * @param {*} ctx 
 * @param {*} next 
 */
const basicGraph = async (ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;

    const res = await queryGraph({
        mysqlPool
    }, queryParams);
    return ctx.body = jsonpTransfer(res, queryParams);
}

const clusterDots = async (ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;

    const res = await queryClusterDots({
        mysqlPool
    }, queryParams);
    return ctx.body = jsonpTransfer(res, queryParams);
}

const tripFlow = async (ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;

    const res = await queryTripFlow({
        mysqlPool
    }, queryParams);
    return ctx.body = jsonpTransfer(res, queryParams);
}

const treeMap = async (ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;
    // 传输参数初始化处理
    queryParams.treeNum = queryParams.treeNum ? queryParams.treeNum : 150;
    queryParams.searchAngle = queryParams.searchAngle ? queryParams.searchAngle : 60;
    queryParams.seedStrength = NumberToDecimal2(queryParams.seedStrength) ? queryParams.seedStrength : '0.10';
    queryParams.treeWidth = queryParams.treeWidth ? queryParams.treeWidth : 1;
    queryParams.spaceInterval = queryParams.spaceInterval ? queryParams.spaceInterval : 200;
    queryParams.lineDirection = 'from'; // queryParams.lineDirection ? queryParams.lineDirection : 'from';

    // console.log(queryParams.seedStrength);
    const FileName = `tmres-angle-9_${queryParams.treeNum}_${queryParams.searchAngle}_${queryParams.seedStrength}`,
        FilePath = `/datahouse/tripflow/${queryParams.spaceInterval}/bj-byhour-res`;

    queryParams.PyInputPath = `/datahouse/tripflow/${queryParams.spaceInterval}`;
    queryParams.ResFileName = FileName;
    queryParams.ResFilePath = FilePath;
    queryParams.PyFilePath = '/home/taojiang/git/statePrediction';
    queryParams.PyFileName = 'treeMapCal.py';

    let file = path.resolve(FilePath, FileName),
        ifResExist = fs.existsSync(file);

    console.log("queryParams.seedStrength: ", queryParams.seedStrength)
    let res = ifResExist ? JSON.parse(fs.readFileSync(file)) : await queryTreeMap(queryParams);


    return ctx.body = jsonpTransfer(res, queryParams);
}

export {
    testGraph,
    basicGraph,
    clusterDots,
    tripFlow,
    treeMap
}