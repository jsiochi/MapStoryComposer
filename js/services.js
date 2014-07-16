angular.module('storylayers.services', []).factory('drawSpace', function () {
    var canvas = document.getElementById('layerspace');
    var context = canvas.getContext('2d');
    
    var layerStyles = [];
    
    context.fillStyle = 'Blue';
    context.strokeStyle = 'Black';
    context.setLineDash([5]);
    
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
        
        drawMultiPoint: function (coordinates, size, layer) {
            changeStyle(layer);
            
            for(i = 0; i < coordinates.length; i++) {
                switch(layerStyles[layer].symbol) {
                        case 'Circle':
                            drawCircle({x: coordinates[i][0], y: coordinates[i][1]}, 30 * layerStyles[layer].size);
                            break;
                        case 'Square':
                            drawSquare({x: coordinates[i][0], y: coordinates[i][1]}, 30 * layerStyles[layer].size);
                            break;
                        case 'Triangle':
                            drawTriangle({x: coordinates[i][0], y: coordinates[i][1]}, 30 * layerStyles[layer].size);
                            break;
                }
            }
        },
        
        drawMultiPolygon: function(coordinates, layer) {
            changeStyle(layer);
            
            var scale = 10;
            
            for(i = 0; i < coordinates.length; i++) {
                context.beginPath();
                context.moveTo(coordinates[i][0][0][0] * scale, coordinates[i][0][0][1] * scale);
                for(j = 1; j < coordinates[i][0].length; j++) {
                    context.lineTo(coordinates[i][0][j][0] * scale, coordinates[i][0][j][1] * scale);
                }
                context.closePath();
                context.fill();
                context.stroke();
            }
        },
        
        drawMultiLine: function(coordinates, layer) {
            changeStyle(layer);
            
            var scale = 10;
            
            for(i = 0; i < coordinates.length; i++) {
                context.beginPath();
                context.moveTo(coordinates[i][0][0] * scale, coordinates[i][0][1] * scale);
                for(j = 1; j < coordinates[i].length; j++) {
                    context.lineTo(coordinates[i][j][0] * scale, coordinates[i][j][1] * scale);
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
})
.factory('SLDgenerator', function() {
    /*
        process for generating SLDs from style objects:
        1. define a filter (optional?)
        2. define a rule - in the 'symbolizer' part, this is the where the style properties actually go
        3. define a style based on the previous rule/rules
        4. write the style with namedLayers --> name and userStyles. userStyles gets the array of previously defined styles
    */
    
    var SLDgenerator = {
        objToSLD: function() {
            var symbolHash = {'Polygon' : {
                fillColor: '#0000ff',
                strokeWidth: '5',
                strokeColor: '#ff0000'
            }};
            
            var rule = new OpenLayers.Rule({
                symbolizer: symbolHash
            });
            
            var s = new OpenLayers.Style("CoolStyle", {
                rules: [rule]
            });
            
            var format = new OpenLayers.Format.SLD();
            
            format.stringifyOutput = false;
            
            return format.write({
                namedLayers: [{
                    name: 'CoolLayer',
                    userStyles: [s]
                }]
            });
        }
    };
    
    return SLDgenerator;
});