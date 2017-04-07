function fullData(startTime, endTime) {
  var prabodh = new FireFighter();
  prabodh.epochData = prabodhEpoch;
  prabodh.dailyData = prabodhDaily;
  prabodh.startTime = startTime;
  prabodh.endTime = endTime;
  prabodh.fullyProcessedMap();

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
    // {
    //   name: 'Waqid',
    //   gender: 'Male',
    //   age: 26,
    //   cell: '(917) 123-456',
    //   district: 'Bronx',
    //   current_location: 'NJ',
    //   zone: calculateZone(startTime, endTime) + 3,
    //   avgBPM: avgHeartRate,
    //   data: exportableData
    // }, {
    //   name: 'Nandu',
    //   gender: 'Male',
    //   age: 25,
    //   cell: '(646) 100-929',
    //   district: 'Bayridge',
    //   current_location: 'Mercer St',
    //   zone: calculateZone(startTime, endTime) + 7,
    //   avgBPM: avgHeartRate,
    //   data: exportableData
    // }, {
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
