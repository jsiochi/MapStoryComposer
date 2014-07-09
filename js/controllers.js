angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', function ($scope, drawSpace, dataLoader) {
        
        var points = [];
        
        var layerGeom = ['Point','Line','Poly'];
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json').success(function(data) {
            points = data.geodata.data;
            console.log(points);
            drawPoints();
        });
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
                $scope.presets = data;
        });
        
        var PTslides = [{image: '../MapStoryComposer/img/styleslides/PTsimple.png', active: true},
                         {image: '../MapStoryComposer/img/styleslides/PTchoropleth.png', active: true},
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
        
        $scope.slides = allSlides[1];
                         
        
        $scope.updateStyle = function(property, value) {
            console.log(property + ' : ' + value);
            drawSpace.changeStyle(property, value);
            drawSpace.clear();
            drawPoints();
        };
        
        $scope.showPanel = function(panelName) {
            var layer = 1;
            
            switch(panelName) {
                    case 'Symbol':
                        return layerGeom[layer] === 'Point';
                    case 'Fill':
                        return layerGeom[layer] === 'Poly';
            }
        };
        
        function drawPoints() {
            for(i = 0; i < points.length; i++) {
                drawSpace.drawPoint({x: points[i].lat, y: points[i].long}, points[i].value);
                console.log(points[i]);
            }
        }
    }]);