// import * as response from './sampleData.json';
// const { sprints, title: projectTitle, sprintDuration } = response;
// const tempDate = new Date(new Date().toISOString().substring(0, 10));
// const projectStartDate = tempDate.getTime();
import { DataContext } from '../Contexts/DataContext';
import { useContext } from 'react';

// import { v4 } from 'uuid';
const dateDuration = (sprintDuration, projectStartDate) => {
  const milliseconds = projectStartDate; // Convert Unix timestamp to milliseconds
  const twoWeeksMs = 7 * sprintDuration * 24 * 60 * 60 * 1000; // Calculate two weeks in milliseconds
  return milliseconds + twoWeeksMs; // Add two weeks and convert back to Unix timestamp
};
const getGanttChartFormatData = () => {
  const { apiResponse, sprints } = useContext(DataContext);

  console.log('apiResponse', apiResponse);
  const date = new Date(apiResponse.projectStartDate);
  const projectStartDate = date.getTime();
  const toReturn = []; // 1-D array
  let storyYAxis = 0;

  sprints.forEach((sprint) => {
    sprint.forEach((story) => {
      let {
        id,
        dependencies,
        developers,
        title,
        startDay,
        endDay,
        storyPoints,
      } = story;
      var startStory = projectStartDate + startDay * 60 * 60 * 24 * 1000; //timestamp
      var endStory = projectStartDate + endDay * 60 * 60 * 24 * 1000;
      const startdate = new Date(startStory); // Convert Unix timestamp to JavaScript Date object
      // const dayOfstart = startdate.getUTCDay();
      const enddate = new Date(endStory); // Convert Unix timestamp to JavaScript Date object
      // const dayOfend = enddate.getUTCDay();
      var startCount = endDay - startDay;
      var endCount = endDay - startDay;
      while (startCount > 0) {
        if (startdate.getUTCDay() === 0 || startdate.getUTCDay() === 6) {
          console.log('weekend of start', startdate);
          startdate.setUTCDate(startdate.getUTCDate() + 1);
          console.log('inside if date change');
          continue;
        }

        console.log(title, 'start', startdate);

        startCount--;
      }
      while (endCount > 0) {
        if (enddate.getUTCDay() === 0) {
          enddate.setUTCDate(enddate.getUTCDate() + 1);
          continue;
        }
        if (enddate.getUTCDay() === 6) {
          enddate.setUTCDate(enddate.getUTCDate() + 2);
          continue;
        }

        console.log(title, 'end', enddate);

        endCount--;
      }
      // const weekends = [];
      // for (let i = startStory; i <= endStory; i += 24 * 60 * 60 * 1000) {
      //   const date = new Date(i); // Convert Unix timestamp to JavaScript Date object
      //   const dayOfWeek = date.getUTCDay(); // Get day of the week (0=Sunday, 1=Monday, etc.)

      //   // If the day is a Saturday or Sunday, add it to the weekends array
      //   if (dayOfWeek === 0) {
      //     date.setUTCDate(date.getUTCDate() + 1);
      //     weekends.push(date);
      //   }
      //   if (dayOfWeek === 6) {
      //     date.setUTCDate(date.getUTCDate() - 1);
      //     weekends.push(date);
      //   }
      // }
      // const endDate = new Date(endStory);
      // endDate.setDate(date.getDate() + weekends.length);
      // endStory = date.getTime();

      let storyToAdd = {
        id: id.toString(),
        dependency: dependencies.map((id) => id.toString()),
        developer: developers[0].name,
        name: title,

        start: startdate.getTime(),
        end: enddate.getTime(),
        // start: startOfWeek.getTime(),
        // end: endOfWeek.getTime(),
        storyPoints: storyPoints,
        duration: endDay - startDay,

        y: storyYAxis,
      };
      toReturn.push(storyToAdd);

      ++storyYAxis;
    });
  });
  const formattedData = {
    title: {
      text: apiResponse.title,
    },
    colors: ['#05445e', '#189ab4', '#75e6da', '#d4f1f4'],
    sprintDuration: [
      projectStartDate,
      dateDuration(apiResponse.sprintDuration, projectStartDate),
    ],
    series: [
      {
        name: 'sprint planner',
        data: toReturn,
      },
    ],
  };
  // console.log('qwer', JSON.stringify(formattedData, null, 2));
  return formattedData;
};
export default getGanttChartFormatData;

// var weekends = [];
// var storyStartDate = projectStartDate + startDay * 60 * 60 * 24 * 1000;

// var storyEndDate = projectStartDate + endDay * 60 * 60 * 24 * 1000;
// for (
//   let i = storyStartDate;
//   i <= storyEndDate;
//   i += 24 * 60 * 60 * 1000
// ) {
//   const date = new Date(i); // Convert Unix timestamp to JavaScript Date object
//   const dayOfWeek = date.getUTCDay(); // Get day of the week (0=Sunday, 1=Monday, etc.)

//   // If the day is a Saturday or Sunday, add it to the weekends array
//   if (dayOfWeek === 0) {
//     weekends.push(date);
//   }
//   if (dayOfWeek === 6) {
//     weekends.push(date);
//   }
// }

// if (weekends.length > 1) {
//   var i = 0;
//   while (i < weekends.length) {
//     if (weekends[i].getUTCDay() - weekends[i + 1].getUTCDay() === 6) {
//       let storyToAdd = {
//         id: id.toString(),
//         dependency: dependencies.map((id) => id.toString()),
//         developer: developers[0].name,
//         name: title,

//         start: projectStartDate + startDay * 60 * 60 * 24 * 1000,
//         end: projectStartDate + endDay * 60 * 60 * 24 * 1000,
//         // start: startOfWeek.getTime(),
//         // end: endOfWeek.getTime(),
//         storyPoints: storyPoints,
//         duration: endDay - startDay,

//         y: storyYAxis,
//       };
//       toReturn.push(storyToAdd);
//       //stroyAxis dont incremnet

//       i += 2;
//     }
//   }
// }
