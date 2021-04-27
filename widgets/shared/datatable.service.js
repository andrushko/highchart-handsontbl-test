(function(){
    "use strict";

    angular.module('DemoApp').factory('datatable', [function() {
        return {
            config: config
        }

        function config(headers, data, configs){

            let row = data[0];
            if(row && row.length && configs && !configs.columns) {
                const defaultColumnType = 'text';                
                let jsTypeToHandsonColumnTypeMap = {
                    'number': 'numeric',
                    'string': defaultColumnType
                };
                configs.columns = [];
                row.forEach(item => {
                    let type = jsTypeToHandsonColumnTypeMap[typeof item] || defaultColumnType;
                    configs.columns.push({ type });
                });
            }
    
            return appcommon.fn.merge({
                data: data,
                colHeaders: headers
            }, configs);
        }
    }])
}())
