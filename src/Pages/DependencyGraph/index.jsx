import React, { useContext } from 'react';
import Graph from 'react-vis-network-graph';
import './DependencyGraph.css';
import { nanoid } from 'nanoid';
import { DataContext } from '../../Contexts/DataContext';

export default function DependencyGraph() {
  const { developers } = useContext(DataContext);
  const { stories } = useContext(DataContext);

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
      `<b>Dependencies</b>: ${data.dependencies}<br>` +
      `<b>Description</b>: ${data.description}`;

    return { id: data.id, label: String(data.id), title, size: 40 };
  });

  const dependencies = stories.reduce((result, eachStory) => {
    if (eachStory.dependencies.length) {
      const test = eachStory.dependencies.reduce((acc, element) => {
        return [...acc, { from: eachStory.id, to: element }];
      }, []);
      return [...result, ...test];
    }
    return result;
  }, []);

  const graph = {
    nodes: storyNode,
    edges: dependencies,
  };

  const options = {
    edges: {
      color: 'red',
      width: 3,
      // length: 200
    },
    nodes: {
      font: {
        size: 24,
        color: '#000000',
      },
      size: 30,
      shape: 'dot',
    },
    height: '500px',
    physics: {
      enabled: false,
      stabilization: false,
    },
    interaction: {
      hover: true,
      zoomView: true,
      dragNodes: true,
      dragView: true,
    },
  };

  return (
    <div className="dependency-graph">
      <div className="wrapper">
        <div className="dependency-graph-wrapper">
          <Graph
            key={nanoid()}
            graph={graph}
            options={options}
            // style={{ width: "80%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}
