import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function List({
  heading,
  contents,
  children,
  developerIdMapping,
}) {
  const style = {
    width: 400,
    bgcolor: 'white',
    // border: '2px solid lightgrey',
  };
  let theme = createTheme({
    typography: {
      fontSize: 9,
      fontWeightBold: 300,
    },
  });
  theme = responsiveFontSizes(theme);
  return (
    <Box width={2 / 3} sx={{ ...style, borderRadius: '5px', ml: 2 }}>
      <Box
        display="flex"
        sx={{
          bgcolor: 'black',
          color: 'white',
          width: '100%',
          borderRadius: '5px',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          height: '10%',
          minHeight: 50,
        }}
      >
        <Typography variant="h4" theme={theme} m="auto">
          {heading}
        </Typography>
      </Box>
      <div style={{ height: '85%', overflowY: 'scroll' }}>
        <Grid
          container
          spacing={2}
          padding={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {contents.map((content, index) => {
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

            return (
              <Grid key={index} item xs={12}>
                {React.cloneElement(children, { ...props })}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Box>
  );
}

List.propTypes = {
  heading: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  developerIdMapping: PropTypes.object,
};
