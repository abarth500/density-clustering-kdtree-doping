/**
 * Created by Shohei Yokoyama on 2015/06/02.
 */
var dataset = [
    [1,1],[0,1],[1,0],
    [10,10],[10,11],[11,10],
    [50,50],[51,50],[50,51],
    [100,100]
];

var clustering = require('../index.js');
var optics = new clustering.OPTICS_KDTREE();
// parameters: 2 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
var clusters = optics.run(dataset, 2, 2);
var plot = optics.getReachabilityPlot();
console.log(clusters);