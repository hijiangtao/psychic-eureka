const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
import * as api from '../api/v1/index.js';

router
    .get('/testGraph', api.testGraph)
    .all('/basicGraph', api.basicGraph)
    .all('/clusterDots', api.clusterDots)
    .all('/tripFlow', api.tripFlow)
    .all('/treeMap', api.treeMap);

module.exports = router;