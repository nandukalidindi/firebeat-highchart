function epoch() {
  return epochSummaries;
}

function daily() {
  return dailySummary;
}

var sedentary = 3,
    active = 2,
    highlyActive = 1;

var green = 1,
    yellow = 2,
    red = 3;

var greenZone = [0, 100],
    yellowZone = [100, 150],
    redZone = [150, 1000];

function mergeAllDailySummaries() {
  var data = daily();
  var startTime = 1490587200,
      endTime = 1490673600;

  var startTimeList = data.map(function(summary) { return summary["startTimeInSeconds"] });
  var heartRateOffsets = {};
  data.forEach(function(summary) {
    Object.keys(summary["timeOffsetHeartRateSamples"]).forEach(function(timeOffset) {
      heartRateOffsets[(summary["startTimeInSeconds"] - startTime) + parseInt(timeOffset)] = summary["timeOffsetHeartRateSamples"][timeOffset];
    });
  });


  var fifteenOffsets = {};
  var offsetCounter = startTime;
  while(endTime - offsetCounter !== 0) {
    var offset = startTime + (900 * (Math.floor((offsetCounter - startTime)/900)));
    fifteenOffsets[offset] = (fifteenOffsets[offset] || []);
    fifteenOffsets[offset].push(heartRateOffsets[offsetCounter - startTime]);
    offsetCounter = offsetCounter + 15;
  }
  return fifteenOffsets;
}


function compareEpochAndDaily() {
  var daily = mergeAllDailySummaries();
  var ep = epoch();
  var finalHash = {};
  Object.keys(daily).forEach(function(timeOffset) {
    var epochs = ep.filter(function(epoc) {
      return epoc["startTimeInSeconds"] === parseInt(timeOffset);
    }).map(function(arraySummaries) {
      return arraySummaries["intensity"];
    });
    finalHash[timeOffset] = { heartRate: daily[timeOffset], activities: epochs };
  });
}

function calculateZone() {
  
}

compareEpochAndDaily();
