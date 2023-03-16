import React, { useContext, useState } from 'react';
import './InputPage.css';
import defaultFormatToUnix from '../../utils/common/dateUtils';
import { ValidatorForm } from 'react-material-ui-form-validator';
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

const storiesData = [
  {
    id: 3,
    stories: 'Authentication',
    dependencies: [],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 6,
    stories: 'Frontend',
    dependencies: [3],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 7,
    stories: 'BackEnd',
    dependencies: [],
    developer: [3],
    storyPoints: 4,
  },
  {
    id: 9,
    stories: 'Database',
    dependencies: [6, 7],
    developer: [],
    storyPoints: 4,
  },
];
const developersData = [
  { id: 1, developer: 'Harbir', sprintCapacity: 8, capacity: 14 },
  { id: 3, developer: 'Smita', sprintCapacity: 8, capacity: 42 },
  { id: 7, developer: 'Mukul', sprintCapacity: 8, capacity: 34 },
  { id: 9, developer: 'Kamleshan', sprintCapacity: 8, capacity: 54 },
];

function InputPage() {
  const {
    setProjectId,
    setApiResponse,
    setSprints,
    setDevelopers,
    setStories,
  } = useContext(DataContext);
  const [storyList, setStoryList] = useState(storiesData);
  const [developerList, setDeveloperList] = useState(developersData);
  const [title, setTitle] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [totalDuration, setTotalDuration] = React.useState(null);
  const [sprintDuration, setSprintDuration] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openValidationModal, setOpenValidationModal] = React.useState(false);
  const handleOpenValidationModal = () => setOpenValidationModal(true);

  const navigate = useNavigate();

  const getSprintCapacity = (developers) => {
    return developers[0].sprintCapacity;
  };

  const handleSubmit = () => {
    if (title && startDate && sprintDuration && storyList.length > 0) {
      const newDate = defaultFormatToUnix(startDate);
      const newProject = {
        title: title,
        duration: totalDuration ? Number(totalDuration) : null,
        sprintDuration: Number(sprintDuration),
        sprintCapacity: getSprintCapacity(developerList),
        projectStartDate: newDate,
        givenTotalDuration: totalDuration ? Number(totalDuration) : null,
        stories: updateStories(storyList, developerList),
        developers: updateDevelopers(developerList),
      };
      console.log(newProject);
      let url = 'http://localhost:8080/api/projects';
      axios
        .post(url, newProject)
        .then((res) => {
          console.log(res.data);
          setProjectId(res.data.data.id);
          setApiResponse(res.data.data);
          setSprints(res.data.data.sprints);
          setStories(res.data.data.stories);
          setDevelopers(res.data.data.developers);
          localStorage.setItem('projectId', res.data.data.id);
          navigate('/');
        })
        .catch((err) => {
          handleOpen();
        });
    } else {
      handleOpenValidationModal();
    }
  };
  return (
    <>
      {/* <TopBar /> */}
      {open && (
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
      <Title value={title} setValue={setTitle} />
      <div className="common-input-section">
        <StartDateInput value={startDate} setValue={setStartDate} />
        <SprintDurationInput
          value={sprintDuration}
          setValue={setSprintDuration}
        />
        <TotalDurationInput value={totalDuration} setValue={setTotalDuration} />
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
    </>
  );
}

export default InputPage;
