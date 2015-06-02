module.exports = {
    "DBSCAN_KDTREE": require('./DBSCAN-KDTREE.js'),
    "DBSCAN_KDTREE": require('./OPTICS-KDTREE.js'),
    DBSCAN: require('density-clustering').DBSCAN,
    PriorityQueue: require('density-clustering').PriorityQueue,
    OPTICS: require('density-clustering').OPTICS
};