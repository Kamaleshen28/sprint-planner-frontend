import { Box, Fab, Tooltip } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeveloperEntry from '../DeveloperEntry';
import './DeveloperInput.css';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        width: 200,
        // height: '40px',
        // bgcolor: (theme) =>
        //   theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        // border: '1px solid',
        // borderColor: (theme) =>
        //   theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 0,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function DeveloperInput({
  developerList,
  setDeveloperList,
  deleteCheck,
}) {
  const [id, setId] = useState(
    developerList.length > 0
      ? developerList[developerList.length - 1].id + 1
      : 1,
  );
  const [developer, setDeveloper] = useState('');
  const [sprintCapacity, setSprintCapacity] = useState(undefined);
  const [capacity, setCapacity] = useState(undefined);

  const removeItem = (id) => {
    let newDeveloperList = developerList.filter(
      (developer) => developer.id !== id,
    );
    setDeveloperList(newDeveloperList);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id && developer && capacity && sprintCapacity) {
      const newDeveloper = { id, developer, sprintCapacity, capacity };
      setDeveloperList((developerList) => {
        return [...developerList, newDeveloper];
      });
      setId(id + 1);
      setDeveloper('');
    }
  };
  //   console.log(developerList.length);
  return (
    <>
      <div className="dev-container">
        <Box mx="auto" sx={{ ml: 1, mr: 1 }}>
          <div>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 2fr repeat(3, 1fr)',
                p: 1,
                // ml: 6,
                // m: 1,
                // justifyContent: 'space-between',
                // textAlign: 'center',
                // bgcolor: 'background.white',
                // borderRadius: 1,
                // gap: '0 1rem',
              }}
            >
              <Item
                sx={{
                  width: '80%',
                  mx: 'auto',
                  borderRadius: '2px',
                  padding: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                SERIAL NO.
              </Item>
              <Item
                sx={{
                  width: '80%',
                  mx: 'auto',
                  borderRadius: '2px',
                  padding: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                DEVELOPERS
              </Item>
              <Item
                sx={{
                  width: '80%',
                  mx: 'auto',
                  borderRadius: '2px',
                  padding: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                SPRINT CAPACITY(DAYS)
              </Item>
              <Item
                sx={{
                  width: '80%',
                  mx: 'auto',
                  borderRadius: '2px',
                  padding: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                CAPACITY(DAYS)
              </Item>
            </Box>
            <div className="dev-list">
              {developerList.length === 0 ? (
                <p data-testid="developerlength" style={{ fontSize: '1.3rem' }}>
                  No Developers
                </p>
              ) : (
                developerList.map((developerInfo, index) => {
                  return (
                    <DeveloperEntry
                      key={developerInfo.id}
                      index={index}
                      developerInfo={developerInfo}
                      removeItem={removeItem}
                      deleteCheck={deleteCheck}
                      developerList={developerList}
                      setDeveloperList={setDeveloperList}
                    />
                  );
                })
              )}
            </div>
          </div>
          <ValidatorForm
            className="developer-container-form"
            onSubmit={handleSubmit}
          >
            <Box
              sx={{
                // display: 'flex',
                // flexDirection: 'row',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 2fr repeat(3, 1fr)',
                // bgcolor: 'white',

                // ml: 6,
                p: 1,
                // p: '0 2',
                // m: '0 4',
                // justifyContent: 'space-around',
                // bgcolor: '#28709e',
                // borderRadius: '0 0 20px 20px',
                // height: '100px',
                // boxShadow: 1,
                // height: '50px',
                alignItems: 'center',
                // height: '100%',
              }}
            >
              <div></div>
              <Item sx={{ width: '95%', mx: 'auto', p: 0 }}>
                <TextValidator
                  style={{ width: '100%' }}
                  placeholder="Enter Developer Name"
                  type="text"
                  name="developer"
                  value={developer}
                  validators={['required', 'matchRegexp:^[a-zA-Z ]*$']}
                  errorMessages={['this field is required', 'Not a valid name']}
                  onChange={(e) => setDeveloper(e.target.value)}
                />
              </Item>
              <Item sx={{ width: '95%', mx: 'auto', p: 0 }}>
                <TextValidator
                  style={{ width: '100%' }}
                  placeholder="Enter Sprint Capacity"
                  type="number"
                  name="sprintCapacity"
                  value={sprintCapacity}
                  validators={['required', 'isNumber', 'minNumber:0']}
                  errorMessages={[
                    'this field is required',
                    'Not a number',
                    'Should be positive',
                  ]}
                  onChange={(e) => setSprintCapacity(e.target.value)}
                />
              </Item>
              <Item sx={{ width: '95%', mx: 'auto', p: 0 }}>
                <TextValidator
                  style={{ width: '100%' }}
                  placeholder="Enter Capacity"
                  type="number"
                  name="capacity"
                  value={capacity}
                  validators={['required', 'isNumber', 'minNumber:0']}
                  errorMessages={[
                    'this field is required',
                    'Not a number',
                    'Should be positive',
                  ]}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </Item>
              <Tooltip
                sx={{ mx: 'auto' }}
                title="Add Developer"
                aria-label="add"
              >
                <Fab color="primary" type="submit" aria-label="add">
                  +
                </Fab>
              </Tooltip>
            </Box>
          </ValidatorForm>
          {/* </form> */}
        </Box>
      </div>
    </>
  );
}

DeveloperInput.propTypes = {
  developerList: PropTypes.array,
  setDeveloperList: PropTypes.func,
  deleteCheck: PropTypes.func,
};
