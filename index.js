
module.exports = {
    "DBSCAN_KDTREE": require('./DBSCAN-KDTREE.js'),
    "DBSCAN": require('density-clustering').DBSCAN,
    "OPTICS_KDTREE": require('./OPTICS-KDTREE.js'),
    "OPTICS": require('density-clustering').OPTICS,
    "KMEANS": require('density-clustering').KMEANS
};