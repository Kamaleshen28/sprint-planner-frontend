import React from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartsReact from 'highcharts-react-official';
import getGanttChartFormatData from '../../Assets/dataMapper';
import { Header } from '../../Components';
import './GanttChart.css';
import { useContext } from 'react';

import { DataContext } from '../../Contexts/DataContext';
import exporting from 'highcharts/modules/exporting';

exporting(Highcharts);

Date.prototype.getWeek = function () {
  const firstDayOfYear = new Date(this.getFullYear(), 0, 1);
  const daysSinceFirstDay = Math.floor(
    (this.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );
  const actualWeekNumber =
    Math.floor((daysSinceFirstDay + firstDayOfYear.getDay() - 1) / 7) + 1;
  const weekNumber =
    actualWeekNumber - Math.floor((firstDayOfYear.getDay() + 6) / 7);
  return weekNumber;
};
function getWeekNum(startWeek, date) {
  const week = date.getWeek();
  return week - startWeek + 1;
}
const dateDuration = (sprintDuration, projectStartDate) => {
  const milliseconds = projectStartDate; // Convert Unix timestamp to milliseconds
  const twoWeeksMs = 7 * sprintDuration * 24 * 60 * 60 * 1000; // Calculate two weeks in milliseconds
  return milliseconds + twoWeeksMs; // Add two weeks and convert back to Unix timestamp
};

const GanttChart = () => {
  const { apiResponse, sprints, stories } = useContext(DataContext);
  console.log('response', apiResponse);
  const colors = ['#05445e', '#189ab4', '#75e6da', '#d4f1f4'];
  const storyColors = {};

  console.log('stories', stories);
  stories.map((story) => {
    storyColors[story.id] = colors[story.id % 4];
  });
  console.log('storyColors', storyColors);

  var plots = [];
  const startDate = new Date(apiResponse.projectStartDate).getTime();
  const endDate = dateDuration(
    apiResponse.sprintDuration * sprints.length,
    startDate,
  );
  const weekends = [];
  let startWeek = new Date(apiResponse.projectStartDate).getWeek();
  let sprintWeek = 1;
  // Output: 8

  // Loop through each day between the start and end timestamps
  for (let i = startDate; i <= endDate; i += 24 * 60 * 60 * 1000) {
    const date = new Date(i); // Convert Unix timestamp to JavaScript Date object
    const dayOfWeek = date.getUTCDay(); // Get day of the week (0=Sunday, 1=Monday, etc.)

    // If the day is a Saturday or Sunday, add it to the weekends array
    if (dayOfWeek === 0) {
      date.setUTCDate(date.getUTCDate() + 1);
      weekends.push(date);
    }
    if (dayOfWeek === 6) {
      date.setUTCDate(date.getUTCDate());
      weekends.push(date);
    }
  }

  // console.log(new Date(saturdays * 1000), new Dasundays());

  for (var i = 0; i < weekends.length; i += 2) {
    // var start = new Date(data.series[0].data[i].start);
    // var end = new Date(data.series[0].data[i].end);

    plots.push({
      color: '#f2f2f2',
      from: weekends[i], // Saturday
      to: weekends[i + 1],
      label: {
        text: null, // Set the plot band label to null to remove it
      },
      // Sunday
    });
  }

  const options = {
    plotOptions: {
      series: {
        tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          pointFormat:
            'Story Points: {point.storyPoints}<br>' +
            'Start: {point.start:%e %b %Y}<br>' +
            'End: {point.toolend:%e %b %Y}<br>' +
            'Duration: {point.duration} day(s)',
        },
      },
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadSVG', 'downloadJPEG'],
        },
      },
      sourceWidth: 4500,
      scale: 1,
      // chartOptions: {
      //   chart: {
      //     height: this.chartHeight,
      //   },
      // },
    },
    chart: {
      scrollablePlotArea: {
        minWidth: 800,

        scrollPositionX: 1,
        scrollbar: {
          enabled: true,
          height: 20,
        },
      },
      alignTicks: false,
      marginRight: 20,
    },

    yAxis: {
      type: 'category',
      labels: {
        style: {
          width: '900px',
          textOverflow: 'ellipsis',
        },
      },

      grid: {
        //background color for highcharts

        columns: [
          {
            title: {
              text: 'Stories',
              style: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: '15px',
              },

              rotation: 0,
            },
            labels: {
              format: '{point.name}',
              style: {
                color: '#000',
              },
            },
          },
          {
            title: {
              text: 'Owner',

              style: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: '15px',
              },
              rotation: 0,
            },

            labels: {
              format: '{point.developer}',
              useHTML: true,
              style: {
                color: '#000',
                width: '200px',
              },
            },
          },
        ],
      },
    },
    xAxis: [
      {
        labels: {
          format: '{value:%e, %a}',
        },
        tickInterval: 1000 * 60 * 60 * 24,
        plotBands: plots,
      },

      {
        type: 'datetime',
        labels: {
          formatter: function () {
            const date = new Date(this.value);
            const weekNumber = getWeekNum(startWeek, date);

            return `Week ${weekNumber}`;
          },
          style: {
            color: '#000',
          },
        },
        tickInterval: 1000 * 60 * 60 * 24 * 7,
      },
    ],
    title: {},
    colors: [],

    series: [],
  };

  return (
    <div className="gantt-chart-page">
      <Header />
      <div className="gantt-chart-wrapper">
        <div className="gantt-chart">
          {sprints.map((sprint, index) => {
            // eslint-disable-next-line react/jsx-key
            let data = getGanttChartFormatData(sprint, index, storyColors);
            delete options['colors'];

            delete options['series'];
            delete options['title'];
            let newOptions = {
              ...options,
              ...data,
              title: { text: `Sprint ${sprintWeek++}` },
            };
            return (
              // eslint-disable-next-line react/jsx-key
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={'ganttChart'}
                options={newOptions}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
