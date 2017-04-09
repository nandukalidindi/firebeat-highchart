function data() {
  return fullData;
}

var context = "red";

var typeMap = {red: [], yellow: [], green: []}

data().forEach(function(series) {
  if(series.zone >=6) {
    typeMap.red.push(series);
  } else if (series.zone >=4 && series.zone < 6) {
    typeMap.yellow.push(series);
  } else if (series.zone < 4) {
    typeMap.green.push(series);
  }
});

Object.keys(typeMap).forEach(function(type) {
  typeMap[type+'min'] = Math.min.apply(null, typeMap[type]);
  var element = document.getElementById(type + '-heart');
  element.children[1].textContent = typeMap[type].length;
});

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
  options.series = getFilteredDataOnBpmAndTime(leftPanelData);

  options.series.forEach(function(series) {
    series.color = colors.find(function(chartSeries) { return chartSeries.name === series.name }).color;
    series.dashStyle = "solid";
  });

  chart = new Highcharts.Chart('main-chart', options);

  updateList(options.series);
}

function showSeriousNumber(number, event) {
  var options = chart.options;
  document.getElementById('heart-rate-input').value = typeMap[context + 'min'];
  options.series = getFilteredDataOnBpmAndTime(leftPanelData);

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

function showSelected(selectedData=[], emptyData=false, event) {
  var minifiedData = selectedData && selectedData.length !== 0 ? selectedData : getFilteredDataOnBpmAndTime(leftPanelData);
  minifiedData = emptyData === true ? [] : minifiedData;
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

// const redData = truncateData("red", null);
// const yellowData = truncateData("yellow", null);
// const greenData = truncateData("green", null);
//
// const dataMap = { "red": redData, "yellow": yellowData, "green": greenData };


document.getElementById("heart-rate-input").addEventListener("keyup", updateChartOnHeartRate);
document.getElementById("duration-input").addEventListener("keyup", updateChartOnTime);

document.getElementById("show-all").addEventListener("click", showAll.bind(null, 0));
document.getElementById("show-serious-5").addEventListener("click", showSeriousNumber.bind(null, 5));
document.getElementById("show-serious-10").addEventListener("click", showSeriousNumber.bind(null, 10));
document.getElementById("show-selected").addEventListener("click", showSelected.bind(null, [], false));



function updateList(data){
  $('#list-item-group').html('');

  data.forEach(function(item) {
    var average = item.avgBPM;
    var htmlItem =
    `<div class="" style="display:flex; justify-content:space-between; margin: 10px;">
      <div style="width:15%"><img src="icons/user-icon.png" class="bottom-icon"></div>

      <div class="bottom-details">
        <div>
          <div class="bottom-text-name detail-separation">${item.name}</div>
          <div id=${item.name}online class="detail-separation" data-toggle="tooltip" data-placement="right" title="On duty">
            <img src="icons/online-icon.png" width="8">
          </div>
        </div>
        <div class="bottom-sub-details">
          <div class="bottom-text" style="width: 10%;">
            <div>${item.gender}</div>
            <div>Age: ${item.age}</div>
          </div>
          <div class="bottom-text" style="width: 32%;">
            <div>Current: ${100} bpm</div>
            <div>Rest: ${average - 15} bpm</div>
            <div>Average: ${average} bpm (Last 5 hours) </div>
          </div>
          <div class="bottom-text" style="width: 28%;">
            <div>Cell: ${item.cell} </div>
            <div>District: ${item.district} </div>
            <div>Current Location: ${item.current_location} </div>
          </div>
          <div class="" style="width: 10%; margin-right: 10px">
            <a id="notify-button">
              <img src="icons/notify-button.png" class="notify-button">
            </a>
          </div>
        </div>
      </div>
    </div>`;

    $('#list-item-group').append(htmlItem);
    $('#' + item.name + 'online').tooltip();
  });

}

function buildUserStatisticDOM(series) {
  var leftPanelDiv = document.getElementById('left-panel');
  var avgInt = series.avgBPM;

  var statisticHTML =
  `<div style="height: 140px; margin-top: 20px;">
      <div style="float:left; width: 20%; height: 130px; display:flex; flex-direction: column; justify-content: space-between; align-items: center;">
       <img class="profile-icon-left-panel" src="icons/user-icon.png">
       <img class="" src="icons/online-icon.png" width=12>
       <input class="checkbox-left-panel" type="checkbox" checked=true id="${series.name}-checkbox">
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
  document.getElementById(series.name + "-checkbox").addEventListener('change', changedEvent);
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
              enabled: false
              // align: 'left',
              // x: 3,
              // y: -3
            },
            gridLineWidth: 0,
            minorTickLength: 0,
            tickLength: 0
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
  changedEvent(null);
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
  var filterData = getFilteredDataOnBpmAndTime(data(), false);
  return filterData.filter(function(series) {
    var average = parseInt(calculateAverage(series.data));
    if(average <= below && average > above) {
      return true;
    } else {
      return false;
    }
  });
}

var heartList = [document.getElementById('red-heart'), document.getElementById('yellow-heart'), document.getElementById('green-heart')];

function truncateData(color, event) {
  var heartRateInputElement = document.getElementById('heart-rate-input');
  switch (color) {
    case 'red':
      leftPanelData = typeMap.red;
      break;
    case 'yellow':
      leftPanelData = typeMap.yellow;
      break;
    case 'green':
      leftPanelData = typeMap.green;
      break;
    default:
      leftPanelData = data();
  }
  context = color;
  showSelected(leftPanelData, null, false);

  if(event != null) {
    heartList.forEach(function(element) {
      var button = event.target.tagName == "BUTTON" ? event.target : event.target.parentElement;
      if(element.id == button.id) {
        $("#" + element.id).addClass('active');
      } else {
        $("#" + element.id).removeClass('active');
      }
    });
  }

  renderChartForData(leftPanelData);
  return leftPanelData;
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

document.getElementById('green-heart').click();

function changedEvent(event) {
  var toBeDisabled = true;
  (data() || []).forEach(function(series) {
    var element = document.getElementById(series.name + "-checkbox");
    if(element && element.checked) {
      toBeDisabled = false;
    }
  });
  if(toBeDisabled) {
    document.getElementById('show-selected').style = "pointer-events: none; opacity: 0.5;";
    showSelected([], true, null)
  } else {
    document.getElementById('show-selected').style = "";
    showSelected([], false, null)
  }
}
