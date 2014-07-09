angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', function ($scope, drawSpace, dataLoader) {
        
        var points = [];
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json').success(function(data) {
            points = data.geodata.data;
            console.log(points);
            drawStuff();
        });
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
                $scope.presets = data;
        });
        
        $scope.slides = [{image: '../MapStoryComposer/img/styleslides/PTsimple.png', active: true},
                         {image: '../MapStoryComposer/img/styleslides/LNchoropleth.png', active: false}, 
                         {image: '../MapStoryComposer/img/styleslides/LNsimple.png', active: false},
                         {image: '../MapStoryComposer/img/styleslides/LNsymbols.png', active: false},
                         {image: '../MapStoryComposer/img/styleslides/LNunique.png', active: false}];
        
        $scope.updateStyle = function(property, value) {
            console.log(property + ' : ' + value);
            drawSpace.changeStyle(property, value);
            drawSpace.clear();
            drawStuff();
        };
        
        function drawStuff() {
            for(i = 0; i < points.length; i++) {
                drawSpace.drawPoint({x: points[i].lat, y: points[i].long}, points[i].value);
                console.log(points[i]);
            }
        }
    }]);