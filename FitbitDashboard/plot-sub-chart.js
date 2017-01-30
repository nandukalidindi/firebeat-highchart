var data = [
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

data.forEach(function(series) {
  var node = document.createElement("div");
  node.style = "height: 100px; float: left; width: 80%"

  node.id = series.name

  document.getElementById('sub-chart-list').appendChild(node);
});

// var node = document.createElement("div");
// node.style = "height: 100px; float: left; width: 80%"
//
// node.id = "prabodh"
//
// document.getElementById('sub-chart-list').appendChild(node);

var parentElement = document.getElementById('sub-chart-list'),
    childElements = parentElement.children;

for(var i = 0; i < childElements.length; i++) {
  var container = childElements[i].id;
      dataIndex = i;

  var subChartOptions = {
      chart: {
          zoomType: 'x'
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          title: { text: '' },
          labels: {
            align: 'left',
            x: 3,
            y: -3
          }
      },
      yAxis: {
          tickInterval: 120,
          title: { text: '' },
          labels: {
            align: 'left',
            x: 3,
            y: -3
          }
      },
      exporting: { enabled: false },
      credits: { enabled: false },
      legend: {
          enabled: false
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.y} BPM at {point.x}:00'
      },
      plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 0
                  },
                  stops: [
                      [0, "#FF0000"]
                  ]
              },
              marker: {
                  radius: 2
              },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },

      series: [{
          type: 'area',
          name: 'Generic Fireman',
          data: data[dataIndex].data
      }]
  }

  chart = new Highcharts.Chart(container, subChartOptions);
}
