angular.module('storylayers.directives', [])
    .directive('clickValue', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function($scope, element, attrs, ngModel) {
                $scope.$on(attrs.ngModel, function(event, args) {
                    console.log('The new thing: ' + args[0]);
                    event.stopPropagation();
                    ngModel.$setViewValue(args[0]);
                });
                
                ngModel.$render = function() {
                    //element.text(ngModel.$modelValue);
                };
            }
        }
    })
    .directive('clickSet', function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs) {
                element.on('mousedown', function(event) {
                    console.log(element.text());
                    console.log(attrs.param);
                    $scope.$emit(attrs.param,[element.text()]);
                });
            }
        }
});