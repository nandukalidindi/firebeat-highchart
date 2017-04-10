function FireFighter() {
  this.name = "";
  this.startTime = 0;
  this.endTime = 0;
  this.epochData = [];
  this.dailyData = [];
  this.avgHeartRate = 0;
  this.zone = 0;
  this.plottableData = [];

  this.consolidateDailySummaries = consolidateDailySummaries;
  this.epochSummariesMap = epochSummariesMap;
  this.fullyProcessedMap = fullyProcessedMap;
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
  this.dailyData.forEach(function(summary) {
    Object.keys(summary["timeOffsetHeartRateSamples"]).forEach(function(timeOffset) {
      heartRateOffsets[summary["startTimeInSeconds"] + ( 15 * Math.floor(parseInt(timeOffset)/15))] = summary["timeOffsetHeartRateSamples"][timeOffset];
    });
  });
  return heartRateOffsets;
}

function epochSummariesMap() {
  epochMap = {};
  this.epochData.forEach(function(summary) {
    if(summary["activeTimeInSeconds"] === 900) {
      epochMap[summary["startTimeInSeconds"]] = [summary["intensity"]]
    } else {
      epochMap[summary["startTimeInSeconds"]] = this.epochData.filter(function(filterSummary) {
        return filterSummary["startTimeInSeconds"] === summary["startTimeInSeconds"];
      }).map(function(selectSummary) {
        return selectSummary["intensity"];
      });
    }
  }.bind(this));
  return epochMap;
}

function fullyProcessedMap() {
  epochMap = this.epochSummariesMap();
  heartRateMap = this.consolidateDailySummaries();
  finalMap = [];
  zoneMap = [];

  counterTime = 0;
  avgHeartRate = 0;
  heartTotal = 0;
  zone = 0;
  zoneCounter = 0;

  while(counterTime < (this.endTime - this.startTime)) {
    var displyableX = ((this.startTime + counterTime)%86400/3600).toFixed(2)
    displyableX = Math.floor(displyableX).toString() + ":" + (Math.floor((displyableX - Math.floor(displyableX))*(60))).toString();
    finalMap.push({x: ((this.startTime + counterTime)), displyableX: displyableX, y: heartRateMap[this.startTime + counterTime] || null, activity: (epochMap[this.startTime + 900 * Math.floor((counterTime)/900)] || []).toString()});

    if(heartRateMap[this.startTime + counterTime]) {
      avgHeartRate += heartRateMap[this.startTime + counterTime];
      heartTotal += 1;

      if(epochMap[this.startTime + 900 * Math.floor((counterTime)/900)]) {
        var fifteenActivity = 0
            count = 0;
        epochMap[this.startTime + 900 * Math.floor((counterTime)/900)].forEach(function(activity) {
          fifteenActivity += zoneHash[activity];
          count += 1;
        });
        zone += (fifteenActivity / count) * heartRateZone(heartRateMap[this.startTime + counterTime])
        zoneCounter += 1;
      }
    }
    counterTime += 15;
  }

  this.plottableData = finalMap;
  this.avgHeartRate = Math.floor(avgHeartRate / heartTotal);
  this.zone = zone / zoneCounter;
}

// var nandu = new FireFighter();
// nandu.epochData = nanduEpoch;
// nandu.dailyData = nanduDaily;
// nandu.fullyProcessedMap();
