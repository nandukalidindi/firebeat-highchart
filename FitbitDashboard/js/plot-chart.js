function data() {
  return fullData;
}

var contextData = data();
var sortAlphabeticToggle = true;

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

function updateChartOnHeartRate(event) {
  if(event.target.value >= 200) {
    event.target.value = 200;
  }
  genericUpdate();
}

function updateChartOnTime(event) {
  if(event.target.value >= 24) {
    event.target.value = 24;
  }
  genericUpdate();
}

function genericUpdate() {
  var options = chart.options;
  options.series = getFilteredDataOnBpmAndTime();
  chart = new Highcharts.Chart('main-chart', options);
  updateList(options.series);
}

function showAll(number, event) {
  var options = chart.options;
  options.series = data();

  options.series.forEach(function(series) {
    series.color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;
    series.dashStyle = "solid";
  });

  document.getElementById('heart-rate-input').value = 60;
  document.getElementById('duration-input').value = 1;

  chart = new Highcharts.Chart('main-chart', options);

  updateList(options.series);
}

function showSeriousNumber(number, event) {
  var options = chart.options;
  options.series = getFilteredDataOnBpmAndTime();

  options.series = options.series.sort(function(a, b) {
    a.color = colors.find(function(chartSeries) { return chartSeries.name === a.name }).color;
    a.dashStyle = "solid";
    b.color = colors.find(function(chartSeries) { return chartSeries.name === b.name }).color;
    b.dashStyle = "solid";
    var averageA = calculateAverage(a.data),
        averageB = calculateAverage(b.data);
    return (averageA < averageB ? 1 : averageA > averageB ? -1 : 0);
  });

  options.series = options.series.slice(0, number);
  chart = new Highcharts.Chart('main-chart', options);
  updateList(options.series);
}

function showSelected(selectedData=[], event) {
  var minifiedData = selectedData && selectedData.length !== 0 ? selectedData : data();
  var newData = [];
  minifiedData.forEach(function(series) {
    var element = document.getElementById(series.name + "-checkbox");
    var checked = element && element.checked;
    if(checked) {
      series.color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;
      series.dashStyle = "solid";
      newData.push(series);
    }
  });

  var options = chart.options;
  options.series = newData.length === 0 ? minifiedData : newData;

  chart = new Highcharts.Chart('main-chart', options);

  updateList(options.series);
}

mainChartOptions.series = data();

chart = new Highcharts.Chart('main-chart', mainChartOptions)

const colors = chart.series.map(function(series) { return { color: series.color, name: series.name }; });


document.getElementById("heart-rate-input").addEventListener("keyup", updateChartOnHeartRate);
document.getElementById("duration-input").addEventListener("keyup", updateChartOnTime);

document.getElementById("show-all").addEventListener("click", showAll.bind(null, 0));
document.getElementById("show-serious-5").addEventListener("click", showSeriousNumber.bind(null, 5));
document.getElementById("show-serious-10").addEventListener("click", showSeriousNumber.bind(null, 10));
document.getElementById("show-selected").addEventListener("click", showSelected.bind(null, []));



function updateList(data){
  $('#list-item-group').html('');

  data.forEach(function(item) {
    var currentTime = (new Date()).getHours(),
        currentBPM = item.data.find(function(entry) { return entry[0] == currentTime; })[1];

    var average = calculateAverage(item.data);
    var htmlItem =
    `<div class="" style="display:flex; justify-content:space-between; margin: 10px;">
      <div style="width:15%"><img src="icons/user-icon.png" class="bottom-icon"></div>

      <div class="bottom-details">
        <div>
          <span class="bottom-text-name">${item.name}</span><span>
            <img src="icons/online-icon.png" width="8"></span>
        </div>
        <div class="bottom-sub-details">
          <div class="bottom-text" style="width: 10%;">
            <div>${item.gender}</div>
            <div>Age: ${item.age}</div>
          </div>
          <div class="bottom-text" style="width: 20%;">
            <div>Current: ${currentBPM} bpm</div>
            <div>Rest: ${average - 15} bpm</div>
            <div>Average: ${average} bpm </div>
          </div>
          <div class="bottom-text" style="width: 35%;">
            <div>Cell: ${item.cell} </div>
            <div>District: ${item.district} </div>
            <div>Current Location: ${item.current_location} </div>
          </div>
          <div class="" style="width: 15%">
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
       <img class="" src="icons/online-icon.png" width=12>
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

function renderChartForData(data, retainSortOptions=true) {
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

    if(retainSortOptions) {
      resetAll();
    }

    subChartOptions.plotOptions.area.fillColor.stops[0][1] = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;

    subChartOptions.series[0].color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;

    subChart = new Highcharts.Chart(container, subChartOptions);
  });
}

var leftPanelData = data();

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

function sortAlphabetically(event) {
  var sortedData = leftPanelData;
  sortedData.sort(function(a,b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return sortAlphabeticToggle ? (x < y ? -1 : x > y ? 1 : 0) : (x < y ? 1 : x > y ? -1 : 0);
  });

  sortAlphabeticToggle = !sortAlphabeticToggle;
  event.target.src = sortAlphabeticToggle ? "icons/sort-alphabet-descending.png" : "icons/sort-alphabet-ascending.png";
  renderChartForData(sortedData, false);
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
  renderChartForData(sortedData, false);
}

document.getElementById('sort-alphabet').addEventListener('click', sortAlphabetically);

document.getElementById('sort-numeric').addEventListener('click', sortNumerically);

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

var heartList = [document.getElementById('red-heart'), document.getElementById('yellow-heart'), document.getElementById('green-heart')];

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

  showSelected(leftPanelData, null);

  heartList.forEach(function(element) {
    var button = event.target.tagName == "BUTTON" ? event.target : event.target.parentElement;
    if(element.id == button.id) {
      $("#" + element.id).addClass('active');
    } else {
      $("#" + element.id).removeClass('active');
    }
  })

  renderChartForData(leftPanelData);
}
document.getElementById('red-heart').addEventListener('click', truncateData.bind(null, 'red'));
document.getElementById('yellow-heart').addEventListener('click', truncateData.bind(null, 'yellow'));
document.getElementById('green-heart').addEventListener('click', truncateData.bind(null, 'green'));



function resetAll() {
    selectAllToggle = true;
    sortAlphabeticToggle = false;
    sortNumericToggle = false;

    data().forEach(function(series) {
      var element = document.getElementById(series.name + '-checkbox');
      if(element) {
        element.checked = true;
      }
    });

    document.getElementById('select-all').innerText = "Deselect all";

    document.getElementById('sort-alphabet').children[0].src = "icons/sort-alphabet-ascending.png";
    document.getElementById('sort-numeric').children[0].src = "icons/sort-numeric-ascending.png";
}

document.getElementById('red-heart').click();
