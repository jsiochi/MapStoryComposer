angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', 'SLDgenerator', function ($scope, drawSpace, dataLoader, SLDgenerator) {
        
        var points = [];
        
        var testLines = [
        		[[100, 100], [200, 200], [100, 400]], 
        		[[400, 400], [300, 300], [400, 200], [300, 100]]
    		];
        
        var testPoly = [
        		[
            		[[300, 200], [450, 400], [100, 400], [300, 200]]
        		], 
        		[
            		[[150, 50], [400, 100], [100, 200], [50, 100], [150, 50]]
        		]
    		];
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json').success(function(data) {
            $scope.layers = data.layers;
            processLayers();
            drawLayers();
        });
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
            $scope.presets = data;
        });
        
        $scope.min1 = 20;
        $scope.max1 = 80;
        $scope.testColor = '#00ff00';
        
        console.log(SLDgenerator.objToSLD());
        
        var PTslides = [{image: '../MapStoryComposer/img/styleslides/PTsimple.png', active: true},
                        {image: '../MapStoryComposer/img/styleslides/PTchoropleth.png', active: false},
                        {image: '../MapStoryComposer/img/styleslides/PTunique.png', active: false},
                        {image: '../MapStoryComposer/img/styleslides/PTgraduated.png', active: false},
                        {image: '../MapStoryComposer/img/styleslides/PTdensity.png', active: false}];
                        
        var LNslides = [{image: '../MapStoryComposer/img/styleslides/LNsimple.png', active: true},
                        {image: '../MapStoryComposer/img/styleslides/LNchoropleth.png', active: false}, 
                        {image: '../MapStoryComposer/img/styleslides/LNunique.png', active: false},
                        {image: '../MapStoryComposer/img/styleslides/LNsymbols.png', active: false},
                        {image: '../MapStoryComposer/img/styleslides/LNweighted.png', active: false}];
        
        var PGslides = [{image: '../MapStoryComposer/img/styleslides/PGsimple.png', active: true},
                        {image: '../MapStoryComposer/img/styleslides/PGchoropleth.png', active: false},
                        {image: '../MapStoryComposer/img/styleslides/PGunique.png', active: false},
                        {image: '../MapStoryComposer/img/styleslides/PGgraduated.png', active: false}];
        
        var allSlides = {'MultiPoint': PTslides, 'MultiLineString': LNslides, 'MultiPolygon': PGslides};
                         
        
        $scope.updateStyle = function(property, value, layer) {
            console.log(property + ' : ' + value);
            drawSpace.changeStyle(property, value, layer);
            drawSpace.clear();
            drawLayers();
        };
        
        $scope.showPanel = function(panelName, layerGeom) {
            console.log(layerGeom);
            switch(panelName) {
                case 'Symbol':
                    return layerGeom === 'MultiPoint';
                case 'Fill':
                    return layerGeom === 'MultiPolygon';
            }
        };
        
        function drawLayers() {
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
            }
            drawSpace.addLayerStyle($scope.layers.length);
        }
    }]);