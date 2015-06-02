# density-clustering-kdtree-doping
kdtree bind for DBSCAN and OPTICS

## Install
```
npm install density-clustering-kdtree-doping
```

## Dependency
* lukaszkrawczyk's density-clustering
    * https://www.npmjs.com/package/density-clustering
* mikolalysenko's static-kdtree
    * https://www.npmjs.com/package/static-kdtree

## Examples
### DBSCAN with kd-tree
```
var dataset = [
    [1,1],[0,1],[1,0],
    [10,10],[10,13],[13,13],
    [54,54],[55,55],[89,89],[57,55]
];
 
var clustering = require('density-clustering-kdtree-doping');
var dbscan = new clustering.DBSCAN_KDTREE();
// parameters: 5 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
var clusters = dbscan.run(dataset, 5, 2);
console.log(clusters, dbscan.noise);

// OUTPUT
// [ [ 0, 1, 2 ], [ 3, 5, 4 ], [ 6, 9, 7 ], [ 8 ] ] [ 8 ]
```

### OPTICS with kd-tree
```
// REGULAR DENSITY
var dataset = [
  [1,1],[0,1],[1,0],
  [10,10],[10,11],[11,10],
  [50,50],[51,50],[50,51],
  [100,100]
];
 
var clustering = require('density-clustering-kdtree-doping');
var optics = new clustering.OPTICS_KDTREE();
// parameters: 2 - neighborhood radius, 2 - number of points in neighborhood to form a cluster
var clusters = optics.run(dataset, 2, 2);
var plot = optics.getReachabilityPlot();
console.log(clusters, plot);

// OUTPUT
// [ [ 0, 1, 2 ], [ 3, 5, 4 ], [ 6, 8, 7 ], [ 9 ] ]
```