function FireFighter() {
  this.name = "";
  this.epochData = [];
  this.dailyData = [];
  this.avgHeartRate = 0;
  this.zone = 0;

  this.consolidateDailySummaries = consolidateDailySummaries;

  this.epochSummariesMap = epochSummariesMap;

  this.fullyProcessedMap = fullyProcessedMap;
}


function epochSummaries() {
  return epochSummary;
}

function dailySummaries() {
  return dailySummary;
}

zoneHash = {
  SEDENTARY: 3,
  ACTIVE: 2,
  HIGHLY_ACTIVE: 1
}

function heartRateZone(heartRate) {
  if(heartRate >= 0 && heartRate < 100) {
    return 1
  } else if (heartRate >= 100 && heartRate < 150) {
    return 2
  } else {
    return 3;
  }
}

function consolidateDailySummaries() {
  heartRateOffsets = {}
  dailySummaries().forEach(function(summary) {
    Object.keys(summary["timeOffsetHeartRateSamples"]).forEach(function(timeOffset) {
      heartRateOffsets[summary["startTimeInSeconds"] + ( 15 * Math.floor(parseInt(timeOffset)/15))] = summary["timeOffsetHeartRateSamples"][timeOffset];
    });
  });
  return heartRateOffsets;
}

function epochSummariesMap() {
  epochMap = {};
  epochSummaries().forEach(function(summary) {
    if(summary["activeTimeInSeconds"] === 900) {
      epochMap[summary["startTimeInSeconds"]] = [summary["intensity"]]
    } else {
      epochMap[summary["startTimeInSeconds"]] = epochSummaries().filter(function(filterSummary) {
        return filterSummary["startTimeInSeconds"] === summary["startTimeInSeconds"];
      }).map(function(selectSummary) {
        return selectSummary["intensity"];
      });
    }
  });
  return epochMap;
}

function fullyProcessedMap(startTime, endTime) {
  epochMap = epochSummariesMap();
  heartRateMap = consolidateDailySummaries();
  finalMap = [];
  zoneMap = [];

  counterTime = 0;
  avgHeartRate = 0;
  heartTotal = 0;
  zone = 0;
  zoneCounter = 0;

  while(counterTime < (endTime - startTime)) {
    finalMap.push([counterTime, heartRateMap[startTime + counterTime] || null, epochMap[startTime + 900 * ((counterTime - startTime)/900)]]);

    if(heartRateMap[startTime + counterTime]) {
      avgHeartRate += heartRateMap[startTime + counterTime];
      heartTotal += 1;

      if(epochMap[startTime + 900 * Math.floor((counterTime)/900)]) {
        var fifteenActivity = 0
            count = 0;
        epochMap[startTime + 900 * Math.floor((counterTime)/900)].forEach(function(activity) {
          fifteenActivity += zoneHash[activity];
          count += 1;
        });
        zone += (fifteenActivity / count) * heartRateZone(heartRateMap[startTime + counterTime])
        zoneCounter += 1;
      }
    }
    counterTime += 15;
  }

  avgHeartRate = avgHeartRate / heartTotal;
  zone = zone / zoneCounter;
}

fullyProcessedMap(1490587200, 1490673600)
