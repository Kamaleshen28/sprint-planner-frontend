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
} from '../../Components';
import { Button } from '@mui/material';

const storiesData = [
  {
    id: 1,
    stories: 'Authentication',
    dependencies: [],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 2,
    stories: 'Frontend',
    dependencies: [1],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 3,
    stories: 'BackEnd',
    dependencies: [],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 4,
    stories: 'Database',
    dependencies: [2, 3],
    developer: [],
    storyPoints: 4,
  },
];
const developersData = [
  // { id: 1, developer: 'Harbir', sprintCapacity: 8, capacity: 14 },
  // { id: 2, developer: 'Smita', sprintCapacity: 8, capacity: 42 },
  // { id: 3, developer: 'Mukul', sprintCapacity: 8, capacity: 34 },
  // { id: 4, developer: 'Kamleshan', sprintCapacity: 8, capacity: 54 },
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
  const [title, setTitle] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [totalDuration, setTotalDuration] = React.useState();
  const [sprintDuration, setSprintDuration] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const getSprintCapacity = (developers) => {
    return developers[0].sprintCapacity;
  };

  const handleSubmit = () => {
    const newDate = defaultFormatToUnix(startDate);
    // console.log(
    //   'value',
    //   title,
    //   newDate,
    //   totalDuration,
    //   sprintDuration,
    //   storyList,
    //   developerList,
    //   // updateDevelopers(),
    // );
    const newProject = {
      title: title,
      duration: Number(totalDuration),
      sprintDuration: Number(sprintDuration),
      sprintCapacity: getSprintCapacity(developerList),
      projectStartDate: newDate,
      givenTotalDuration: totalDuration,
      stories: updateStories(storyList, developerList),
      developers: updateDevelopers(developerList),
    };
    console.log(data);
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
      <Header value={title} setValue={setTitle} heading="Sprint Planner" />
      <Title value={title} setValue={setTitle} />
      <div className="common-input-section">
        <StartDateInput value={startDate} setValue={setStartDate} />
        <TotalDurationInput value={totalDuration} setValue={setTotalDuration} />
        <SprintDurationInput
          value={sprintDuration}
          setValue={setSprintDuration}
        />
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
