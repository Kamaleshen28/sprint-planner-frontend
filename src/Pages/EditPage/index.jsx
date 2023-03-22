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

const storiesData = [
  // {
  //   id: 3,
  //   stories: 'Authentication',
  //   dependencies: [],
  //   developer: [],
  //   storyPoints: 4,
  // },
  // {
  //   id: 6,
  //   stories: 'Frontend',
  //   dependencies: [3],
  //   developer: [],
  //   storyPoints: 4,
  // },
  // {
  //   id: 7,
  //   stories: 'BackEnd',
  //   dependencies: [],
  //   developer: [3],
  //   storyPoints: 4,
  // },
  // {
  //   id: 9,
  //   stories: 'Database',
  //   dependencies: [6, 7],
  //   developer: [],
  //   storyPoints: 4,
  // },
];
const developersData = [
  // { id: 1, developer: 'Harbir', sprintCapacity: 8, capacity: 14 },
  // { id: 3, developer: 'Smita', sprintCapacity: 8, capacity: 42 },
  // { id: 7, developer: 'Mukul', sprintCapacity: 8, capacity: 34 },
  // { id: 9, developer: 'Kamleshan', sprintCapacity: 8, capacity: 54 },
];

function EditPage() {
  const {
    projectId,
    setProjectId,
    setApiResponse,
    setSprints,
    setDevelopers,
    setStories,
  } = useContext(DataContext);
  const [storyList, setStoryList] = useState(storiesData);
  const [developerList, setDeveloperList] = useState(developersData);
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

  const getSprintCapacity = (developers) => {
    if (developers.length < 1) return sprintDuration * 4;
    return developers[0].sprintCapacity;
  };

  const handleSubmit = () => {
    if (title && startDate && sprintDuration && storyList.length > 0) {
      const newDate = defaultFormatToUnix(startDate);
      const newProject = {
        title: title,
        duration: totalDuration ? Number(totalDuration) : 0,
        sprintDuration: Number(sprintDuration),
        sprintCapacity: getSprintCapacity(developerList),
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
      console.log('asdfad', newProject);
      let url = `http://localhost:8080/api/projects/${localStorage.getItem(
        'projectId',
      )}`;
      axios
        .put(url, newProject, {
          headers: { authorization: localStorage.getItem('accessToken') },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.data);
          if (res.data.data.developers) {
            setProjectId(res.data.data.id);
            setApiResponse(res.data.data);
            setSprints(res.data.data.sprints);
            setStories(res.data.data.stories);
            setDevelopers(res.data.data.developers);

            localStorage.setItem('projectId', res.data.data.id);
            navigate('/');
          } else {
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
          handleOpen(err, false);
        });
    } else {
      handleOpenValidationModal(true);
    }
  };

  useEffect(() => {
    const projectIdLocal = localStorage.getItem('projectId');
    if (!localStorage.getItem('accessToken')) {
      // navigate('/login');
    } else {
      if (projectId || projectIdLocal) {
        const id = projectId || projectIdLocal;
        let url = `http://localhost:8080/api/projects/${id}`;
        axios
          .get(url, {
            headers: { authorization: localStorage.getItem('accessToken') },
          })
          .then((res) => {
            console.log(res.data.data);
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
            setSprintDuration(res.data.data.sprintDuration);
            setTotalDuration(res.data.data.givenTotalDuration);
          });
      } else {
        navigate('/create');
      }
    }
  }, []);

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
        Edit
      </Button>
    </div>
  );
}

export default EditPage;
