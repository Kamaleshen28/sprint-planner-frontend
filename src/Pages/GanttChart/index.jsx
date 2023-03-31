import GanttChartCompleteView from '../../Components/GanttChartCompleteView';
import GanttChartSprintView from '../../Components/GanttChartSprintView';
import { useState } from 'react';
import React from 'react';
import { Header } from '../../Components';
import {
  Switch,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../../Contexts/DataContext';
import './GanttChart.css';

const GanttChart = () => {
  const [ganttChartView, setGanttChartView] = useState(true);
  const [scrollSprint, setScrollSprint] = useState('sprint-0');
  const { apiResponse, sprints } = useContext(DataContext);

  const handleScroll = (e) => {
    const sprint = e.target.value;
    setScrollSprint(sprint);
    const element = document.getElementById(sprint);
    const container = document.getElementsByClassName('gantt-chart-wrapper')[0];
    const elementPosition = element.getBoundingClientRect().top;

    const startPosition = document
      .getElementById('sprint-0')
      .getBoundingClientRect();

    let offset = elementPosition - startPosition.top;

    if (offset < 0) {
      offset = elementPosition;
    }

    container.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header />
      <div className="gantt-chart-header">
        <div className="switch-gantt-chart" style={{ width: '10vw' }}>
          <Switch
            checked={ganttChartView}
            onChange={() => setGanttChartView(!ganttChartView)}
          />
          <label className="switch-label">Sprint View</label>
        </div>
        <div className="gantt-chart-title">
          <h1>{apiResponse.title}</h1>
        </div>
        <div>
          {ganttChartView ? (
            <Box>
              <FormControl sx={{ width: '10vw', mr: '3vw' }}>
                <InputLabel id="demo-simple-select-label">sprint</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={scrollSprint}
                  label="Age"
                  onChange={handleScroll}
                >
                  {sprints.map((sprint, index) => {
                    return (
                      <MenuItem key={index} value={`sprint-${index}`}>
                        Sprint {index + 1}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <div style={{ width: '13vw' }}></div>
          )}
        </div>
      </div>
      {ganttChartView && (
        <GanttChartSprintView
          ganttChartView={ganttChartView}
          setScrollSprint={setScrollSprint}
        />
      )}
      {!ganttChartView && <GanttChartCompleteView />}
    </>
  );
};

export default GanttChart;
