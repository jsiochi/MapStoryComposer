angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', 'SLDgenerator','styleModel', function ($scope, drawSpace, dataLoader, SLDgenerator, styleModel) {
        
        var mockup = false;
        
        $scope.layers = [];
        
        $scope.beopen = false;
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json').success(function(data) {
            $scope.layers = data.layers;
            processLayers();
            drawLayers();
            //styleModel.addLayers($scope.layers);
        });
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
            $scope.presets = data;
        });
        
        $scope.colorList = [['indianred','Red'],['skyblue','Sky'],['yellowgreen','Lime'],['gold','Gold'],['plum','Lilac'],
                            ['salmon','Salmon'],['cornflowerblue','Cornflower'],['darkgray','Steel'],['lightgreen','Mint'],
                            ['darkseagreen','Sea'],['palevioletred','Plum'],['deepskyblue','Turquoise'],['tomato','Tomato'],
                            ['silver','Gainsboro'],['burlywood','Hazel'],['cornsilk','Cream'],['lavender','Lavender'],['olive','Olive'],
                            ['yellow','Lemon'],['steelblue','Navy']];
        
        $scope.imgList = ['svg/circle-18.svg', 'svg/square-18.svg', 'svg/triangle-18.svg', 'svg/heart-18.svg', 'svg/star-18.svg', 
                          'svg/marker-18.svg', 'svg/park-18.svg', 'svg/lodging-18.svg', 'svg/monument-18.svg', 'svg/airport-18.svg', 
                          'svg/rail-18.svg', 'svg/ferry-18.svg', 'svg/harbor-18.svg', 'svg/bicycle-18.svg', 'svg/art-gallery-18.svg', 
                          'svg/college-18.svg', 'svg/library-18.svg', 'svg/town-hall-18.svg', 'svg/restaurant-18.svg', 'svg/grocery-18.svg', 
                          'svg/hospital-18.svg', 'svg/industrial-18.svg', 'svg/commercial-18.svg', 'svg/water-18.svg', 'svg/music-18.svg', 
                          'svg/city-18.svg', 'svg/car-18.svg', 'svg/chemist-18.svg', 'svg/village-18.svg', 'svg/zoo-18.svg', 
                          'svg/theatre-18.svg', 'svg/danger-18.svg', 'svg/camera-18.svg', 'svg/farm-18.svg', 'svg/shop-18.svg', 
                          'svg/cafe-18.svg', 'svg/police-18.svg', 'svg/golf-18.svg', 'svg/suitcase-18.svg'];
        
        var slidePath = '../MapStoryComposer/img/styleslides/'
        
        var PTslides = [{image: slidePath + 'PTsimple.png', active: true},
                        {image: slidePath + 'PTchoropleth.png', active: false},
                        {image: slidePath + 'PTunique.png', active: false},
                        {image: slidePath + 'PTgraduated.png', active: false},
                        {image: slidePath + 'PTdensity.png', active: false}];
                        
        var LNslides = [{image: slidePath + 'LNsimple.png', active: true},
                        {image: slidePath + 'LNchoropleth.png', active: false}, 
                        {image: slidePath + 'LNunique.png', active: false},
                        {image: slidePath + 'LNweighted.png', active: false},
                        {image: slidePath + 'LNsymbols.png', active: false}];
        
        var PGslides = [{image: slidePath + 'PGsimple.png', active: true},
                        {image: slidePath + 'PGchoropleth.png', active: false},
                        {image: slidePath + 'PGunique.png', active: false},
                        {image: slidePath + 'PGgraduated.png', active: false}];
        
        var allSlides = {'MultiPoint': PTslides, 'MultiLineString': LNslides, 'MultiPolygon': PGslides};
                         
        
        $scope.updateStyle = function(property, value, layer) {
            console.log(property + ' : ' + value);
            drawSpace.changeStyle(property, value, layer);
            drawSpace.clear();
            styleModel.updateStyle(property,value,layer);
            drawLayers();
        };
        
        $scope.setIndex = function(num, index) {
            $scope.layers[num].activeSlide = index;
            console.log(index);
        };
        
        $scope.showPanel = function(panelName, layerGeom) {
            //console.log(layerGeom);
            switch(panelName) {
                case 'Symbol':
                    return layerGeom === 'MultiPoint';
                case 'Fill':
                    return layerGeom === 'MultiPolygon';
            }
        };
        
        $scope.updateShow = function(layerId) {
            $scope.layers[layerId].activeSlide = showComponent(layerId);
        };
        
        function drawLayers() {
            if(!mockup) {return;}
            
            var i = 0;
            
            for(i = 0; i < $scope.layers.length; i++) {
                switch($scope.layers[i].geometry.type) {
                        case 'MultiPoint':
                            drawSpace.drawMultiPoint($scope.layers[i].geometry.coordinates, 1, i);
                            break;
                        case 'MultiLineString':
                            drawSpace.drawMultiLine($scope.layers[i].geometry.coordinates, i);
                            console.log('DrawingLines')
                            break;
                        case 'MultiPolygon':
                            drawSpace.drawMultiPolygon($scope.layers[i].geometry.coordinates, i);
                            console.log('DrawingPolygons')
                            break;
                }
            }
        }
        
        function showComponent(layerId) {
            var i = 0;
            console.log(layerId);
            for(i = 0; i < $scope.layers[layerId].slides.length; i++) {
                if($scope.layers[layerId].slides[i].active) {
                    console.log(i);
                    return i;
                }
            }
            return 0;
        }
        
        function processLayers() {
            var i = 0;
            
            for(i = 0; i < $scope.layers.length; i++) {
                $scope.layers[i].id = i;
                $scope.layers[i].slides = JSON.parse(JSON.stringify(allSlides[$scope.layers[i].geometry.type].slice(0)));
                $scope.layers[i].open = (i === 0);
                $scope.layers[i].max = 54;
                $scope.layers[i].min = 10;
                $scope.layers[i].activeSlide = 0;
                $scope.layers[i].style = styleModel.getLayerStyleTemplate('Layer' + i, $scope.layers[i].geometry.type);
            }
            //drawSpace.addLayerStyle($scope.layers.length);
        }
    }]);