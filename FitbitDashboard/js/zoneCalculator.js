function epoch() {
  return epochSummaries;
}

var exportableData;

function daily() {
  return dailySummary;
}

var activityMap = {
  "SEDENTARY": 3,
  "ACTIVE": 2,
  "HIGHLY_ACTIVE": 1
}

var zoneRangeMap = {
  green: [0, 3],
  yellow: [3, 5],
  red: [5, 100]
}

var greenZone = [0, 100],
    yellowZone = [100, 150],
    redZone = [150, 1000];

function mergeAllDailySummaries(startTime, endTime) {
  var data = daily();

  var heartRateOffsets = {};
  data.forEach(function(summary) {
    Object.keys(summary["timeOffsetHeartRateSamples"]).forEach(function(timeOffset) {
      heartRateOffsets[(summary["startTimeInSeconds"] - startTime) + parseInt(timeOffset)] = summary["timeOffsetHeartRateSamples"][timeOffset];
    });
  });

  exportableData = [];
  avgHeartRate = 0;
  var counter = 0;

  var fifteenOffsets = {};
  var offsetCounter = startTime;
  while(endTime - offsetCounter >= 0) {
    var offset = startTime + (900 * (Math.floor((offsetCounter - startTime)/900)));
    fifteenOffsets[offset] = (fifteenOffsets[offset] || []);
    fifteenOffsets[offset].push(heartRateOffsets[offsetCounter - startTime]);
    exportableData.push([offsetCounter - startTime, heartRateOffsets[offsetCounter - startTime] || null]);
    if(heartRateOffsets[offsetCounter - startTime]) {
      counter += 1;
      avgHeartRate = avgHeartRate + (heartRateOffsets[offsetCounter - startTime]);
    }
    offsetCounter = offsetCounter + 15;
  }

  avgHeartRate = Math.floor((avgHeartRate) / (counter));
  return fifteenOffsets;
}


function compareEpochAndDaily(startTime, endTime) {
  var daily = mergeAllDailySummaries(startTime, endTime);
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
  return finalHash;
}

function calculateZone(startTime, endTime) {
  var finalHash = compareEpochAndDaily(startTime, endTime);
  var finalZone = 0;
  var finalZoneCount = 0;
  Object.keys(finalHash).forEach(function(timeOffset) {
    var offsetZone = calculateOffsetZone(finalHash[timeOffset]);
    if(offsetZone !== 0) {
      finalZone += offsetZone;
      finalZoneCount += 1;
    }
  });

  return Math.floor(finalZone / finalZoneCount);
}

function calculateOffsetZone(offsetObject) {
  var sum = 0,
      points = 0;

  offsetObject["heartRate"].forEach(function(data) {
    if(data) {
      sum += data;
      points += 1;
    }
  });

  var avgRate = (sum / points);
  var zone = 0;

  if(avgRate === 0) {
    return 0;
  }

  if(avgRate >= greenZone[0] && avgRate < greenZone[1]) {
    zone = getWeighedValue(1, offsetObject["activities"]);
  } else if (avgRate >= yellowZone[0] && avgRate < yellowZone[1]) {
    zone = getWeighedValue(2, offsetObject["activities"]);
  } else if (avgRate >= redZone[0] && avgRate < redZone[1]) {
    zone = getWeighedValue(3, offsetObject["activities"]);
  }

  return zone;
}


function getWeighedValue(avgHeartRateZone, activities) {
  var sum = 0;
  activities.forEach(function(activity) {
    sum += activityMap[activity];
  });

  return avgHeartRateZone * (sum / (activities.length));
}
