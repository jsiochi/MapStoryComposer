angular.module('storylayers.services', []).factory('drawSpace', function () {
    var canvas = document.getElementById('layerspace');
    var context = canvas.getContext('2d');
    
    var layerStyles = [];
    
    context.fillStyle = 'Blue';
    context.strokeStyle = 'Black';
    
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
    
    function changeStyle(layer) {
        context.fillStyle = layerStyles[layer].fill;
        context.strokeStyle = layerStyles[layer].stroke;
        context.globalAlpha = layerStyles[layer].alpha;
    }
    
    var drawSpace = {
        addLayerStyle: function(numLayers) {
            for(i = 0; i < numLayers; i++) {
                layerStyles.push({fill: 'Blue', stroke: 'Black', size: 1, symbol: 'Circle', alpha: 1});
            }
        },
        
        changeStyle: function (property, value, layer) {
            switch(property) {
                    case 'Fill':
                        layerStyles[layer].fill = value;
                        break;
                    case 'Alpha':
                        layerStyles[layer].alpha = value;
                        break;
                    case 'Symbol':
                        layerStyles[layer].symbol = value;
                        break;
                    case 'Size':
                        layerStyles[layer].size = value;
                        break;
            }
        },
        
        drawPoint: function (point, size, layer) {
            changeStyle(layer);
            
            switch(layerStyles[layer].symbol) {
                    case 'Circle':
                        drawCircle(point, size * layerStyles[layer].size);
                        break;
                    case 'Square':
                        drawSquare(point, size * layerStyles[layer].size);
                        break;
                    case 'Triangle':
                        drawTriangle(point, size * layerStyles[layer].size);
                        break;
            }
        },
        
        drawMultiPolygon: function(coordinates, layer) {
            changeStyle(layer);
            for(i = 0; i < coordinates.length; i++) {
                context.beginPath();
                context.moveTo(coordinates[i][0][0][0], coordinates[i][0][0][1]);
                for(j = 1; j < coordinates[i][0].length; j++) {
                    context.lineTo(coordinates[i][0][j][0], coordinates[i][0][j][1]);
                }
                context.closePath();
                context.fill();
                context.stroke();
            }
        },
        
        drawMultiLine: function(coordinates, layer) {
            changeStyle(layer);
            for(i = 0; i < coordinates.length; i++) {
                context.beginPath();
                context.moveTo(coordinates[i][0][0], coordinates[i][0][1]);
                for(j = 1; j < coordinates[i].length; j++) {
                    context.lineTo(coordinates[i][j][0], coordinates[i][j][1]);
                }
                context.stroke();
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