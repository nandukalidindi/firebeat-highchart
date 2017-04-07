function fullData(startTime, endTime) {
  var prabodh = new FireFighter();
  prabodh.epochData = prabodhEpoch;
  prabodh.dailyData = prabodhDaily;
  prabodh.startTime = startTime;
  prabodh.endTime = endTime;
  prabodh.fullyProcessedMap();

  var waqid = new FireFighter();
  waqid.epochData = prabodhEpoch;
  waqid.dailyData = waqidDaily;
  waqid.startTime = startTime;
  waqid.endTime = endTime;
  waqid.fullyProcessedMap();

  var nandu = new FireFighter();
  nandu.epochData = prabodhEpoch;
  nandu.dailyData = nanduDaily;
  nandu.startTime = startTime;
  nandu.endTime = endTime;
  nandu.fullyProcessedMap();

  return [
    {
      name: 'Prabodh',
      gender: 'Male',
      age: 23,
      cell: '(917) 123-456',
      district: 'Brooklyn',
      current_location: 'Abu Dhabi',
      zone: prabodh.zone,
      avgBPM: prabodh.avgHeartRate,
      data: prabodh.plottableData
    },
    {
      name: 'Waqid',
      gender: 'Male',
      age: 26,
      cell: '(917) 123-456',
      district: 'Bronx',
      current_location: 'NJ',
      zone: waqid.zone,
      avgBPM: waqid.avgHeartRate,
      data: waqid.plottableData
    },
    {
      name: 'Nandu',
      gender: 'Male',
      age: 24,
      cell: '(718) 679-7382',
      district: 'Bayridge',
      current_location: 'NY',
      zone: nandu.zone,
      avgBPM: nandu.avgHeartRate,
      data: nandu.plottableData
    },
    // {
    //   name: 'Parth',
    //   gender: 'Male',
    //   age: 24,
    //   cell: '(917) 909-552',
    //   district: 'NJ',
    //   current_location: 'Brooklyn',
    //   zone: calculateZone(startTime, endTime) + 2,
    //   avgBPM: avgHeartRate,
    //   data: exportableData
    // }
  ];
}
