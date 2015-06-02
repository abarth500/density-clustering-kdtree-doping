/**
 * DBSCAN - Density based clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * DBSCAN class construcotr
 * @constructor
 * 
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {DBSCAN}
 */

var createKDTree = require("static-kdtree");
var DBSCAN = function(dataset, epsilon, minPts, distanceFunction) {

    /** @type {createKDTree} */
    this.tree = null;
    /** @type {Array} */
    this.dataset = [];
    /** @type {number} */
    /** @type {number} */
    this.epsilon = 1;
    /** @type {number} */
    this.minPts = 2;
    /** @type {function} */
    this.distance = this._euclideanDistance;
    /** @type {Array} */
    this.clusters = [];
    /** @type {Array} */
    this.noise = [];
    
    /** @type {Array} */
    this._visited = [];
    /** @type {Array} */
    this._assigned = [];
        
    this._init(dataset, epsilon, minPts, distanceFunction);    
};

/******************************************************************************/
// public functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction 
 * @returns {undefined}
 * @access public
 */
DBSCAN.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
    this._init(dataset, epsilon, minPts, distanceFunction);

    for (var pointId = 0, l = this.dataset.length; pointId < l; pointId++) {
        // if point is not visited, check if it forms a cluster
        if (this._visited[pointId] !== 1) {
            this._visited[pointId] = 1;

            // if closest neighborhood is too small to form a cluster, mark as noise
            var neighbors = this._regionQuery(pointId);

            // create new cluster aroud point and add neighbors
            var clusterId = this.clusters.length;
            this.clusters.push([pointId]);
            this._assigned[pointId] = 1;

            if (neighbors.length < this.minPts) {
                this.noise.push(pointId);
            } else {
                this._expandCluster(clusterId, neighbors);
            }
        }
    }

    return this.clusters;
};
    
/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction 
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._init = function(dataset, epsilon, minPts, distanceFunction) {
    if (dataset) {
        if (!(dataset instanceof Array)) {
            throw Error('Dataset must be of type array, ' + typeof dataset + ' given');
            return;
        }
        this.tree = createKDTree(dataset);
        this.dataset = dataset;
        this._visited = new Array(this.dataset.length);
        this._assigned = new Array(this.dataset.length);
        this.noise = [];
        this._assigned = [];
    }

    if (epsilon) this.epsilon = epsilon;
    if (minPts) this.minPts = minPts;
    if (distanceFunction) this.distance = distanceFunction;
};
    
/**
 * Expand cluster to closest points of given neighborhood 
 *  
 * @param {number} clusterId
 * @param {Array} neighbors
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._expandCluster = function(clusterId, neighbors) {
    
    for (var i = 0, l = neighbors.length; i < l; i++) {
        var pointId2 = neighbors[i];

        if (this._visited[pointId2] !== 1) {
            this._visited[pointId2] = 1;

            var neighbors2 = this._regionQuery(pointId2, this.epsilon);
            if (neighbors2.length >= this.minPts)
                neighbors = this._mergeArrays(neighbors, neighbors2);
        }

        // add to cluster
        if (this._assigned[pointId2] !== 1) {
            this._assigned[pointId2] = 1;
            this.clusters[clusterId].push(pointId2);
        }
    }
};
    
/**
 * Find all neighbors around given point
 *
 * @param {number} pointId,
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._regionQuery = function(pointId) {
    var neighbors = [];
    var dataset = this.dataset;
    /*
    for (var id = 0, l = this.dataset.length; id < l; id++) {
        if ((pointId !== id) && this.distance(this.dataset[pointId], this.dataset[id]) < this.epsilon)
            neighbors.push(id);
    }*/
    this.tree.rnn(this.dataset[pointId],this.epsilon,function(idx){
        neighbors.push(dataset[idx]);
    });
    return neighbors;
};
    
/******************************************************************************/
// helpers

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._mergeArrays = function(a, b) {
    var source = (a.length > b.length) ? a : b
        , dest = (a.length > b.length) ? b : a;

    for (var i = 0, l = source.length; i < l; i++) {
        var P = source[i];
        if (dest.indexOf(P) < 0)
            dest.push(P);
    }

    return dest;
};
    
       
/**
 * Calculate euclidean distance in multidimensional space
 * 
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */   
DBSCAN.prototype._euclideanDistance = function(p, q) {
    var sum = 0
        , i = Math.min(p.length, q.length);
    while (i--) sum += (p[i] - q[i]) * (p[i] - q[i]);
    return Math.sqrt(sum);
};

if (module && module.exports)
    module.exports = DBSCAN;
