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

      var startDate = new Date(apiResponse.projectStartDate); //timestamp
      var endDate = new Date(apiResponse.projectStartDate);

      let count = 0;
      while (count < startDay) {
        if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
          count++;
          startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        } else {
          startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        }
      }

      count = 0;
      while (count < endDay) {
        if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
          //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)

          count++;
          endDate = new Date(endDate.setDate(endDate.getDate() + 1));
        } else {
          endDate = new Date(endDate.setDate(endDate.getDate() + 1));
        }
      }
      // console.log(title);
      // console.log('startDate', startDay);
      // console.log('endDate', endDay);
      // console.log('startDate', startDate);

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
      console.log(title);
      console.log('startDay', startDay);
      console.log('endDay', endDay);
      endDate.setDate(endDate.getDate() + 1);
      // let toolend = endDate;
      // toolend.setDate(toolend.getDate() - 1);

      let storyToAdd = {
        id: id.toString(),
        dependency: dependencies.map((id) => id.toString()),
        developer: developers[0].name,
        name: title,

        start: startDate.getTime(),
        end: endDate.getTime(),
        toolend: endDate.setDate(endDate.getDate() - 1),

        // start: startOfWeek.getTime(),
        // end: endOfWeek.getTime(),
        storyPoints: storyPoints,
        duration: endDay - startDay + 1,

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
