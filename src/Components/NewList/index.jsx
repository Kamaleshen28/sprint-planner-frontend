import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const NewList = ({ heading, contents, children, developerIdMapping }) => {
  return (
    <Box
      sx={{
        bgcolor: '#e4eef1',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'flex-start',
        gap: '2rem 1rem',
        alignItems: 'flex-start',
        height: '80vh',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
      {contents?.map((content, index) => {
        let props = {};
        if (heading === 'SPRINTS') {
          props = {
            content,
            index,
          };
        } else {
          props = {
            content,
            developerName: developerIdMapping[index],
          };
        }

        return <>{React.cloneElement(children, { ...props })}</>;
      })}
    </Box>
  );
};

export default NewList;
NewList.propTypes = {
  heading: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  developerIdMapping: PropTypes.object,
};
