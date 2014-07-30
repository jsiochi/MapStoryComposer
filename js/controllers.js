angular.module('storylayers.controllers', ['storylayers.services'])
    .controller('drawCtrl', ['$scope', 'drawSpace', 'dataLoader', 'SLDgenerator','styleModel', function ($scope, drawSpace, dataLoader, SLDgenerator, styleModel) {
        
        var mockup = false;
        
        $scope.layers = [];
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/TestData.json').success(function(data) {
            $scope.layers = data.layers;
            processLayers();
            //$scope.layer = $scope.layers[0];
            drawLayers();
            styleModel.addLayers($scope.layers);
        });
        
        dataLoader.load('https://dl.dropboxusercontent.com/u/63253018/styles.json').success(function(data) {
            $scope.presets = data;
        });
        
        $scope.testColor = '#00ff00';
        $scope.colorList = [['indianred','Red'],['skyblue','Sky'],['yellowgreen','Lime'],['gold','Gold'],['plum','Lilac'],
                            ['salmon','Salmon'],['cornflowerblue','Cornflower'],['darkgray','Steel'],['lightgreen','Mint'],
                            ['darkseagreen','Sea'],['palevioletred','Plum'],['deepskyblue','Turquoise'],['tomato','Tomato'],
                            ['silver','Gainsboro'],['burlywood','Hazel'],['cornsilk','Cream'],['lavender','Lavender'],['olive','Olive'],
                            ['yellow','Lemon'],['steelblue','Navy']];
        
        var slidePath = '../MapStoryComposer/img/styleslides/'
        
        var PTslides = [{image: slidePath + 'PTsimple.png', active: true, classify: false},
                        {image: slidePath + 'PTchoropleth.png', active: false, classify: true},
                        {image: slidePath + 'PTunique.png', active: false, classify: true},
                        {image: slidePath + 'PTgraduated.png', active: false, classify: true},
                        {image: slidePath + 'PTdensity.png', active: false, classify: true}];
                        
        var LNslides = [{image: slidePath + 'LNsimple.png', active: true, classify: false},
                        {image: slidePath + 'LNchoropleth.png', active: false, classify: true}, 
                        {image: slidePath + 'LNunique.png', active: false, classify: true},
                        {image: slidePath + 'LNsymbols.png', active: false, classify: true},
                        {image: slidePath + 'LNweighted.png', active: false, classify: true}];
        
        var PGslides = [{image: slidePath + 'PGsimple.png', active: true, classify: false},
                        {image: slidePath + 'PGchoropleth.png', active: false, classify: true},
                        {image: slidePath + 'PGunique.png', active: false, classify: true},
                        {image: slidePath + 'PGgraduated.png', active: false, classify: true}];
        
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
                $scope.layers[i].activeSlide = 0;
                $scope.layers[i].style = {symbol: 'Circle'};
            }
            //drawSpace.addLayerStyle($scope.layers.length);
        }
    }]);