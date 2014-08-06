angular.module('storylayers.directives', [])
    .directive('clickValue', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function($scope, element, attrs, ngModel) {
                $scope.$on(attrs.ngModel, function(event, args) {
                    console.log('The new thing: ' + args[0]);
                    event.stopPropagation();
                    ngModel.$setViewValue(args[0], event);
                    console.log(ngModel.$viewValue);
                    console.log(ngModel.$modelValue);
                });
            }
        }
    })
    .directive('hoverSet', function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                element.on('mouseover', function(event) {
                    console.log(element.attr('src'));
                    //console.log(attrs.param);
                    $scope.$emit(attrs.param,[element.attr('src')]);
                });
            }
        }
    })
    .directive('clickSet', function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                element.on('mousedown', function(event) {
                    //console.log(element.text());
                    //console.log(attrs.param);
                    $scope.$emit(attrs.param,[element.text()]);
                });
            }
        }
    })
    .directive('clickImg', function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                element.on('mousedown', function(event) {
                    console.log(element.attr('src'));
                    //console.log(attrs.param);
                    $scope.$emit(attrs.param,[element.attr('src')]);
                });
            }
        }
    })
    .directive('clickColor', function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                element.on('mousedown', function(event) {
                    console.log(element.css('background-color'));
                    //console.log(attrs.param);
                    $scope.$emit(attrs.param,[element.css('background-color')]);
                });
            }
        }
    })
    .directive('noClose', function() {
        return {
            link: function($scope, $element) {
                $element.on('click', function($event) {
                    console.log("Dropdown should not close");
                    $event.stopPropagation();
                });
            }
        };
});