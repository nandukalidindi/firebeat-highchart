function data() {
  return [
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

chartOptions = {
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

    series: data()
}

chart = new Highcharts.Chart('main-chart', chartOptions)

var colors = chart.series.map(function(series) { return { color: series.color, name: series.name }; });

function calculateAverage(data) {
  var size = data.length,
      sum = 0;
  data.forEach(function(entry) {
    sum += entry[1];
  });

  return sum/size;
}

function updateChartOnHeartRateOrTimeFrameChange(event) {
  var average = parseInt(document.getElementById('heart-rate-input').value) || 60,
      from = parseInt(document.getElementById("duration-input").value) || 1,
      to = 24;

  var options = chart.options;

  options.series = data();
  options.series.forEach(function(series) {
    series.data = series.data.filter(function(data) {
      return data[0] >= from && data[0] <= to;
    });
  });

  options.series = options.series.filter(function(series) {
    if(calculateAverage(series.data) >= average) {
      series.color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;
      return true;
    } else {
      return false;
    }
  });

  chart = new Highcharts.Chart('main-chart', options);
}

document.getElementById("duration-input").addEventListener("blur", updateChartOnHeartRateOrTimeFrameChange);
document.getElementById("heart-rate-input").addEventListener("blur", updateChartOnHeartRateOrTimeFrameChange);

function showAll(number, event) {
  var options = chart.options;
  options.series = data();
  chart = new Highcharts.Chart('main-chart', options);
}

document.getElementById("show-all").addEventListener("click", showAll.bind(null, 0));

function showSeriousNumber(number, event) {
  var average = parseInt(document.getElementById('heart-rate-input').value) || 60,
      from = parseInt(document.getElementById("duration-input").value) || 1,
      to = 24;

  var options = chart.options;

  options.series = data();
  options.series.forEach(function(series) {
    series.data = series.data.filter(function(data) {
      return data[0] >= from && data[0] <= to;
    });
  });

  options.series = options.series.filter(function(series) {
    if(calculateAverage(series.data) >= average) {
      series.color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;
      return true;
    } else {
      return false;
    }
  });

  var mappedAverage = {};
  options.series.forEach(function(series) {
    mappedAverage[calculateAverage(series.data)] = series;
  });

  var sortedAverageList = Object.keys(mappedAverage).sort().reverse();

  var newSeries = [];

  var counter = sortedAverageList.length < number  ? sortedAverageList.length : number;

  for(var i=0; i<counter; i++) {
    newSeries.push(mappedAverage[sortedAverageList[i]]);
  }
  options.series = newSeries;

  chart = new Highcharts.Chart('main-chart', options);
}

document.getElementById("show-serious-5").addEventListener("click", showSeriousNumber.bind(null, 5));
document.getElementById("show-serious-10").addEventListener("click", showSeriousNumber.bind(null, 10));

function showSelected(number, event) {

}
document.getElementById("show-selected").addEventListener("click", showAll.bind(null, 0));
