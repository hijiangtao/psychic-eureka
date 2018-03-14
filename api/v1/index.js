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
let fs = require('fs');
let path = require('path');

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

const treeMap = async (ctx, next) => {
    let queryParams = ctx.query,
        cbFunc = queryParams.callback;
    // 传输参数初始化处理
    const treeNum = queryParams.treeNum ? queryParams.treeNum : 150,
        searchAngle = queryParams.searchAngle ? queryParams.searchAngle : 60,
        seedStrength = queryParams.seedStrength ? queryParams.seedStrength : 0.1,
        spaceInterval = queryParams.spaceInterval ? queryParams.spaceInterval : 200,
        lineDirection = 'from'; // queryParams.lineDirection ? queryParams.lineDirection : 'from';

    const FileName = `tmres-angle-9_${treeNum}_${searchAngle}_${seedStrength}_${spaceInterval}`,
        FilePath = '/datahouse/taojiang/bj-byhour-res';
    queryParams.ResFileName = FileName;
    queryParams.ResFilePath = FilePath;

    let file = path.resolve(FilePath, FileName),
        ifResExist = fs.existsSync(file);
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