var mainChartOptions = {
    chart: { type: 'spline' },
    title: { text: '' },
    subtitle: { text: '' },
    exporting: { enabled: false },
    credits: { enabled: false },
    xAxis: {
      title: { text: '' },
      gridLineWidth: 1,
      tickInterval: 3600,
      labels: {
        formatter: function() {
          return ((this.value)/3600);
        }
      }
    },
    legend: {
        enabled: false
    },
    yAxis: {
      title: { text: '' },
      tickInterval: 60,
      gridLineWidth: 0,
      minorTickLength: 0,
      tickLength: 0
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.y} BPM at {point.x}:00'
    },
    plotOptions: {
      series: {
        // lineWidth: 2,
        events: {
          click: function(event) {
            var seriesName = this.name;
            var series = this.chart.series;
            var options = this.chart.options;
            var currentSeries = "";

            for (var i = 0; i < series.length; i++) {
              if(options.series[i].name === this.name) {
                currentSeries = options.series[i];
              }
              if (options.series[i].name !== seriesName) {
                  options.series[i].dashStyle = "shortdash";
                  options.series[i].color = "#DEDEDE";
                } else {
                  // options.series[i].color = null;
                  options.series[i].color = colors.find(function(chartSeries) { return chartSeries.name === options.series[i].name }).color;
                  options.series[i].dashStyle = "solid";
              }
            }
            var thisSeries = options.series.find(function(series) {
              return series.name === this.name;
            }.bind(this));
            updateList([thisSeries]);
            chart = new Highcharts.Chart('main-chart', options);
          }
        }
      },
      spline: {
        marker: {
            enabled: false
        },
        events: {
          legendItemClick: function(event) {
            if (!this.visible)
              return true;

            var seriesIndex = this.index;
            var series = this.chart.series;

            for (var i = 0; i < series.length; i++) {
              if (series[i].index != seriesIndex) {

                series[i].visible ? series[i].hide() : series[i].show();
              }
            }
            return false;
          }
        }
      },
    },
    series: null,
    lang: {
        noData: "No data to display"
    },
    noData: {
        style: {
            fontWeight: 'bold',
            fontSize: '15px',
            color: '#303030'
        }
    }
}
