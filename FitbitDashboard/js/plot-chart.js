function data() {
  return fullData;
}

mainChartOptions.series = data();

chart = new Highcharts.Chart('main-chart', mainChartOptions)

var colors = chart.series.map(function(series) { return { color: series.color, name: series.name }; });

function calculateAverage(data) {
  var size = data.length,
      sum = 0;
  data.forEach(function(entry) {
    sum += entry[1];
  });

  return Math.round(sum/size);
}

function getFilteredDataOnBpmAndTime() {
  var average = parseInt(document.getElementById('heart-rate-input').value) || 60,
      from = parseInt(document.getElementById("duration-input").value) || 1,
      to = 24;

  var filterData = [];
  filterData = data();
  filterData.forEach(function(series) {
    series.data = series.data.filter(function(data) {
      return data[0] >= from && data[0] <= to;
    });
  });

  filterData = filterData.filter(function(series) {
    if(calculateAverage(series.data) >= average) {
      series.color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;
      return true;
    } else {
      return false;
    }
  });

  return filterData;
}

function updateChartOnHeartRateOrTimeFrameChange(event) {

  var options = chart.options;

  options.series = getFilteredDataOnBpmAndTime();

  chart = new Highcharts.Chart('main-chart', options);

  updateList(options.series);

}

document.getElementById("duration-input").addEventListener("keyup", updateChartOnHeartRateOrTimeFrameChange);
document.getElementById("heart-rate-input").addEventListener("keyup", updateChartOnHeartRateOrTimeFrameChange);

function showAll(number, event) {
  var options = chart.options;
  options.series = data();

  document.getElementById('heart-rate-input').value = 60;
  document.getElementById('duration-input').value = 1;

  chart = new Highcharts.Chart('main-chart', options);

  updateList(options.series);
}

document.getElementById("show-all").addEventListener("click", showAll.bind(null, 0));

function showSeriousNumber(number, event) {
  var options = chart.options;

  options.series = getFilteredDataOnBpmAndTime();

  options.series = options.series.sort(function(a, b) {
    var averageA = calculateAverage(a.data),
        averageB = calculateAverage(b.data);

    return (averageA < averageB ? 1 : averageA > averageB ? -1 : 0);
  });

  options.series = options.series.slice(0, number);

  chart = new Highcharts.Chart('main-chart', options);

  updateList(options.series);
}

document.getElementById("show-serious-5").addEventListener("click", showSeriousNumber.bind(null, 5));
document.getElementById("show-serious-10").addEventListener("click", showSeriousNumber.bind(null, 10));

function showSelected(event) {
  var newData = [];
  data().forEach(function(series) {
    var element = document.getElementById(series.name + "-checkbox");
    var checked = element && element.checked;
    if(checked) {
      series.color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;
      newData.push(series);
    }
  });

  var options = chart.options;
  options.series = newData;

  chart = new Highcharts.Chart('main-chart', options);

  updateList(newData);
}
document.getElementById("show-selected").addEventListener("click", showSelected);



function updateList(data){
  $('#list-item-group').html('');

  data.forEach(function(item){
    var htmlItem =
    `<div class="" style="display:flex; justify-content:space-between; margin: 10px;">
      <div style="width:15%"><img src="icons/user-icon.png" class="bottom-icon"></div>

      <div class="bottom-details">
        <div>
          <span class="bottom-text-name">${item.name}</span><span>
            <img src="icons/online-icon.png" width="8"></span>
        </div>
        <div class="bottom-sub-details">
          <div class="bottom-text">
            <div>${item.gender}</div>
            <div>Age: ${item.age}</div>
          </div>
          <div class="bottom-text">
            <div>Current: 132 bpm</div>
            <div>Rest: 78 bpm</div>
            <div>Average: ${calculateAverage(item.data)} bmp (last 5hrs)</div>
          </div>
          <div class="bottom-text">
            <div>Cell: ${item.cell} </div>
            <div>District: ${item.district} </div>
            <div>Current Location: New York</div>
          </div>
          <div class="">
            <a id="notify-button">
              <img src="icons/notify-button.png" class="notify-button">
            </a>
          </div>
        </div>
      </div>
    </div>`;

    $('#list-item-group').append(htmlItem);
  });

}

function buildUserStatisticDOM(series) {
  var leftPanelDiv = document.getElementById('left-panel');
  var avgInt = parseInt(calculateAverage(series.data));
  var statisticHTML =
  `<div style="height: 140px; margin-top: 20px;">
      <div style="float:left; width: 20%; height: 130px; display:flex; flex-direction: column; justify-content: space-between; align-items: center;">
       <img class="profile-icon-left-panel" src="icons/user-icon.png">
       <input class="checkbox-left-panel" type="checkbox" id="${series.name}-checkbox">
      </div>
      <div class="sub-chart-container">
        <div style="height: 40px; width: 100%; float:left; margin-left: 10px;">
          <div class="sub-chart-name"> ${series.name} </div>
          <div class="sub-chart-avg"> ${avgInt} </div>
          <div class="dim-font"> AVG BPM </div>
          <div class="sub-chart-avg"> ${avgInt - 15} </div>
          <div class="dim-font"> REST BPM </div>
         </div>
         <div style="height: 100px; float: left; width: 100%" id=${series.name}>
       </div>
    </div>`;

  $("#left-panel").append(statisticHTML);
}

