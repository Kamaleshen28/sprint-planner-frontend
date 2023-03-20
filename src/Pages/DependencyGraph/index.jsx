import React, { useContext, useState } from 'react';
import Graph from 'react-vis-network-graph';
import './DependencyGraph.css';
import { nanoid } from 'nanoid';
import { DataContext } from '../../Contexts/DataContext';
import { Header } from '../../Components';
import Switch from '@mui/material/Switch';

export default function DependencyGraph() {
  const { stories } = useContext(DataContext);
  const { sprints } = useContext(DataContext);

  const [isZoomView, setIsZoomView] = useState(true);
  const [isDragView, setIsDragView] = useState(true);

  const getEachSprintDeveloperStoryList = (sprintData) => {
    return sprintData.reduce((result, storyData) => {
      result[storyData.id] = storyData.developers[0].name;
      return result;
    }, {});
  };

  const developerStoryList = sprints.reduce((result, sprintData) => {
    const developerList = getEachSprintDeveloperStoryList(sprintData);
    return { ...result, ...developerList };
  }, {});

  const handleZoomToggleClick = () => {
    setIsZoomView((previousValue) => !previousValue);
  };

  const handleDragToggleClick = () => {
    setIsDragView((previousValue) => !previousValue);
  };

  const getEachStoryNodeTitle = (storyData) => {
    const developerName = developerStoryList[storyData.id];

    return (
      `<b>Title</b>: ${storyData.title}<br>` +
      `<b>Developers</b>: ${developerName}<br>` +
      `<b>Story Points</b>: ${storyData.storyPoints}<br>` +
      `<b>Dependencies</b>: ${storyData.dependencies}<br>`
    );
  };

  const storyNode = stories.map((storyData) => {
    const title = getEachStoryNodeTitle(storyData);
    return {
      id: storyData.id,
      label: `     ${String(storyData.id)}     `,
      title,
      font: { size: 17 },
      shape: 'circle',
    };
  });

  const dependencies = stories.reduce((result, eachStory) => {
    if (eachStory.dependencies.length) {
      const test = eachStory.dependencies.reduce((acc, element) => {
        return [...acc, { from: element, to: eachStory.id }];
      }, []);
      return [...result, ...test];
    }
    return result;
  }, []);

  const renderStoryTitleWithId = stories.map((data) => {
    return (
      <span key={data.id} className="legend">
        <b className="story-id">{data.id}</b> {data.title}
        <br></br>
      </span>
    );
  });

  const graph = {
    nodes: storyNode,
    edges: dependencies,
  };

  const options = {
    edges: {
      color: 'red',
      width: 3,
      smooth: {
        type: 'discrete',
        forceDirection: 'none',
        roundness: 0,
      },
    },
    nodes: {
      font: {
        color: '#000000',
      },
    },
    height: '550px',
    physics: {
      stabilization: false,
      barnesHut: {
        springConstant: 0,
        avoidOverlap: 0.2,
      },
    },
    interaction: {
      hover: true,
      zoomView: isZoomView,
      dragNodes: isDragView,
      dragView: isDragView,
    },
  };

  return (
    <div className="dependency-graph">
      <Header />
      <div className="wrapper">
        <div className="dependency-graph-wrapper">
          <div className="graph-legend-container">
            <div className="graph-container">
              <Graph
                key={nanoid()}
                graph={graph}
                options={options}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="legend-container-wrapper">
              <div className="legend-container">{renderStoryTitleWithId}</div>
              <div className="button-container">
                <div className="zoom-button-wrapper">
                  <div className="span">Zoomview</div>
                  <Switch
                    checked={isZoomView}
                    onChange={handleZoomToggleClick}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
                <div className="zoom-button-wrapper">
                  <div className="span">Dragview</div>
                  <Switch
                    checked={isDragView}
                    onChange={handleDragToggleClick}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
