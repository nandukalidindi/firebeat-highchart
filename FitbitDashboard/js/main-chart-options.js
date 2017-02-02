var mainChartOptions = {
    chart: { type: 'spline' },
    title: { text: '' },
    subtitle: { text: '' },
    exporting: { enabled: false },
    credits: { enabled: false },
    xAxis: {
      title: { text: '' }
    },
    legend: {
        enabled: false
    },
    yAxis: {
      title: { text: '' }
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
            if (!this.visible)
              return true;

            var seriesIndex = this.index;
            var series = this.chart.series;
            var options = this.chart.options;

            for (var i = 0; i < series.length; i++) {
              if (series[i].index !== seriesIndex && options.series[i].dashStyle !== "solid") {
                  options.series[i].dashStyle = "shortdash";
                  options.series[i].color = "#DEDEDE";
                } else {
                  // options.series[i].color = null;
                  options.series[i].color = colors.find(function(chartSeries) { return chartSeries.name === options.series[i].name }).color;
                  options.series[i].dashStyle = "solid";
              }
            }
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

    series: null
}