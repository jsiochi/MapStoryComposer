var alphaScale = 0.01;

var dashStyles = {'Solid': undefined, 'Dotted': [1,4], 'Dashed': [10]};

var rgbAddAlpha = function(rgbcolor, alpha) {
    return 'rgba' + rgbcolor.substr(3,rgbcolor.length-4) + ", " + alpha + ')';
};

var hexToArray = function(hexcolor, alpha) {
    return [parseInt('0x' + hexcolor.substr(1,2)), 
            parseInt('0x' + hexcolor.substr(3,2)), 
            parseInt('0x' + hexcolor.substr(5,2)), 
            parseFloat(alpha + '')];
};

var colorAddAlpha = function(color, alpha) {
    if(color.substr(0,1) === '#') {
        return hexToArray(color, alpha);
    }
    if(color.substr(0,4) === 'rgb(') {
        return rgbAddAlpha(color, alpha);
    }
    return '';
};

var testAddAlpha = function() {
    console.log(colorAddAlpha('rgb(90, 255, 0)', 0.5));
    console.log(colorAddAlpha('rgb(90, 255, 70)', 0.5));
    console.log(colorAddAlpha('rgb(90, 25, 0)', '0.8'));
    console.log(colorAddAlpha('#00FF00', 0.4));
    console.log(colorAddAlpha('#AA0FD1', 0.3));
    document.getElementById('test').style.backgroundColor = colorAddAlpha('rgb(0, 255, 70)', 0.5);
};

var getCachedTestStyle = function(number) {
    switch(number) {
            case 1:
                return {
                    graphicName: 'Circle',
                    externalGraphic: 'circle-18.svg',
                    pointRadius: 10,
                    fillColor: 'rgb(205, 92, 92)',
                    fillOpacity: 54,
                    fillType: 'Solid',
                    strokeDashstyle: 'Dotted',
                    strokeWidth: 10,
                    strokeColor: 'rgb(205, 92, 92)',
                    strokeOpacity: 54,
                    label: 'Choose',
                    fontFamily: 'Arial',
                    fontSize: 12,
                    fontStyle: 'bold',
                    fontColor: 'rgb(0, 0, 0)',
                    fontWeight: '200',
                    fontOpacity: 100,
                    classify: {
                        feature: 'num',
                        rules: [
                            {lower: 1, upper: 3, style: {color: '#FF0000', size: 3}},
                            {lower: 3, upper: 5, style: {color: '#00FF00', size: 3}},
                            {lower: 5, upper: 7, style: {color: '#0000FF', size: 3}}
                        ]
                    }
                };
            case 2:
                return {
                    graphicName: 'Square',
                    externalGraphic: 'circle-18.svg',
                    pointRadius: 10,
                    fillColor: 'rgb(205, 92, 92)',
                    fillOpacity: 54,
                    fillType: 'Solid',
                    strokeDashstyle: 'Solid',
                    strokeWidth: 10,
                    strokeColor: 'rgb(205, 92, 92)',
                    strokeOpacity: 54,
                    label: 'Choose',
                    fontFamily: 'Arial',
                    fontSize: 12,
                    fontStyle: 'bold',
                    fontColor: 'rgb(0, 0, 0)',
                    fontWeight: '200',
                    fontOpacity: 100,
                    classify: null
                };
            default:
                //do nothing
    }
    
};

var getOlStyle = function(styleCache, dataSet) {
    //console.log(styles['Polygon']);
    
    var styleFunction = function(feature, resolution) {
        var styleStrokeColor = colorAddAlpha(styleCache.strokeColor, styleCache.strokeOpacity * alphaScale);
        var styleFillColor = colorAddAlpha(styleCache.fillColor, styleCache.fillOpacity * alphaScale);
        var styleStrokeSize = styleCache.strokeWidth;
        var styleIconSize = styleCache.pointRadius;
        
        if(styleCache.classify != null) {
            //var feat = parseInt(feature.getId().split(".").pop());
            
            //console.log(feat);
            
            var feat = feature.get(styleCache.classify.feature);
        
            var i = 0;
        
            for(i = 0; i < styleCache.classify.rules.length; i++) {
                var rule = styleCache.classify.rules[i];
                if(feat == rule.lower || (feat > rule.lower && feat < rule.upper)) {
                    styleFillColor = colorAddAlpha(rule.style.color, styleCache.fillOpacity * alphaScale);
                    styleStrokeColor = colorAddAlpha(rule.style.color, styleCache.strokeOpacity * alphaScale);
                    styleStrokeSize = rule.style.size;
                    styleIconSize = rule.style.size;
                    break;
                }
            }
        }
        
        var image = new ol.style.Icon({
            src: styleCache.externalGraphic,
            scale: styleIconSize/10
        });
        
        var styles = {
            'Point': [new ol.style.Style({
                image: image
            })],
            'LineString': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: styleStrokeColor,
                    width: styleStrokeSize,
                    lineDash: dashStyles[styleCache.strokeDashstyle]
                })
            })],
            'MultiLineString': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: styleStrokeColor,
                    width: styleStrokeSize,
                    lineDash: dashStyles[styleCache.strokeDashstyle]
                })
            })],
            'MultiPoint': [new ol.style.Style({
                image: image
            })],
            'MultiPolygon': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: styleStrokeColor,
                    width: styleStrokeSize,
                    lineDash: dashStyles[styleCache.strokeDashstyle]
                }),
                fill: new ol.style.Fill({
                    color: styleFillColor
                })
            })],
            'Polygon': [new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: styleStrokeColor,
                    width: styleStrokeSize,
                    lineDash: dashStyles[styleCache.strokeDashstyle]
                }),
                fill: new ol.style.Fill({
                    color: styleFillColor
                })
            })]
        };
        
        return styles[feature.getGeometry().getType()];
    };
    
    return styleFunction;
};

var testing = function() {
    console.log('testing');
    console.log(getCachedTestStyle(2).classify == null);
    //getOlStyle(getCachedTestStyle(1), null);
};

var load = function() {
    //hullo im david bowie

    var vectorSource = new ol.source.GeoJSON(
        ({
            object: geoJData
        })
    );
    
    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: getOlStyle(getCachedTestStyle(1), null)
    });
    
    //console.log(vectorSource.getFeatures());
    
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        target: 'map',
        controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: false
            })
        }),
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });
};