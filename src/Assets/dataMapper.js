// import * as response from './sampleData.json';
// const { sprints, title: projectTitle, sprintDuration } = response;
// const tempDate = new Date(new Date().toISOString().substring(0, 10));
// const projectStartDate = tempDate.getTime();
import { DataContext } from '../Contexts/DataContext';
import { useContext } from 'react';

// import { v4 } from 'uuid';

const getGanttChartFormatData = (
  apiResponse,
  sprint,
  sprintNum,
  storyColors,
) => {
  const toReturn = []; // 1-D array
  let storyYAxis = 0;
  const range = apiResponse.sprintDuration * 5;

  const sprintStartDay = sprintNum * range;
  const sprintEndDay = sprintStartDay + range;

  sprint.forEach((story) => {
    let { id, dependencies, developers, title, startDay, endDay, storyPoints } =
      story;

    if (startDay < sprintStartDay) {
      startDay = sprintStartDay;
    }
    if (endDay > sprintEndDay) {
      endDay = sprintEndDay;
    }

    var startDate = new Date(apiResponse.projectStartDate); //timestamp

    let count = 0;
    while (
      count < startDay ||
      startDate.getDay() === 0 ||
      startDate.getDay() === 6
    ) {
      if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
        count++;
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } else {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      }
    }

    let endDate = new Date(startDate);
    const duration = endDay - startDay;
    count = 0;
    while (count < duration) {
      if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
        //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)

        count++;
        endDate = new Date(endDate.setDate(endDate.getDate() + 1));
      } else {
        endDate = new Date(endDate.setDate(endDate.getDate() + 1));
      }
    }

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
      duration: endDay - startDay,
      color: storyColors[id],

      y: storyYAxis,
    };
    toReturn.push(storyToAdd);

    ++storyYAxis;
  });

  const formattedData = {
    colors: ['#05445e', '#189ab4', '#75e6da', '#d4f1f4'],

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
