import React, { useContext, useState } from 'react';
import Graph from 'react-vis-network-graph';
import './DependencyGraph.css';
import { nanoid } from 'nanoid';
import { DataContext } from '../../Contexts/DataContext';
import { Header } from '../../Components';
import Switch from '@mui/material/Switch';

export default function DependencyGraph() {
  const { developers } = useContext(DataContext);
  const { stories } = useContext(DataContext);

  const [isZoomView, setIsZoomView] = useState(true);
  const [isDragView, setIsDragView] = useState(true);

  const handleZoomToggleClick = () => {
    setIsZoomView((previousValue) => !previousValue);
  };

  const handleDragToggleClick = () => {
    setIsDragView((previousValue) => !previousValue);
  };

  const findDeveloperById = (id) => {
    const developer = developers.filter(
      (developerData) => developerData.id === id,
    );
    return developer;
  };

  const getDeveloperName = (developerId) => {
    const developer = findDeveloperById(developerId);
    let developerName = 'None';
    if (developer.length) {
      developerName = developer[0].name;
    }
    return developerName;
  };

  const storyNode = stories.map((data) => {
    const developerName = getDeveloperName(data.preAssignedDeveloperId);
    const title =
      `<b>Title</b>: ${data.title}<br>` +
      `<b>Developers</b>: ${developerName}<br>` +
      `<b>Story Points</b>: ${data.storyPoints}<br>` +
      `<b>Dependencies</b>: ${data.dependencies}<br>`;

    return { id: data.id, label: String(data.id), title, size: 40 };
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
      // length: 200
      smooth: {
        type: 'discrete',
        forceDirection: 'none',
        roundness: 0,
      },
    },
    nodes: {
      font: {
        size: 24,
        color: '#000000',
      },
      size: 30,
      shape: 'dot',
    },
    height: '600px',
    physics: {
      // enabled: false,
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
                // style={{ width: "80%", height: "100%" }}
              />
            </div>
            <div className="legend-container-wrapper">
              <div className="legend-container">{renderStoryTitleWithId}</div>
            </div>
          </div>
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
  );
}
