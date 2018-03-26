import {
    connectMySQL,
    jsonpTransfer
} from '../../util/base';
import {
    queryGraph,
    queryTest,
    queryClusterDots,
    queryTripFlow,
    queryTreeMap,
    queryAngleClusterStats,
    queryAbnormalStats
} from '../../util/agg-utils';
import {
    mysqlParams
} from '../../conf/db';
import {
    initAngleClusterParams,
    initTreeMapParams,
    initAbnormalStatsParams
} from '../../util/params';
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

const treeMap = async (ctx, next) => {
    let params = ctx.query,
        cbFunc = params.callback;

    const queryParams = initTreeMapParams(params);

    let file = path.resolve(queryParams.ResFilePath, queryParams.ResFileName),
        ifResExist = fs.existsSync(file);

    // console.log("queryParams.seedStrength: ", queryParams.seedStrength)
    // let res = ifResExist ? JSON.parse(fs.readFileSync(file)) : await queryTreeMap(queryParams);
    let res = await queryTreeMap(queryParams);

    return ctx.body = jsonpTransfer(res, params);
}

const angleClusterStats = async (ctx, next) => {
    let params = ctx.query,
        cbFunc = params.callback;

    const queryParams = initAngleClusterParams(params);

    const res = await queryAngleClusterStats(queryParams);
    return ctx.body = jsonpTransfer(res, params);
}

const abnormalStats = async (ctx, next) => {
    let params = ctx.query,
        cbFunc = params.callback;

    const queryParams = initAbnormalStatsParams(params);

    const res = await queryAbnormalStats(queryParams);
    return ctx.body = jsonpTransfer(res, params);
}

export {
    testGraph,
    basicGraph,
    clusterDots,
    tripFlow,
    treeMap,
    angleClusterStats,
    abnormalStats
}