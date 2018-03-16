import {
    connectMySQL,
    jsonpTransfer,
    NumberToDecimal2
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

/**
 * treeMap 传输参数初始化处理
 * @param {*} queryParams 
 */
const initTreeMapParams = (queryParams) => {
    let res = {}

    res.timeSegID = queryParams.timeSegID ? queryParams.timeSegID : '9';
    res.treeNumRate = queryParams.treeNumRate ? NumberToDecimal2(queryParams.treeNumRate) : '0.10';
    res.searchAngle = queryParams.searchAngle ? queryParams.searchAngle : 60;
    res.seedStrength = queryParams.seedStrength ? NumberToDecimal2(queryParams.seedStrength) : '0.10';
    res.treeWidth = queryParams.treeWidth ? queryParams.treeWidth : 1;
    res.spaceInterval = queryParams.spaceInterval ? queryParams.spaceInterval : 200;
    res.jumpLength = queryParams.jumpLength ? queryParams.jumpLength : 3;
    res.lineDirection = 'from'; // queryParams.lineDirection ? queryParams.lineDirection : 'from';
    res.seedUnit = queryParams.seedUnit ? queryParams.seedUnit : 'basic';
    res.gridDirNum = queryParams.gridDirNum ? queryParams.gridDirNum : -1;

    // console.log(queryParams.seedStrength);
    const FileName = `tmres-angle-${res.timeSegID}_${res.treeNumRate}_${res.searchAngle}_${res.seedStrength}_${res.treeWidth}_${res.jumpLength}_${res.seedUnit}_${res.gridDirNum}`,
        FilePath = `/datahouse/tripflow/${res.spaceInterval}/bj-byhour-res`;

    res.PyInputPath = `/datahouse/tripflow/${res.spaceInterval}`;
    res.ResFileName = FileName;
    res.ResFilePath = FilePath;
    res.PyFilePath = '/home/taojiang/git/statePrediction';
    res.PyFileName = 'treeMapCal.py';

    return res;
}

const treeMap = async (ctx, next) => {
    let params = ctx.query,
        cbFunc = params.callback;

    const queryParams = initTreeMapParams(params);

    let file = path.resolve(queryParams.ResFilePath, queryParams.ResFileName),
        ifResExist = fs.existsSync(file);

    console.log("queryParams.seedStrength: ", queryParams.seedStrength)
    // let res = ifResExist ? JSON.parse(fs.readFileSync(file)) : await queryTreeMap(queryParams);
    let res = await queryTreeMap(queryParams);

    return ctx.body = jsonpTransfer(res, queryParams);
}

export {
    testGraph,
    basicGraph,
    clusterDots,
    tripFlow,
    treeMap
}