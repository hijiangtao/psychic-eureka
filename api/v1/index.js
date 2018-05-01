import {
    jsonpTransfer
} from '../../util/base';
import {
    queryTest
} from '../../util/agg-utils';

const test = async (ctx, next) => {
    let queryParams = ctx.query;

    const res = await queryTest();
    return ctx.body = jsonpTransfer(res, queryParams);
}

export {
    test
}