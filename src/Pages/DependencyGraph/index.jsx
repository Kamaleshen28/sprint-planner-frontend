import React, { useContext, useEffect, useState } from 'react';
import Graph from 'react-vis-network-graph';
import { DataContext } from '../../Contexts/DataContext';
import { Header } from '../../Components';
import Switch from '@mui/material/Switch';
import './DependencyGraph.css';

const DependencyGraph = () => {
  const { stories } = useContext(DataContext);
  const { sprints } = useContext(DataContext);

  const [isZoomView, setIsZoomView] = useState(true);
  const [isDragView, setIsDragView] = useState(true);

  const [storyNode, setStoryNode] = useState([]);
  const [dependencies, setDependencies] = useState([]);

  const [graph, setGraph] = useState(null);
  // const [hoveredNode, setHoveredNode] = useState(null);
  const [graphData, setGraphData] = useState({
    nodes: storyNode,
    edges: dependencies,
  });

  useEffect(() => {
    setDependencies(edgeValues);
    setStoryNode(nodeValues);
  }, [sprints]);
  useEffect(() => {
    setGraphData({ nodes: storyNode, edges: dependencies });
  }, [storyNode, dependencies]);

  const handleZoomToggleClick = () => {
    setIsZoomView((previousValue) => !previousValue);
  };

  const handleDragToggleClick = () => {
    setIsDragView((previousValue) => !previousValue);
  };

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

  const getEachStoryNodeTitle = (storyData) => {
    const developerName = developerStoryList[storyData.id];
    return (
      `<b>Title</b>: ${storyData.title}<br>` +
      `<b>Developers</b>: ${developerName}<br>` +
      `<b>Story points</b>: ${storyData.storyPoints}<br>` +
      `<b>Dependencies (id)</b>: ${
        storyData.dependencies.length ? storyData.dependencies : 'NA'
      }<br>`
    );
  };

  const nodeValues = stories.map((storyData) => {
    const title = getEachStoryNodeTitle(storyData);
    return {
      id: storyData.id,
      label: `    ${String(storyData.id + 1)}    `,
      title,
      font: { size: 20 },
      shape: 'circle',
    };
  });

  const edgeValues = stories.reduce((result, eachStory) => {
    if (eachStory.dependencies.length) {
      const test = eachStory.dependencies.reduce((acc, element) => {
        return [...acc, { from: element, to: eachStory.id, color: 'black' }];
      }, []);
      return [...result, ...test];
    }
    return result;
  }, []);

  const renderStoryTitleWithId = stories.map((data) => {
    return (
      <span key={data.id} className="legend">
        <b className="story-id">{data.id + 1}</b> {data.title}
        <br></br>
      </span>
    );
  });

  const getUpdatedEdgesOnHover = (edges, nodeId) => {
    const connectedEdges = graph.getConnectedEdges(nodeId.node);

    return edges.map((edge) => {
      if (connectedEdges.includes(edge.id) && nodeId.node === edge.to) {
        return { ...edge, color: '#353232', hoverWidth: 1 };
      } else {
        return { ...edge, hoverWidth: 1, color: '#EEEBEB' };
      }
    });
  };

  const getUpdatedNodesOnHover = (nodes, nodeId) => {
    return nodes.map((node) => {
      if (node.id === nodeId.node) {
        return {
          ...node,
          opacity: 1,
          color: {
            background: '#1B0508',
            border: '#1B0508',
            highlight: { background: '#1B0508', border: '#1B0508' },
            hover: { background: '#1B0508', border: '#1B0508' },
          },
        };
      } else {
        return {
          ...node,
          opacity: 0.3,
          font: { size: 20, color: 'black' },
        };
      }
    });
  };

  const handleNodeHover = (nodeId) => {
    const { nodes, edges } = graphData;
    const updatedEdges = getUpdatedEdgesOnHover(edges, nodeId);
    const updatedNodes = getUpdatedNodesOnHover(nodes, nodeId);
    setGraphData({
      ...graphData,
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  };

  const getUpdatedEdgesOnBlur = (edges) => {
    return edges.map((edge) => ({ ...edge, color: 'black' }));
  };

  const getUpdatedNodesOnBlur = (nodes) => {
    return nodes.map((node) => {
      return {
        ...node,
        opacity: 1,
        color: {
          background: '#4E4243',
          border: '#4E4243',
        },
        font: { size: 20, color: '#fff' },
      };
    });
  };

  const handleNodeBlur = () => {
    const { nodes, edges } = graphData;
    const updatedNodes = getUpdatedNodesOnBlur(nodes);
    const updatedEdges = getUpdatedEdgesOnBlur(edges);
    setGraphData({
      ...graphData,
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  };

  const options = {
    nodes: {
      shape: 'circle',
      size: 25,
      font: { size: 16, color: '#fff' },
      borderWidth: 3,
      color: {
        background: '#4E4243',
        border: '#4E4243',
        highlight: { background: '#707196', border: '#1B0508' },
        hover: { background: '#707196', border: '#1B0508' },
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
    edges: {
      color: 'red',
      hoverWidth: 3,
      width: 1,
      smooth: {
        type: 'discrete',
        forceDirection: 'none',
        roundness: 0,
      },
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
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
                graph={graphData}
                options={options}
                style={{ width: '100%', height: '100%' }}
                events={{
                  hoverNode: handleNodeHover,
                  blurNode: handleNodeBlur,
                }}
                getNetwork={setGraph}
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
};

export default DependencyGraph;
