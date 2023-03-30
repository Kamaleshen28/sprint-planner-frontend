import React from 'react';
import StoryCard from '../StoryCard';
import Grid from '@mui/material/Grid';
import './CardView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function CardView(props) {
  const { content, developerIdMapping, heading } = props;

  function clickLeft() {
    let container = document.querySelector('.sprintViewBody');
    container.scrollTo({
      left: container.scrollLeft - window.innerWidth * 0.3,
      top: 0,
      behavior: 'smooth',
    });
  }

  function clickRight() {
    let container = document.querySelector('.sprintViewBody');
    container.scrollTo({
      left: container.scrollLeft + window.innerWidth * 0.3,
      top: 0,
      behavior: 'smooth',
    });
  }

  const handleScrollByDot = (event, index) => {
    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
      dot.className = 'dot';
    });
    event.target.className = 'dot active';
    let container = document.querySelector('.sprintViewBody');
    container.scrollTo({
      left: index * window.innerWidth * 0.3,
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
      dot.className = 'dot';
    });
    let container = document.querySelector('.sprintViewBody');
    let scrollLeft = container.scrollLeft;
    let sprintScroll = Math.round(scrollLeft / (window.innerWidth * 0.3));
    dots[sprintScroll].className = 'dot active';
  };
  const totalDots = Math.max(content.length - 2, 1);

  let html = [];
  for (let i = 0; i < totalDots; i++) {
    html.push(1);
  }

  const renderDots = html.map((dot, index) => {
    return (
      <span
        key={index}
        className="dot"
        onClick={(event) => handleScrollByDot(event, index)}
      ></span>
    );
  });
  React.useEffect(() => {
    let dots = document.querySelectorAll('.dot');
    dots[0].className = 'dot active';
  }, []);
  return (
    <div className="sprintView">
      {/* <div className="sprintViewHeader">
        <h1 className="sprintViewHeaderTitle">{heading}</h1>
      </div> */}

      <div className="sprintViewBody" onScroll={handleScroll}>
        <div
          tabIndex="1"
          className="scroll-button scroll-left"
          onClick={clickLeft}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div
          tabIndex="0"
          className="scroll-button scroll-right"
          onClick={clickRight}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>

        {content.map((sprint, index) => {
          return (
            sprint.length > 0 && (
              <div key={index} className="sprintBodyWithHeader">
                {heading === 'Sprints' ? (
                  <h1>{`Sprint ${index + 1}`}</h1>
                ) : (
                  <h1>{developerIdMapping[sprint[0].assignedDeveloperId]}</h1>
                )}
                <div className="sprintBody">
                  <Grid container spacing={2}>
                    {sprint.map((story, index) => {
                      return (
                        <Grid key={index} item xs={12} data-testid="stories">
                          <StoryCard
                            title={story.title}
                            id={story.id}
                            dependencies={story.dependencies}
                            startDay={story.startDay}
                            endDay={story.endDay}
                            developers={story.developers}
                            assignedDeveloperId={story.assignedDeveloperId}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </div>
            )
          );
        })}
      </div>
      <div className="sprintViewScrollDiv">
        {/* <button className="leftButton" onClick={clickLeft}>
          {'<'}
        </button> */}
        <div className="dots">{renderDots}</div>
        {/* <button className="rightButton" onClick={clickRight}>
          {'>'}
        </button> */}
      </div>
    </div>
  );
}
CardView.propTypes = {
  content: PropTypes.array,
  developerIdMapping: PropTypes.object,
  heading: PropTypes.string,
};