function renderChartForData(data) {
  var leftPanelDiv = document.getElementById('left-panel')
  while (leftPanelDiv.hasChildNodes()) {
    leftPanelDiv.removeChild(leftPanelDiv.lastChild);
  }

  data.forEach(function(series, index) {
    buildUserStatisticDOM(series);
    var container = series.name;

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
            name: series.name,
            data: series.data
        }]
    }

    subChartOptions.plotOptions.area.fillColor.stops[0][1] = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;

    subChartOptions.series[0].color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;

    subChart = new Highcharts.Chart(container, subChartOptions);
  });
}

var leftPanelData = data();

function getDataBetween(above, below) {
  var data = this.data();
  return data.filter(function(series) {
    var average = parseInt(calculateAverage(series.data));
    if(average <= below && average > above) {
      return true;
    } else {
      return false;
    }
  });
}

var redRangeMin = 120;
    redRangeMax = 200;

    yellowRangeMin = 110;
    yellowRangeMax = 120;

    greenRangeMin = 0;
    greenRangeMax = 110;

function createBPMTypeMap() {
  var data = this.data();
  var typeMap = {red: 0, yellow: 0, green: 0};

  data.forEach(function(series) {
    var average = calculateAverage(series.data);
    if(average > redRangeMin && average <= redRangeMax) {
      typeMap.red = typeMap.red + 1;
    } else if (average > yellowRangeMin && average <= yellowRangeMax) {
      typeMap.yellow = typeMap.yellow + 1;
    } else if (average > greenRangeMin && average <= greenRangeMax) {
      typeMap.green = typeMap.green + 1;
    }
  });

  return typeMap;
}

var typeMap = createBPMTypeMap();
Object.keys(typeMap).forEach(function(type) {
  var element = document.getElementById(type + '-heart');
  element.children[1].textContent = typeMap[type];
});

function truncateData(color, event) {
  switch (color) {
    case 'red':
      leftPanelData = getDataBetween(redRangeMin, redRangeMax);
      break;
    case 'yellow':
      leftPanelData = getDataBetween(yellowRangeMin, yellowRangeMax);
      break;
    case 'green':
      leftPanelData = getDataBetween(greenRangeMin, greenRangeMax);
      break;
    default:
      leftPanelData = data();
  }

  renderChartForData(leftPanelData);
}
document.getElementById('red-heart').addEventListener('click', truncateData.bind(null, 'red'));
document.getElementById('yellow-heart').addEventListener('click', truncateData.bind(null, 'yellow'));
document.getElementById('green-heart').addEventListener('click', truncateData.bind(null, 'green'));

document.getElementById('red-heart').click();

var selectAllToggle = true;
function selectDeselectAllAvaiableCheckboxes(event) {
  data().forEach(function(series) {
    var element = document.getElementById(series.name + "-checkbox");
    if(element) {
      element.checked = selectAllToggle;
    }
  });

  if(selectAllToggle) {
    event.target.innerText = "Deselect all";
  } else {
    event.target.innerText = "Select all";
  }
  selectAllToggle = !selectAllToggle;
}
document.getElementById('select-all').addEventListener('click', selectDeselectAllAvaiableCheckboxes);

function filterData(event) {
  var searchString = event.target.value.toLowerCase();

  var filteredData = leftPanelData.filter(function(series) {
    if(series.name.toLowerCase().indexOf(searchString) !== -1) {
      return true;
    } else {
      return false;
    }
  });

  renderChartForData(filteredData);
}
document.getElementById('search-bar').addEventListener('keyup', filterData);

var sortToggle = true;
function sortAlphabetically(event) {
  var sortedData = leftPanelData;
  sortedData.sort(function(a,b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return sortToggle ? (x < y ? -1 : x > y ? 1 : 0) : (x < y ? 1 : x > y ? -1 : 0);
  });

  sortToggle = !sortToggle;

  event.target.src = sortToggle ? "icons/sort-alphabet-descending.png" : "icons/sort-alphabet-ascending.png";

  renderChartForData(sortedData);
}

var sortNumericToggle = true;
function sortNumerically(event) {
  var sortedData = leftPanelData;

  sortedData.sort(function(a, b) {
    var x = calculateAverage(a.data),
        y = calculateAverage(b.data);

    return sortNumericToggle ? (x < y ? -1 : x > y ? 1 : 0) : (x < y ? 1 : x > y ? -1 : 0);
  });

  sortNumericToggle = !sortNumericToggle;

  event.target.src = sortNumericToggle ? "icons/sort-numeric-descending.png" : "icons/sort-numeric-ascending.png";

  renderChartForData(sortedData);
}

document.getElementById('sort-alphabet').addEventListener('click', sortAlphabetically);



document.getElementById('sort-numeric').addEventListener('click', sortNumerically);
