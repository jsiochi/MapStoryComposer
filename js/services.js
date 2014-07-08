angular.module('storylayers.services', []).factory('drawSpace', function () {
    var canvas = document.getElementById('layerspace');
    var context = canvas.getContext('2d');
    
    context.fillStyle = 'Black';
    context.strokeStyle = 'red';
    
    function drawCircle(point, size) {
        context.beginPath();
        context.arc(point.x, point.y, size/2, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }
    
    function drawSquare(point, size) {
        context.beginPath();
        context.rect(point.x - size / 2, point.y - size / 2, size, size);
        context.fill();
        context.stroke();
    }
    
    function drawTriangle(point, size) {
        context.beginPath();
        context.moveTo(point.x, point.y - 0.57735 * size);
        context.lineTo(point.x + size / 2, point.y + 0.288675 * size);
        context.lineTo(point.x - size / 2, point.y + 0.288675 * size);
        context.closePath();
        context.fill();
        context.stroke();
    }
    
    var drawSpace = {
        changeStyle: function (property, value) {
            switch(property) {
                    case 'Fill':
                        context.fillStyle = value;
                        break;
                    case 'Alpha':
                        context.globalAlpha = value;
                        break;
            }
        },
        
        drawPoint: function (point, style, size) {
            switch(style) {
                    case 'Circle':
                        drawCircle(point, size);
                        break;
                    case 'Square':
                        drawSquare(point, size);
                        break;
                    case 'Triangle':
                        drawTriangle(point, size);
                        break;
            }
        },
        
        clear: function () {
            context.clearRect(0,0,canvas.width,canvas.height);
        }
    };
    
    return drawSpace;
})
.factory('dataLoader', function($http) {
    var dataLoader = {
        load: function (filename) {
            return $http.get(filename);
        }
    };
    
    return dataLoader;
});