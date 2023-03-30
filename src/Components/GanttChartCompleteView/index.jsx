import React from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartsReact from 'highcharts-react-official';
import getGanttChartFormatDataCompleteView from '../../Assets/dataMapperCompleteView';
import { Header } from '../../Components';
import './GanttChartCompleteView.css';

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

const GanttChartCompleteView = () => {
  const data = getGanttChartFormatDataCompleteView();
  var plots = [];
  const startDate = data.sprintDuration[0];
  const endDate = data.sprintDuration[1];
  const weekends = [];
  const startWeek = new Date(startDate).getWeek();

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
      sourceWidth: 1502,
      scale: 1,
      // chartOptions: {
      //   chart: {
      //     height: this.chartHeight,
      //   },
      // },
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
        label: {
          format: '{value:%e}',
        },
        tickInterval: 1000 * 60 * 60 * 24,
        plotBands: plots,
      },

      {
        type: 'datetime',
        labels: {
          // format: '{value:Week %W-12}',
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
        // week
      },
    ],

    ...data,
  };
  // const options = {
  //   plotOptions: {
  //     series: {
  //       tooltip: {
  //         headerFormat: '<b>{point.key}</b><br>',
  //         pointFormat:
  //           'Story Points: {point.storyPoints}<br>' +
  //           'Start: {point.start:%e %b %Y}<br>' +
  //           'End: {point.toolend:%e %b %Y}<br>' +
  //           'Duration: {point.duration} day(s)',
  //       },
  //     },
  //   },

  //   yAxis: {
  //     type: 'category',
  //     labels: {
  //       style: {
  //         width: '900px',
  //         textOverflow: 'ellipsis',
  //       },
  //     },

  //     grid: {
  //       //background color for highcharts

  //       columns: [
  //         {
  //           title: {
  //             text: 'Stories',
  //             style: {
  //               color: '#000',
  //               fontWeight: 'bold',
  //               fontSize: '15px',
  //             },

  //             rotation: 0,
  //           },
  //           labels: {
  //             format: '{point.name}',
  //             style: {
  //               color: '#000',
  //             },
  //           },
  //         },
  //         {
  //           title: {
  //             text: 'Owner',

  //             style: {
  //               color: '#000',
  //               fontWeight: 'bold',
  //               fontSize: '15px',
  //             },
  //             rotation: 0,
  //           },

  //           labels: {
  //             format: '{point.developer}',
  //             useHTML: true,
  //             style: {
  //               color: '#000',
  //               width: '200px',
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   xAxis: [
  //     {
  //       type: 'datetime',
  //       label: {
  //         overflow: 'justify',
  //         format: '{value:%e %b}',
  //       },
  //       tickInterval: 1000 * 60 * 60 * 24,
  //       plotBands: plots,
  //     },

  //     {
  //       type: 'datetime',
  //       labels: {
  //         // format: '{value:Week %W-12}',
  //         formatter: function () {
  //           const date = new Date(this.value);
  //           const weekNumber = getWeekNum(startWeek, date);

  //           return `Week ${weekNumber}`;
  //         },
  //         style: {
  //           color: '#000',
  //         },
  //       },
  //       tickInterval: 1000 * 60 * 60 * 24 * 7,
  //       // week
  //     },
  //   ],

  //   ...data,
  // };
  // const [chartOptions, setChartOptions] = useState(true);
  // const exportChart = () => {
  //   console.log('chartOptions', chartOptions);
  //   delete chartOptions.chart;
  //   setChartOptions(false);
  //   console.log('delete chart ', chartOptions);
  //   // exportComponentAsJPEG(componentRef);
  // };
  // window.location.reload();
  return (
    <div className="gantt-chart-page">
      {/* <Header /> */}
      <div className="gantt-chart-wrapper">
        <div className="gantt-chart">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'ganttChart'}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default GanttChartCompleteView;
