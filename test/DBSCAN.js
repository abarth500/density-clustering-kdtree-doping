/**
 * Created by Shohei Yokoyama on 2015/06/02.
 */
var dataset = [
    [1,1],[0,1],[1,0],
    [10,10],[10,13],[13,13],
    [54,54],[55,55],[89,89],[57,55]
];

console.log("DBSCAN with KDTree");
var clustering = require('../index.js');
var dbscan = new clustering.DBSCAN_KDTREE();
// parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
var clusters = dbscan.run(dataset, 5, 2);
console.log(clusters);

console.log("DBSCAN")
dbscan = new clustering.DBSCAN();
clusters = dbscan.run(dataset, 5, 2);
console.log(clusters);