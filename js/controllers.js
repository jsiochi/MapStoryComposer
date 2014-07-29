angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', 'SLDgenerator','styleModel', function ($scope, drawSpace, dataLoader, SLDgenerator, styleModel) {
        
        var mockup = false;
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json').success(function(data) {
            $scope.layers = data.layers;
            processLayers();
            drawLayers();
            styleModel.addLayers($scope.layers);
        });
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
            $scope.presets = data;
        });
        
        $scope.testColor = '#00ff00';
        
        var slidePath = '../MapStoryComposer/img/styleslides/'
        
        var PTslides = [{image: slidePath + 'PTsimple.png', active: true},
                        {image: slidePath + 'PTchoropleth.png', active: false},
                        {image: slidePath + 'PTunique.png', active: false},
                        {image: slidePath + 'PTgraduated.png', active: false},
                        {image: slidePath + 'PTdensity.png', active: false}];
                        
        var LNslides = [{image: slidePath + 'LNsimple.png', active: true},
                        {image: slidePath + 'LNchoropleth.png', active: false}, 
                        {image: slidePath + 'LNunique.png', active: false},
                        {image: slidePath + 'LNsymbols.png', active: false},
                        {image: slidePath + 'LNweighted.png', active: false}];
        
        var PGslides = [{image: slidePath + 'PGsimple.png', active: true},
                        {image: slidePath + 'PGchoropleth.png', active: false},
                        {image: slidePath + 'PGunique.png', active: false},
                        {image: slidePath + 'PGgraduated.png', active: false}];
        
        var allSlides = {'MultiPoint': PTslides, 'MultiLineString': LNslides, 'MultiPolygon': PGslides};
                         
        
        $scope.updateStyle = function(property, value, layer) {
            console.log(property + ' : ' + value);
            drawSpace.changeStyle(property, value, layer);
            drawSpace.clear();
            styleModel.updateStyle(property,value,layer);
            drawLayers();
        };
        
        $scope.showPanel = function(panelName, layerGeom) {
            //console.log(layerGeom);
            switch(panelName) {
                case 'Symbol':
                    return layerGeom === 'MultiPoint';
                case 'Fill':
                    return layerGeom === 'MultiPolygon';
            }
        };
        
        function drawLayers() {
            if(!mockup) {return;}
            
            var i = 0;
            
            for(i = 0; i < $scope.layers.length; i++) {
                switch($scope.layers[i].geometry.type) {
                        case 'MultiPoint':
                            drawSpace.drawMultiPoint($scope.layers[i].geometry.coordinates, 1, i);
                            break;
                        case 'MultiLineString':
                            drawSpace.drawMultiLine($scope.layers[i].geometry.coordinates, i);
                            console.log('DrawingLines')
                            break;
                        case 'MultiPolygon':
                            drawSpace.drawMultiPolygon($scope.layers[i].geometry.coordinates, i);
                            console.log('DrawingPolygons')
                            break;
                }
            }
        }
        
        function processLayers() {
            var i = 0;
            
            for(i = 0; i < $scope.layers.length; i++) {
                $scope.layers[i].id = i;
                $scope.layers[i].slides = JSON.parse(JSON.stringify(allSlides[$scope.layers[i].geometry.type].slice(0)));
                $scope.layers[i].open = (i === 0);
                $scope.layers[i].max = 100;
            }
            //drawSpace.addLayerStyle($scope.layers.length);
        }
    }]);