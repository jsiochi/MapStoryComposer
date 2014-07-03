angular.module('storylayers.controllers', [])
    .controller('drawCtrl', ['$scope', function ($scope) {
        var canvas = document.getElementById('layerspace');
        var context = canvas.getContext('2d');
        
        canvas.width = 500;
        canvas.height = 500;
        
        context.beginPath();
        context.moveTo(50,50);
        context.lineTo(100, 300);
        context.strokeStyle = 'black';
        context.stroke();
        
        context.fillStyle = 'blue';
        drawCircle({x: 200, y: 400}, 30);
        
        /* helper functions for drawing */
        function drawCircle(point, radius) {
            context.beginPath();
            context.arc(point.x, point.y, radius, 0, 2*Math.PI);
            context.fill();
        }
    }]);