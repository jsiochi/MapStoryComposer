angular.module('storylayers.services', []).factory('drawSpace', function () {
    var canvas = document.getElementById('layerspace');
    var context = canvas.getContext('2d');
    
    context.fillStyle = 'blue';
    context.strokeStyle = 'red';
    
    var drawSpace = {
        drawCircle: function (point, radius) {
            context.beginPath();
            context.arc(point.x, point.y, radius, 0, 2 * Math.PI);
            context.fill();
            context.stroke();
        },

        drawSquare: function (point, size) {
            context.beginPath();
            context.rect(point.x - size / 2, point.y - size / 2, size, size);
            context.fill();
            context.stroke();
        },

        drawTriangle: function (point, size) {
            context.beginPath();
            context.moveTo(point.x, point.y - 0.57735 * size);
            context.lineTo(point.x + size / 2, point.y + 0.288675 * size);
            context.lineTo(point.x - size / 2, point.y + 0.288675 * size);
            context.closePath();
            context.fill();
            context.stroke();
        }
    };
    
    return drawSpace;
})
.factory('dataLoader', function($http) {
    var dataLoader = {
        load: function (filename) {
            var result = {content: null};
            
            $http.get(filename).success(function(data) {
                result.content = data;
            });
            
            return result;
        }
    };
    
    return dataLoader;
});