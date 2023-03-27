import React, { useContext, useState } from 'react';
import './InputPage.css';
import defaultFormatToUnix from '../../utils/common/dateUtils';
import {
  updateDevelopers,
  updateStories,
} from '../../utils/common/mappingUtils';
import { DataContext } from '../../Contexts/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Title,
  InputForm,
  Header,
  StartDateInput,
  TotalDurationInput,
  SprintDurationInput,
  ErrorModal,
  ValidationModal,
} from '../../Components';
import { Button } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';

function InputPage() {
  const { authState } = useOktaAuth();
  const {
    setProjectId,
    setApiResponse,
    setSprints,
    setDevelopers,
    setStories,
  } = useContext(DataContext);
  const [storyList, setStoryList] = useState([]);
  const [developerList, setDeveloperList] = useState([]);
  const [title, setTitle] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [totalDuration, setTotalDuration] = React.useState(null);
  const [sprintDuration, setSprintDuration] = React.useState(null);
  const [open, setOpen] = React.useState({
    bool: false,
    err: null,
    success: false,
  });
  const handleOpen = (error, success) =>
    setOpen({ bool: true, err: error, success: success });
  const handleClose = () => {
    setOpen({ bool: false, err: null, success: false });
    navigate('/edit');
  };
  const [openValidationModal, setOpenValidationModal] = React.useState({
    bool: false,
    atLeastOneOptionalAvailable: false,
  });
  const handleOpenValidationModal = (atLeastOneOptionalAvailable) =>
    setOpenValidationModal({
      bool: true,
      atLeastOneOptionalAvailable: atLeastOneOptionalAvailable,
    });

  const navigate = useNavigate();

  // const getSprintCapacity = (developers) => {
  //   if (developers.length < 1) return sprintDuration * 4;
  //   return developers[0].sprintCapacity;
  // };

  const handleSubmit = () => {
    if (title && startDate && sprintDuration && storyList.length > 0) {
      const newDate = defaultFormatToUnix(startDate);
      const newProject = {
        title: title,
        duration: totalDuration ? Number(totalDuration) : 0,
        sprintDuration: Number(sprintDuration),
        // sprintCapacity: getSprintCapacity(developerList),
        sprintCapacity: Number(sprintDuration) * 5,
        projectStartDate: newDate,
        // givenTotalDuration: totalDuration ? Number(totalDuration) : null,
        stories: updateStories(storyList, developerList),
        // developers: updateDevelopers(developerList),
      };
      if (!totalDuration && !developerList.length > 0) {
        handleOpenValidationModal(false);
        return;
      }
      if (totalDuration) {
        // newProject.duration = Number(totalDuration);
        newProject.givenTotalDuration = Number(totalDuration);
        newProject.duration = Number(totalDuration);
      }
      if (developerList.length > 0) {
        newProject.developers = updateDevelopers(developerList);
      }
      let url = 'http://localhost:8080/api/projects';
      axios
        .post(url, newProject, {
          headers: {
            authorization: authState?.accessToken.accessToken,
          },
        })
        .then((res) => {
          if (res.data.data.developers) {
            setProjectId(res.data.data.id);
            setApiResponse(res.data.data);
            setSprints(res.data.data.sprints);
            setStories(res.data.data.stories);
            setDevelopers(res.data.data.developers);
            localStorage.setItem('projectId', res.data.data.id);
            navigate('/ganttChart');
          } else {
            localStorage.setItem('projectId', res.data.data.id);
            setProjectId(res.data.data.id);
            const customErrorMessage = {
              response: {
                data: {
                  message: `Need ${res.data.data.minimumNumberOfDevelopers} Developer(s) to complete the project.`,
                },
              },
            };
            handleOpen(customErrorMessage, true);
          }
        })
        .catch((err) => {
          localStorage.setItem('projectId', err.response.data.projectId);
          setProjectId(err.response.data.projectId);
          handleOpen(err, false);
        });
    } else {
      handleOpenValidationModal(true);
    }
  };
  return (
    <div className="home-page-wrapper">
      {open.bool && (
        <ErrorModal
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      )}
      {openValidationModal.bool && (
        <ValidationModal
          isOpen={openValidationModal}
          setIsOpen={setOpenValidationModal}
        />
      )}
      <Header value={title} setValue={setTitle} heading="Sprint Planner" />
      <div className="common-input-section">
        <div className="common-input-wrapper">
          <Title value={title} setValue={setTitle} />
          <div className="common-input-date">
            <StartDateInput value={startDate} setValue={setStartDate} />
            <SprintDurationInput
              value={sprintDuration}
              setValue={setSprintDuration}
            />
            <TotalDurationInput
              value={totalDuration}
              setValue={setTotalDuration}
            />
          </div>
        </div>
      </div>
      <InputForm
        storyList={storyList}
        setStoryList={setStoryList}
        developerList={developerList}
        setDeveloperList={setDeveloperList}
      />
      <Button
        sx={{ width: '10%', mx: 'auto', mb: '2rem' }}
        variant="contained"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}

export default InputPage;
