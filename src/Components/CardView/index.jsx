/* eslint-disable react/prop-types */
import React from 'react';
import StoryCard from '../StoryCard';
import Grid from '@mui/material/Grid';
import './CardView.css';

export default function CardView(props) {
  const { content, developerIdMapping, heading } = props;

  return (
    <div className="sprintView">
      <div className="sprintViewHeader">
        <h1 className="sprintViewHeaderTitle">{heading}</h1>
      </div>
      <div className="sprintViewBody">
        {content.map((sprint, index) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
}
