(function() {
    "use strict";

    class CustomHandsontableWidgetCtrl {
        root;
        constructor($element) {
            this.root = $element;
        }

        $onInit() {
            var container = this.root.find('[data-handson-container]').get(0);
            Handsontable(container, this.configs);
        }
    }
    
    CustomHandsontableWidgetCtrl.$inject = ['$element']
    
    angular.module('DemoApp').component('customHandsontableWidget', {
        templateUrl: 'widgets/handsontable/handsontable-widget.html',
        controller: CustomHandsontableWidgetCtrl,
        bindings: {
            configs: '<'
        }
    });

}());
