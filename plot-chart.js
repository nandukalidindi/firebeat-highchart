chartOptions = {
    chart: { type: 'spline' },
    title: { text: '' },
    subtitle: { text: '' },
    exporting: { enabled: false },
    credits: { enabled: false },
    xAxis: {
      title: { text: '' }
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
                  options.series[i].color = null;
                  options.series[i].dashStyle = "solid";
              }
            }
            chart = new Highcharts.Chart('container', options);
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
    }, {
      name: 'Parth',
      data: [
        [1, 62],
        [2, 114],
        [3, 149],
        [4, 156],
        [5, 64],
        [6, 107],
        [7, 77],
        [8, 105],
        [9, 78],
        [10, 77],
        [11, 69],
        [12, 145],
        [13, 149],
        [14, 117],
        [15, 93],
        [16, 106],
        [17, 82],
        [18, 148],
        [19, 100],
        [20, 122],
        [21, 144],
        [22, 110],
        [23, 114],
        [24, 97]
      ]
    }, {
      name: 'Ananth',
      data: [
        [1, 121],
        [2, 101],
        [3, 81],
        [4, 73],
        [5, 68],
        [6, 158],
        [7, 115],
        [8, 87],
        [9, 133],
        [10, 159],
        [11, 159],
        [12, 134],
        [13, 124],
        [14, 106],
        [15, 119],
        [16, 142],
        [17, 75],
        [18, 145],
        [19, 156],
        [20, 100],
        [21, 77],
        [22, 139],
        [23, 137],
        [24, 99]
      ]
    }, {
      name: "Dongwuei",
      data: [
        [1, 148],
        [2, 123],
        [3, 104],
        [4, 121],
        [5, 110],
        [6, 71],
        [7, 135],
        [8, 108],
        [9, 131],
        [10, 69],
        [11, 80],
        [12, 78],
        [13, 71],
        [14, 104],
        [15, 72],
        [16, 149],
        [17, 63],
        [18, 137],
        [19, 119],
        [20, 77],
        [21, 122],
        [22, 127],
        [23, 109],
        [24, 125]
      ]
    }
  ]
}

chart = new Highcharts.Chart('container', chartOptions)

function updateChartOnTime(event) {
  var from = parseInt(document.getElementById("fromTime").value) || 1,
      to = parseInt(document.getElementById("toTime").value) || 24;

  var options = chart.options;

  options.series.forEach(function(series) {
    series.data = series.data.filter(function(data) {
      return data[0] >= from && data[0] <= to;
    });
  });

  chart = new Highcharts.Chart('container', options);
}

document.getElementById("fireTime").addEventListener("click", updateChartOnTime);

function updateChartOnBPM(event) {
  var from = parseInt(document.getElementById("fromBPM").value) || 60,
      to = parseInt(document.getElementById("toBPM").value) || 160;

  var options = chart.options;

  options.series.forEach(function(series) {
    series.data = series.data.filter(function(data) {
      return data[1] >= from && data[1] <= to;
    });
  });

  chart = new Highcharts.Chart('container', options);

}

document.getElementById("fireBPM").addEventListener("click", updateChartOnBPM);

function calculateAverage(data) {
  var size = data.length,
      sum = 0;
  data.forEach(function(entry) {
    sum += entry[1];
  });

  return sum/size;
}

function updateChartOnAverage(event) {
  var average = parseInt(document.getElementById('averageBPM').value) || 150;

  // var options = chart.options;

  chart.series.forEach(function(series) {
    var mappedData = series.data.map(function(data) {
      return [data.x, data.y];
    })
    if(calculateAverage(mappedData) >= average) {
      series.show();
    } else {
      series.hide();
      // series.setVisible(false, false);
    }
  });
  chart.redraw();
  // options.series = options.series.filter(function(series) {
  //   return calculateAverage(series.data) >= average;
  // });
  //
  // chart = new Highcharts.Chart('container', options);
}

document.getElementById("fireAverage").addEventListener("click", updateChartOnAverage);
