(function(){
    "use strict";

    angular.module('DemoApp').factory('chart', [function() {

        return {
            buildSeries: buildSeries,
            config: config
        }

        function config(headers, data, configs) {
            let defaultConfigs = getDefaultConfigs();
            let series = buildSeries(data);

            return appcommon.fn.merge(
                defaultConfigs, 
                {
                    title: {
                        text: 'Highcharts Widget'
                    },
                    series: [{
                        name: 'Highcharts data',
                        data: series.data
                    }],
                    xAxis: {
                        categories: headers.slice(1)
                    },
                    yAxis: {
                        categories: data.map(d => d[0]),
                        reversed: true
                    },
                    colorAxis: {
                        min: series.min
                    },
                }, 
                configs);
        }

        function buildSeries(data){
            let dataSet = data.map((arr, i) => arr.slice(1));
            let colsCount = dataSet.length;
            let rowsCount = dataSet[0].length;
            let series = [];
            let min = 0;
    
            for (let i = 0; i < colsCount; i++) {
                for (let j = 0; j < rowsCount; j++) {
                    let val = dataSet[i][j];
                    if(val < min){
                        min = val;
                    }
                    series.push([ j, i, val]);
                }
            }
            return {
                min: min,
                data: series
            }
        }

        function getDefaultConfigs() {
            return {
                chart: {
                    type: 'heatmap',
                    marginTop: 40,
                    marginBottom: 80,
                    plotBorderWidth: 1
                },
                title: {
                    text: 'Heatmap chart'
                },
                colorAxis: {
                    min: 0,
                    minColor: '#FFFFFF',
                    maxColor: Highcharts.getOptions().colors[3]
                },
                legend: {
                    align: 'right',
                    layout: 'vertical',
                    margin: 0,
                    verticalAlign: 'top',
                    y: 25,
                    symbolHeight: 280
                },
                series: [{
                    borderWidth: 1,
                    dataLabels: {
                        enabled: true,
                        color: '#000000'
                    }
                }],
                tooltip: {
                    formatter: function () {
                        return  this.point.value;
                    }
                },
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            yAxis: {
                                labels: {
                                    formatter: function () {
                                        return this.value.charAt(0);
                                    }
                                }
                            }
                        }
                    }]
                }
            }
        }
    }])
}())
