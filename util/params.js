/**
 * MySQL 表名常量
 */
export const SQLParams = {
    ver: ['v1', 'v2'],
    nTableName: {
        'a': {
            'v1': 'anode',
            'v2': 'anodev2'
        },
        'g': {
            'v1': 'nodes',
            'v2': 'nodes'
        },
        'p': {
            'v1': 'pnode',
            'v2': 'pnode'
        }
    },
    eTableName: {
        'aa': {
            'v1': 'aaedge',
            'v2': 'aaedgev2'
        },
        'gg': {
            'v1': 'edges',
            'v2': 'edges'
        },
        'pp': {
            'v1': 'ppedge',
            'v2': 'ppedge'
        },
        'ap': {
            'v1': 'apedge',
            'v2': 'apedge'
        },
        'pa': {
            'v1': 'paedge',
            'v2': 'paedge'
        },
    }
}

/**
 * 将普通数值字符串转化为保留两位小数的字符串
 * @param {String or Number} num 
 */
export const NumberToDecimal2 = (num) => {
    try {
        num = Number.parseFloat(num);
    } catch (error) {
        num = 0.10;
    } finally {
        return num.toFixed(2);
    }
}

/**
 * treeMap 传输参数初始化处理
 * @param {*} queryParams 
 */
export const initTreeMapParams = (queryParams) => {
    let res = {}

    res.timeSegID = queryParams.timeSegID ? queryParams.timeSegID : '9';
    res.treeNumRate = queryParams.treeNumRate ? NumberToDecimal2(queryParams.treeNumRate) : '0.10';
    res.searchAngle = queryParams.searchAngle ? queryParams.searchAngle : 60;
    res.seedStrength = queryParams.seedStrength ? NumberToDecimal2(queryParams.seedStrength) : '0.10';
    res.treeWidth = queryParams.treeWidth ? queryParams.treeWidth : 1;
    res.spaceInterval = queryParams.spaceInterval ? queryParams.spaceInterval : 200;
    res.jumpLength = queryParams.jumpLength ? queryParams.jumpLength : 3;
    res.jumpLength = res.treeWidth > 1 ? 1 : res.jumpLength;

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
    res.delta = queryParams.delta ? queryParams.delta : -1.0;
    res.maxDistance = queryParams.maxDistance ? queryParams.maxDistance : 9999;

    return res;
}

/**
 * 初始化角度聚类结果查询参数
 * @param {*} params 
 */
export const initAngleClusterParams = (params) => {
    let res = {};

    res.timeSegID = params.timeSegID ? params.timeSegID : '9';
    res.eps = params.eps ? params.eps : 2.5;
    res.min_samples = params.min_samples ? params.min_samples : 300;

    res.PyInputPath = '/datahouse/tripflow/200';
    res.ResFileName = `acres-${res.timeSegID}`;
    res.ResFilePath = '/datahouse/tripflow/200/bj-byhour-res';
    res.PyFilePath = '/home/taojiang/git/statePrediction';
    res.PyFileName = 'angleClusterCal.py';

    return res;
}

/**
 * 初始化异常检测以及流量分布的输入参数
 * @param {*} param0 
 */
export const initAbnormalStatsParams = (params) => {
    let res = {};

    res.timeSegID = params.timeSegID ? params.timeSegID : '9';
    res.hourID = params.hourID ? params.hourID : '9';
    res.type = params.type ? params.type : 'flow';
    res.AnoResFileName = `ano-${res.hourID}-${res.timeSegID}`;
    res.AnoResFilePath = '/datahouse/tripflow/ano_detect/200/bj-byhour-ano';
    res.RecResFileName = `recfreq-${res.timeSegID}.json`;
    res.RecResFilePath = '/datahouse/tripflow/test/bj-byhour-freq';

    return res;
}