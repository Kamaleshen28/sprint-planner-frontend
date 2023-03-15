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

const data = {
  title: 'temp data',
  duration: 15,
  sprintDuration: 2,
  sprintCapacity: 8,
  stories: [
    {
      id: 0,
      title: 'test story',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [],
      storyPoints: 3,
      preAssignedDeveloperId: 0,
    },
    {
      id: 1,
      title: 'Kuchh naya likh copilot',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [3, 4],
      storyPoints: 4,
      preAssignedDeveloperId: 2,
    },
    {
      id: 2,
      title: 'As be able to create a sprint',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [],
      storyPoints: 5,
    },
    {
      id: 3,
      title: 'As a user I want to be able to e a sprint',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [0, 2],
      storyPoints: 1,
    },
    {
      id: 4,
      title: ' user I want to be able to create a sprint',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [0],
      storyPoints: 2,
    },
    {
      id: 5,
      title: 'a user I want to be able to create a sprint',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [6],
      storyPoints: 10,
    },
    {
      id: 6,
      title: 'As a user I want to be able to create a ',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [0, 3, 7],
      storyPoints: 12,
    },
    {
      id: 7,
      title: ' sprint',
      description:
        'A sprint is a period of time during which a set of stories are worked on',
      dependencies: [2, 3],
      storyPoints: 8,
    },
  ],
  developers: [
    {
      id: 0,
      name: 'test1',
      capacity: 100,
    },
    {
      id: 1,
      name: 'test2',
      capacity: 100,
    },
    {
      id: 2,
      name: 'test3',
      capacity: 120,
    },
  ],
};
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
    developer: [2],
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
  { id: 1, developer: 'Harbir', sprintCapacity: 8, capacity: 14 },
  { id: 2, developer: 'Smita', sprintCapacity: 8, capacity: 42 },
  { id: 3, developer: 'Mukul', sprintCapacity: 8, capacity: 34 },
  { id: 4, developer: 'Kamleshan', sprintCapacity: 8, capacity: 54 },
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
      <ErrorModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
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
