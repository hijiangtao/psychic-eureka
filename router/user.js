const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
import * as api from '../api/v1/index.js';

router
    .get('/testGraph', api.testGraph)
    .get('/basicGraph', api.basicGraph)
    .get('/clusterDots', api.clusterDots)
    .get('/tripFlow', api.tripFlow)
    .get('/treeMap', api.treeMap)
    .get('/angleClusterStats', api.angleClusterStats)
    .get('/abnormalStats', api.abnormalStats);

module.exports = router;