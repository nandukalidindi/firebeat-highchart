var mainChartOptions = {
    chart: { type: 'line' },
    title: { text: '' },
    subtitle: { text: '' },
    exporting: { enabled: false },
    credits: { enabled: false },
    xAxis: {
        title: { text: '' },
        gridLineWidth: 1,
        tickInterval: 1,
        min: 0,
        max: 10,
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

    series: [{
      // data: [ {x: 62519, y:72, activity: 0}, {x: 62521, y:null, activity: 0}, {x: 62521, y:72, activity: 0} ]
      data: [ [0, 1], [4, 3] ]
}],
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


chart = new Highcharts.Chart('main-chart', mainChartOptions);
