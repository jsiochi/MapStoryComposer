angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', function ($scope, drawSpace, dataLoader) {
        var yes = dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json');
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
                $scope.symbols = data.symbol.symbol;
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
            drawSpace.drawPoint({x: 300, y: 300}, 'Circle', 40);
            drawSpace.drawPoint({x: 200, y: 200}, 'Square', 50);
            drawSpace.drawPoint({x: 400, y: 450}, 'Triangle', 100);
        }
        
        drawStuff();
        
    }]);