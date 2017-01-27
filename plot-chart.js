chartOptions = {
    chart: { type: 'spline' },
    title: { text: '' },
    subtitle: { text: '' },
    exporting: { enabled: false },
    credits: { enabled: false },
    xAxis: {
      title: { text: '' },
      min: 0
    },
    yAxis: {
      title: { text: '' },
      min: 0
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.y} BPM at {point.x}:00'
    },
    plotOptions: {
      series: {
        events: {
          click: function(event) {
            if (!this.visible)
              return true;

            var seriesIndex = this.index;
            var series = this.chart.series;
            var options = this.chart.options;

            for (var i = 0; i < series.length; i++) {
              if (series[i].index !== seriesIndex && options.series[i].dashStyle !== "solid") {
                  options.series[i].dashStyle = "longdash";
                } else {
                  options.series[i].dashStyle = "solid";
              }
            }
            chart = new Highcharts.Chart('container', options);
            return false;
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

    series: [
      {
        name: 'Prabodh',
        data: [
          [1, 105],
          [2, 130],
          [3, 138],
          [4, 100],
          [5, 152],
          [6, 72],
          [7, 106],
          [8, 86],
          [9, 113],
          [10, 119],
          [11, 152],
          [12, 77],
          [13, 107],
          [14, 79],
          [15, 137],
          [16, 138],
          [17, 73],
          [18, 140],
          [19, 149],
          [20, 99],
          [21, 129],
          [22, 123],
          [23, 119],
          [24, 107]
        ]
      },
      {
        name: 'Waqid',
        data: [
          [1, 157],
          [2, 158],
          [3, 117],
          [4, 148],
          [5, 114],
          [6, 112],
          [7, 94],
          [8, 90],
          [9, 103],
          [10, 76],
          [11, 135],
          [12, 72],
          [13, 147],
          [14, 144],
          [15, 124],
          [16, 159],
          [17, 117],
          [18, 152],
          [19, 137],
          [20, 114],
          [21, 81],
          [22, 130],
          [23, 130],
          [24, 139]
        ]
    }, {
        name: 'Nandu',
        data: [
          [1, 93],
          [2, 155],
          [3, 141],
          [4, 133],
          [5, 160],
          [6, 114],
          [7, 128],
          [8, 94],
          [9, 111],
          [10, 160],
          [11, 116],
          [12, 73],
          [13, 138],
          [14, 110],
          [15, 150],
          [16, 89],
          [17, 95],
          [18, 84],
          [19, 125],
          [20, 74],
          [21, 82],
          [22, 145],
          [23, 148],
          [24, 158]
        ]
    }]
}

chart = new Highcharts.Chart('container', chartOptions)
