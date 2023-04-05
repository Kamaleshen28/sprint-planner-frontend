import React, { useContext, useEffect, useState } from 'react';
import './InputPage.css';
import defaultFormatToUnix from '../../utils/common/dateUtils';
import {
  getDevelopers,
  getStories,
  updateDevelopers,
  updateStories,
} from '../../utils/common/mappingUtils';
import { DataContext } from '../../Contexts/DataContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Alert, Button, Slide, Chip } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useOktaAuth } from '@okta/okta-react';

function EditPage() {
  const { authState } = useOktaAuth();
  const {
    projectId,
    setProjectId,
    setApiResponse,
    setSprints,
    setDevelopers,
    setStories,
    setUpdateSidebar,
    updateSidebar,
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
  const handleClose = () => setOpen({ bool: false, err: null, success: false });
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

  const [openSnack, setOpenSnack] = React.useState(true);
  const [snackMessage, setSnackMessage] = React.useState('');
  const [openSnackEstimate, setOpenSnackEstimate] = React.useState(false);
  const [snackMessageEstimate, setSnackMessageEstimate] = React.useState('');
  const [projectStatus, setProjectStatus] = React.useState(undefined);
  const params = useParams();

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  const handleCloseSnack = (event, reason) => {
    setOpenSnack(false);
  };

  const handleCloseSnackEstimate = (event, reason) => {
    setOpenSnackEstimate(false);
  };

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
        stories: updateStories(storyList, developerList),
      };
      if (!totalDuration && !developerList.length > 0) {
        handleOpenValidationModal(false);
        return;
      }
      if (totalDuration) {
        // newProject.duration = Number(totalDuration);
        newProject.givenTotalDuration = Number(totalDuration);
      }
      if (developerList.length > 0) {
        newProject.developers = updateDevelopers(developerList);
      }
      let url = `http://localhost:8080/api/projects/${localStorage.getItem(
        'projectId',
      )}`;
      axios
        .put(url, newProject, {
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
            setSnackMessage(res.data.data.remarks);
            setProjectStatus(res.data.data.status);
            localStorage.setItem('projectId', res.data.data.id);
            navigate('/ganttChart');
          } else {
            localStorage.setItem('projectId', res.data.data.id);
            setProjectId(res.data.data.id);
            setUpdateSidebar(!updateSidebar);
            setSnackMessage(res.data.data.remarks);
            setProjectStatus(res.data.data.status);
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
          console.log(err);
          localStorage.setItem('projectId', err.response.data.projectId);
          setProjectId(err.response.data.projectId);
          setSnackMessage(err.response.data.message);
          setProjectStatus(err.response.data.status);
          setUpdateSidebar(!updateSidebar);
          handleOpen(err, false);
        });
    } else {
      handleOpenValidationModal(true);
    }
  };

  const handleEstimateDuration = async () => {
    if (
      title &&
      startDate &&
      sprintDuration &&
      storyList.length > 0 &&
      developerList.length > 0
    ) {
      const result = await axios.post(
        'http://localhost:8080/api/projects/calculateDuration',
        {
          title: title,
          sprintDuration: Number(sprintDuration),
          sprintCapacity: Number(sprintDuration) * 5,
          stories: updateStories(storyList, developerList),
          developers: updateDevelopers(developerList),
        },
        {
          headers: {
            authorization: authState?.accessToken.accessToken,
          },
        },
      );

      const value = result.data.data.estimatedDuration;
      // console.log(value);
      setSnackMessageEstimate(`Estimated Duration: ${value} week(s)`);
      setOpenSnackEstimate(true);
      setTotalDuration(value);
    }
  };

  useEffect(() => {
    setOpenSnack(true);
  }, [title, snackMessage]);
  useEffect(() => {
    const projectIdLocal = localStorage.getItem('projectId');

    if (projectId || (projectIdLocal && authState?.accessToken.accessToken)) {
      const id = projectId || projectIdLocal;
      let url = `http://localhost:8080/api/projects/${id}`;
      axios
        .get(url, {
          headers: {
            authorization: authState?.accessToken.accessToken,
          },
        })
        .then((res) => {
          if (params.auto === 'auto') {
            const developerRequired = res.data.data.remarks.split(' ')[2];
            const dummyDevelopers = [];
            for (let i = 0; i < developerRequired; i++) {
              dummyDevelopers.push({
                id: i,
                developer: `Developer ${i + 1}`,
                sprintCapacity: res.data.data.sprintDuration * 5,
                capacity: 100,
              });
            }
            setStoryList(getStories(res.data.data.stories));
            setDeveloperList(dummyDevelopers);

            setTitle(res.data.data.title);
            const date = new Date(res.data.data.projectStartDate);
            let formattedDate = date.toLocaleDateString();
            formattedDate = formattedDate.split('/').reverse().join('-');
            setStartDate(formattedDate);
            setSprintDuration(res.data.data.sprintDuration.toString());
            setTotalDuration(res.data.data.givenTotalDuration.toString());
            setSnackMessage(res.data.data.remarks);
            setProjectStatus(res.data.data.status);
          } else {
            setStoryList(getStories(res.data.data.stories));
            setDeveloperList(
              getDevelopers(
                res.data.data.developers,
                res.data.data.sprintCapacity,
              ),
            );
            setTitle(res.data.data.title);
            const date = new Date(res.data.data.projectStartDate);
            var formattedDate = date.toLocaleDateString();
            formattedDate = formattedDate.split('/').reverse().join('-');
            setStartDate(formattedDate);
            setSprintDuration(res.data.data.sprintDuration.toString());
            setTotalDuration(res.data.data.givenTotalDuration.toString());
            setSnackMessage(res.data.data.remarks);
            setProjectStatus(res.data.data.status);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [projectId, params]);

  if (title !== '') {
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
        {openValidationModal && (
          <ValidationModal
            isOpen={openValidationModal}
            setIsOpen={setOpenValidationModal}
          />
        )}

        {projectStatus === 'unsupportedInput' && params.auto !== 'auto' && (
          <Snackbar
            open={openSnack}
            autoHideDuration={10000}
            onClose={handleCloseSnack}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert variant="filled" severity="info" color="warning">
              {snackMessage}
            </Alert>
          </Snackbar>
        )}

        <Header value={title} setValue={setTitle} heading="Sprint Planner" />
        <div className="common-input-section">
          <div className="common-input-wrapper">
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative',
              }}
            >
              <Title value={title} setValue={setTitle} />
              <Chip
                style={{ width: 100, position: 'absolute', right: 0 }}
                color={projectStatus === 'planned' ? 'success' : 'info'}
                label={projectStatus === 'planned' ? 'planned' : 'draft'}
              />
            </div>

            <div className="common-input-date">
              <StartDateInput value={startDate} setValue={setStartDate} />
              <SprintDurationInput
                value={sprintDuration}
                setValue={setSprintDuration}
              />
              <div className="total-duration-estimate">
                <TotalDurationInput
                  value={totalDuration}
                  setValue={setTotalDuration}
                />
                <Button variant="contained" onClick={handleEstimateDuration}>
                  Estimate Duration
                </Button>
              </div>
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
        {openSnackEstimate && (
          <Snackbar
            open={openSnackEstimate}
            autoHideDuration={5000}
            onClose={handleCloseSnackEstimate}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert variant="filled" severity="info" color="warning">
              {snackMessageEstimate}
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default EditPage;
