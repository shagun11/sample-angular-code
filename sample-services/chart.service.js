'use strict';

angular.module('Demo')
    .factory('chartConfig', function ($interval) {
      var chartConfig = {};

      chartConfig.mainChart = {
        options: {
          chart: {
            type: 'column',
            height: '300',
            zoomType: 'xy',
            plotOptions: {
              series: {
                cursor: 'pointer',
                point: {
                  events: {
                    click: function() {
                      console.log('Clicked');
                    }
                  }
                }
              }
            }
          },
          legend: {
            borderWidth: 1,
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 0,
            floating: true,
            backgroundColor: '#FCFFC5'
          }
        },
        title: {text: null},
        yAxis: {
          title: {text:null},
          labels: {
            formatter: function() {
              return parseFloat((this.value/1e7).toPrecision(3)) + ' Cr';
            }
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        }
      };

      chartConfig.drillDownChart = {
        options: {
          chart: {
            type: 'area',
            height: '300',
            zoomType: 'xy'
          }
        },
        title: {text: null},
        yAxis: {
          title: {text:null},
          labels: {
            formatter: function() {
              return parseFloat((this.value/1e7).toPrecision(3)) + ' Cr';
            }
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        }
      };

      chartConfig.miniChart1 = {
        options: {
          chart: {
            type: 'line',
            height: '100'
          },
          legend: {
            enabled: false
          }
        },
        title: {text: null},
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150,
          title : {}
        },
        yAxis: {
          title: {text:null},
          labels: {
            formatter: function() {
              return parseFloat((this.value/1e7).toPrecision(3)) + ' Cr';
            }
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        series: [{
          data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: _.random(5, true)
              });
            }
            return data;
          }())
        }]
      };

      chartConfig.miniChart2 = {
        options: {
          chart: {
            type: 'solidgauge',
            height: '100'
          },
          pane: {
            center: ['50%', '85%'],
            size: '150%',
            startAngle: -90,
            endAngle: 90,
            background: {
              backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
            }
          },

          tooltip: {
            enabled: false
          },

          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true
            }
          }
        },
        title: {
          text: null,
          verticalAlign: 'top',
          y: 2,
          floating: true
        },
        yAxis: {
          stops: [
            [0.1, '#DF5353'],
            [0.5, '#DDDF0D'],
            [0.9, '#55BF3B']
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickPixelInterval: 400,
          tickInterval: 1,
          tickPositions: [],
          tickWidth: 0,
          title: {
            y: -32
          },
          labels: {
            y: 16
          },
          min: 0,
          max: 50

        },
        xAxis: {
            title:{}
        },
        credits: {
          enabled: false
        },

        series: [{
          name: 'Cr',
          data: [10],
          dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:14px;color:#767676;">Cr</span></div>'
          },
          tooltip: {
            valueSuffix: 'Cr'
          }
        }]


      };

      var miniChart3Inst;

      chartConfig.miniChart3 = {
        options: {
          chart: {
            type: 'areaspline',
            height: '100',
            events: {
              load: function () {

                // set up the updating of the chart each second
                miniChart3Inst = this;
                $interval(function () {
                  var x = (new Date()).getTime(), // current time
                      y = Math.random();
                  miniChart3Inst.series[0].addPoint([x, y], true, true);
                }, 30000);
              }
            },
            plotOptions: {
              series: {
                point: {
                  events: {
                    click: function() {
                      console.log('Clicked');
                    }
                  }
                }
              }
            }
          },
          legend: {
            enabled: false
          }
        },
        title: {text: null},
        xAxis: {
          title:{},
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {text:null},
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        series: [{
          name: 'Profit Center 1',
          data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
              data.push({
                x: time + i * 1000,
                y: _.random(50, true)
              });
            }
            return data;
          }())
        }]
      };

      chartConfig.miniChart4 = {
        options: {
          chart: {
            height: '100',
            type: 'bubble'
          },
          legend: {
            enabled: false
          },
          tooltip: {
            formatter: function () {
              return this.series.name;
            }
          }
        },
        title: {text: null},
        xAxis: {
          title:{},
          labels: {
            enabled: false
          }
        },
        yAxis: {
          title: {text:null},
          labels: {
            format: '{value} Cr'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },

        series: [{
          name: 'XYZ',
          data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            data.push({
              x: 1,
              y: _.random(2, 5)
            });

            return data;
          }())
        },
          {
            name: 'ABC',
            data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              data.push({
                x: 2,
                y: _.random(2, 5)
              });
              return data;
            }())
          },
          {
            name: 'DEF',
            data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              data.push({
                x: 3,
                y: _.random(2, 5)
              });
              return data;
            }())
          },
          {
            name: '',
            data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              data.push({
                x: 4,
                y: _.random(2, 5)
              });
              return data;
            }())
          }]
      };

      var arr = ['Shows the growth of the revenue for the given time period.',
        'Displays the total revenue generated in the particular time period.',
        'Displays the ProfitCenters that have generated revenue above the expected limit.',
        'Real time data that keeps updating for a specified period.',
        'Displays the revenue earned for the selected time period.',
        'Displays the drilldown revenue for the selected time period'];
      chartConfig.descriptionText = arr;

      return chartConfig;
    })

    .service('chartUtils', function(FilterOptions) {
      this.getXaxisValue = function(period) {
        return {
          today: 'Hours of the Day',
          lastWeek: 'Days of the Week',
          lastMonth: 'Weeks of the Month',
          lastQuarter: 'Months of the Quarter'
        }[period];
      };

      this.formatMainChart = function(config, data, params) {
        var newData = _.cloneDeep(data),
            newConfig = _.cloneDeep(config),
            id = params.owner,
            period = _.camelCase(params.period),
            xAxisText = this.getXaxisValue(period);


        //Format the drilldown the way Highcharts needs it
        _.forEach(newData.series, function(series) {
          var drillDownList = _.filter(
              newData.drillDown.series, {name: series.name});

          _.forEach(series.data, function(data, index) {
            data.drilldown = data.name;
            drillDownList[index].id = data.drilldown;
          });
        });

        _.forEach(newData.series, function(value) {
          var options = FilterOptions.dashboardFilters()[id];
          value.name = _.result(_.findWhere(options, {'id': value.name}), 'abbr');
        });

        newConfig.options.drilldown = newData.drillDown;
        delete newData.drillDown;

        newData.xAxis.title = {text: xAxisText};
        newData.xAxis.type = 'category';
        delete newData.xAxis.categories;

        return _.assign(newConfig, newData);
      };

      this.formatDrillDownChart = function(config, data) {
        return _.assign({}, config, data);
      };

      this.formatMiniChart1 = function(config, data, params) {
        var newData = _.cloneDeep(data),
            newConfig = _.cloneDeep(config),
            key = _.keys(data.evaluatedProjection)[0],
            projection = data.evaluatedProjection[key] || 0,
            growth = !(projection < 0),
            period = _.camelCase(params.period),
            xAxisText = this.getXaxisValue(period);

        newData.highChartInputFormat.xAxis.title = {text: xAxisText};

        return {
          chart: _.assign(newConfig, newData.highChartInputFormat),
          projection: parseFloat(Math.abs(projection)).toFixed(2),
          growth: growth
        };
      };

      this.formatMiniChart2 = function(config, data) {
        var newConfig = _.cloneDeep(config),
            currentValue = data['current_value'],
            formattedCurrentValue = parseFloat((currentValue/1e7).toPrecision(3)),
            projectedValue = data['projected_value'],
            max = Math.ceil(projectedValue/1e7),
            percent = (currentValue/projectedValue) * 100;

        newConfig.yAxis.max = max;
        newConfig.title.text = '<span style="font-size: 16px;color:#2c3e50;font-weight: bold">' + percent.toFixed(2) + ' %</span>';
        newConfig.yAxis.tickPositions = [0, max];
        newConfig.series[0].data = [formattedCurrentValue];

        return {
          chart: newConfig,
          currentValue: formattedCurrentValue
        };
      };
    });
