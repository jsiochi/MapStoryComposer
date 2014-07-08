angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', function ($scope, drawSpace, dataLoader) {
        drawSpace.drawCircle({x: 300, y: 300}, 80);
        drawSpace.drawSquare({x: 200, y: 200}, 50);
        drawSpace.drawTriangle({x: 400, y: 450}, 100);
        
        var yes = dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json');
        
    }]);