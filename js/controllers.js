angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', function ($scope, drawSpace, dataLoader) {
        
        var points = [];
        
        var layerGeom = ['Point','Line','Poly'];
        
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
//            $scope.layers = data.layers;
            points = data.geodata.data;
            $scope.layers = [{id: 0, name: 'StoryLayer 1', open: true, slides: allSlides[0], points: points},{id: 1, name: 'StoryLayer 2', open: false, slides:                                 allSlides[0], points: points}];
            drawSpace.addLayerStyle($scope.layers.length);
            //drawSpace.drawMultiLine(testLines, 0);
            //drawSpace.drawMultiPolygon(testPoly, 1);
            drawPoints();
        });
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
                $scope.presets = data;
        });
        
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
        
        var allSlides = [PTslides, LNslides, PGslides];
                         
        
        $scope.updateStyle = function(property, value, layer) {
            console.log(property + ' : ' + value);
            drawSpace.changeStyle(property, value, layer);
            drawSpace.clear();
            drawPoints();
        };
        
        $scope.showPanel = function(panelName) {
            var layer = 0;
            
            switch(panelName) {
                    case 'Symbol':
                        return layerGeom[layer] === 'Point';
                    case 'Fill':
                        return layerGeom[layer] === 'Poly';
            }
        };
        
        function drawPoints() {
            for(i = 0; i < $scope.layers.length; i++) {
                for(j = 0; j < $scope.layers[i].points.length; j++) {
                    drawSpace.drawPoint({x: $scope.layers[i].points[j].lat, y: $scope.layers[i].points[j].long}, $scope.layers[i].points[j].value, i);
                }
            }
        }
    }]);