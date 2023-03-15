import React from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartsReact from 'highcharts-react-official';
import getGanttChartFormatData from '../../Assets/dataMapper';

const GanttChart = () => {
  const data = getGanttChartFormatData();
  var plots = [];
  const startDate = data.sprintDuration[0];
  const endDate = data.sprintDuration[1];
  const weekends = [];

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
            'End: {point.end:%e %b %Y}<br>' +
            'Duration: {point.duration} day(s)',
        },
      },
    },
    chart: {
      scrollablePlotArea: {
        minWidth: 2000,

        scrollPositionX: 1,
        scrollbar: {
          enabled: true,
          height: 20,
        },
      },
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
              y: -15,
              x: -15,
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
              y: -13,
              x: -1,
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
      // {
      //   type: 'datetime',
      //   tickPositioner: function () {
      //     var ticks = [],
      //       tick = this.dataMin;

      //     // Loop through each day from dataMin to dataMax
      //     for (tick; tick <= this.dataMax; tick += 24 * 3600 * 1000) {
      //       // Check if the day is not a weekend (Saturday or Sunday)
      //       // var day = new Date(tick).getUTCDay();
      //       // if (day == 0) {
      //       //   ticks.push(tick + 7);
      //       //   continue;
      //       // }
      //       ticks.push(tick);
      //     }

      //     return ticks;
      //   },
      //   tickInterval: 1000 * 60 * 60 * 24, // day
      //   labels: {
      //     format: '{value: %a, %e. %b}',
      //     style: {
      //       color: '#000',
      //     }, // Day label format
      //   },
      // },
      {
        breaks: [
          {
            from: Date.UTC(2021, 0, 9),
            to: Date.UTC(2021, 0, 11),
            breakSize: 0,
          },
          {
            from: Date.UTC(2021, 0, 16),
            to: Date.UTC(2021, 0, 18),
            breakSize: 0,
          },
        ],
      },

      {
        type: 'datetime',
        labels: {
          format: '{value:Week %W}',
          style: {
            color: '#000',
          },
        },
        tickInterval: 1000 * 60 * 60 * 24 * 7, // week
      },
    ],

    ...data,
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'ganttChart'}
        options={options}
      />
    </div>
  );
};

export default GanttChart;
