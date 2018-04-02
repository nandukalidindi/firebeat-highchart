function fullData(startTime, endTime, dailyData, epochData) {
  var sunil = new FireFighter();
  sunil.epochData = epochData[0];
  sunil.dailyData = dailyData[0];
  sunil.startTime = startTime;
  sunil.endTime = endTime;
  sunil.fullyProcessedMap();

  var prabodh = new FireFighter();
  prabodh.epochData = epochData[1];
  prabodh.dailyData = dailyData[1];
  prabodh.startTime = startTime;
  prabodh.endTime = endTime;
  prabodh.fullyProcessedMap();

  var nandu = new FireFighter();
  nandu.epochData = epochData[2];
  nandu.dailyData = dailyData[2];
  nandu.startTime = startTime;
  nandu.endTime = endTime;
  nandu.fullyProcessedMap();

  return [
    {
      name: 'Sunil',
      gender: 'Male',
      age: 23,
      cell: '(917) 123-456',
      district: 'Brooklyn',
      current_location: 'Abu Dhabi',
      zone: sunil.zone || 2,
      avgBPM: sunil.avgHeartRate,
      data: sunil.plottableData
    },
    {
      name: 'Prabodh',
      gender: 'Male',
      age: 26,
      cell: '(917) 123-456',
      district: 'Bronx',
      current_location: 'NJ',
      zone: prabodh.zone || 2,
      avgBPM: prabodh.avgHeartRate,
      data: prabodh.plottableData
    },
    {
      name: 'Nandu',
      gender: 'Male',
      age: 24,
      cell: '(718) 679-7382',
      district: 'Bayridge',
      current_location: 'NY',
      zone: nandu.zone || 2,
      avgBPM: nandu.avgHeartRate,
      data: nandu.plottableData
    }
  ];
}


// function fullData(startTime, endTime) {
//   var sunil = new FireFighter();
//   sunil.epochData = sunilEpoch;
//   sunil.dailyData = sunilDaily;
//   sunil.startTime = startTime;
//   sunil.endTime = endTime;
//   sunil.fullyProcessedMap();
//
//   var prabodh = new FireFighter();
//   prabodh.epochData = sunilEpoch;
//   prabodh.dailyData = prabodhDaily;
//   prabodh.startTime = startTime;
//   prabodh.endTime = endTime;
//   prabodh.fullyProcessedMap();
//
//   var nandu = new FireFighter();
//   nandu.epochData = sunilEpoch;
//   nandu.dailyData = nanduDaily;
//   nandu.startTime = startTime;
//   nandu.endTime = endTime;
//   nandu.fullyProcessedMap();
//
//   var parth = new FireFighter();
//   parth.epochData = sunilEpoch;
//   parth.dailyData = parthDaily;
//   parth.startTime = startTime;
//   parth.endTime = endTime;
//   parth.fullyProcessedMap();
//
//   var ananth = new FireFighter();
//   ananth.epochData = sunilEpoch;
//   ananth.dailyData = ananthDaily;
//   ananth.startTime = startTime;
//   ananth.endTime = endTime;
//   ananth.fullyProcessedMap();
//
//   var dong = new FireFighter();
//   dong.epochData = sunilEpoch;
//   dong.dailyData = dongDaily;
//   dong.startTime = startTime;
//   dong.endTime = endTime;
//   dong.fullyProcessedMap();
//
//   return [
//     {
//       name: 'sunil',
//       gender: 'Male',
//       age: 23,
//       cell: '(917) 123-456',
//       district: 'Brooklyn',
//       current_location: 'Abu Dhabi',
//       zone: sunil.zone,
//       avgBPM: sunil.avgHeartRate,
//       data: sunil.plottableData
//     },
//     {
//       name: 'prabodh',
//       gender: 'Male',
//       age: 26,
//       cell: '(917) 123-456',
//       district: 'Bronx',
//       current_location: 'NJ',
//       zone: prabodh.zone,
//       avgBPM: prabodh.avgHeartRate,
//       data: prabodh.plottableData
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
