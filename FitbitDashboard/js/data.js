function fullData(startTime, endTime, dailyData, epochData) {
  var prabodh = new FireFighter();
  prabodh.epochData = epochData[0];
  prabodh.dailyData = dailyData[0];
  prabodh.startTime = startTime;
  prabodh.endTime = endTime;
  prabodh.fullyProcessedMap();

  var waqid = new FireFighter();
  waqid.epochData = epochData[1];
  waqid.dailyData = dailyData[1];
  waqid.startTime = startTime;
  waqid.endTime = endTime;
  waqid.fullyProcessedMap();

  var nandu = new FireFighter();
  nandu.epochData = epochData[2];
  nandu.dailyData = dailyData[2];
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
      zone: 2,
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
      zone: 2,
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
      zone: 2,
      avgBPM: nandu.avgHeartRate,
      data: nandu.plottableData
    }
  ];
}


// function fullData(startTime, endTime) {
//   var prabodh = new FireFighter();
//   prabodh.epochData = prabodhEpoch;
//   prabodh.dailyData = prabodhDaily;
//   prabodh.startTime = startTime;
//   prabodh.endTime = endTime;
//   prabodh.fullyProcessedMap();
//
//   var waqid = new FireFighter();
//   waqid.epochData = prabodhEpoch;
//   waqid.dailyData = waqidDaily;
//   waqid.startTime = startTime;
//   waqid.endTime = endTime;
//   waqid.fullyProcessedMap();
//
//   var nandu = new FireFighter();
//   nandu.epochData = prabodhEpoch;
//   nandu.dailyData = nanduDaily;
//   nandu.startTime = startTime;
//   nandu.endTime = endTime;
//   nandu.fullyProcessedMap();
//
//   var parth = new FireFighter();
//   parth.epochData = prabodhEpoch;
//   parth.dailyData = parthDaily;
//   parth.startTime = startTime;
//   parth.endTime = endTime;
//   parth.fullyProcessedMap();
//
//   var ananth = new FireFighter();
//   ananth.epochData = prabodhEpoch;
//   ananth.dailyData = ananthDaily;
//   ananth.startTime = startTime;
//   ananth.endTime = endTime;
//   ananth.fullyProcessedMap();
//
//   var dong = new FireFighter();
//   dong.epochData = prabodhEpoch;
//   dong.dailyData = dongDaily;
//   dong.startTime = startTime;
//   dong.endTime = endTime;
//   dong.fullyProcessedMap();
//
//   return [
//     {
//       name: 'Prabodh',
//       gender: 'Male',
//       age: 23,
//       cell: '(917) 123-456',
//       district: 'Brooklyn',
//       current_location: 'Abu Dhabi',
//       zone: prabodh.zone,
//       avgBPM: prabodh.avgHeartRate,
//       data: prabodh.plottableData
//     },
//     {
//       name: 'Waqid',
//       gender: 'Male',
//       age: 26,
//       cell: '(917) 123-456',
//       district: 'Bronx',
//       current_location: 'NJ',
//       zone: waqid.zone,
//       avgBPM: waqid.avgHeartRate,
//       data: waqid.plottableData
//     },
//     {
//       name: 'Nandu',
//       gender: 'Male',
//       age: 24,
//       cell: '(718) 679-7382',
//       district: 'Bayridge',
//       current_location: 'NY',
//       zone: nandu.zone,
//       avgBPM: nandu.avgHeartRate,
//       data: nandu.plottableData
//     },
//     {
//       name: 'Parth',
//       gender: 'Male',
//       age: 24,
//       cell: '(917) 909-552',
//       district: 'NJ',
//       current_location: 'Brooklyn',
//       zone: parth.zone,
//       avgBPM: parth.avgHeartRate,
//       data: parth.plottableData
//     },
//     {
//       name: 'Ananth',
//       gender: 'Male',
//       age: 22,
//       cell: '(917) 909-5521',
//       district: 'Brooklyn',
//       current_location: 'Brooklyn',
//       zone: ananth.zone,
//       avgBPM: ananth.avgHeartRate,
//       data: ananth.plottableData
//     },
//     {
//       name: "Dong",
//       gender: 'Male',
//       age: 23,
//       cell: '(616) 123-456',
//       district: 'Manhattan',
//       current_location: "Brooklyn",
//       zone: dong.zone,
//       avgBPM: dong.avgHeartRate,
//       data: dong.plottableData
//     }
//   ];
// }
