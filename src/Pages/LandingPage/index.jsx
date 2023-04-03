import React from 'react';
import Box from '@mui/material/Box';
import { DataContext } from '../../Contexts/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from '@mui/material/Switch';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProjectCard, Header } from '../../Components';
import './LandingPage.css';
import { useOktaAuth } from '@okta/okta-react';
import InputLabel from '@mui/material/InputLabel';

export default function LandingPage() {
  const navigate = useNavigate();
  const { authState } = useOktaAuth();
  const [projects, setProjects] = React.useState([]);
  const [filterType, setFilterType] = React.useState('All');
  const { setProjectId, projectId } = React.useContext(DataContext);
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [onChange, setOnChange] = React.useState(false);
  const [query, setQuery] = React.useState('');
  React.useEffect(() => {
    axios
      .get('http://localhost:8080/api/projects', {
        headers: { authorization: authState?.accessToken.accessToken },
      })
      .then((res) => {
        setProjects(res.data.data);
        setFilteredProjects(res.data.data);
        setOnChange(!onChange);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    let results = projects.filter((project) =>
      project.title.toLowerCase().includes(query.toLowerCase()),
    );
    if (filterType !== '' && filterType !== 'All') {
      results = results.filter((project) => {
        return project.status === filterType;
      });
    }
    if (bookmarked) {
      results = results.filter((project) => {
        return project.isBookmarked === bookmarked;
      });
    }
    setFilteredProjects(results);
  }, [query, filterType, onChange, bookmarked, projects]);

  const handleBookmarkChange = async (id) => {
    const requiredProject = projects.find((project) => project.id === id);
    const updatedProject = {
      ...requiredProject,
      isBookmarked: !requiredProject.isBookmarked,
    };
    await axios.put(
      `http://localhost:8080/api/projects/${id}/bookmark`,
      {
        isBookmarked: !requiredProject.isBookmarked,
      },
      {
        headers: { authorization: authState?.accessToken.accessToken },
      },
    );
    const newProjects = projects.map((project) => {
      if (project.id === id) {
        return updatedProject;
      }
      return project;
    });
    setProjects(newProjects);
  };
  const handleClick = (id) => {
    setProjectId(id);
    localStorage.setItem('projectId', id);
    const selectedProject = filteredProjects.find(
      (project) => project.id === id,
    );
    if (selectedProject.status === 'planned') {
      navigate('/ganttChart');
      window.location.reload();
    } else {
      navigate('/edit');
    }
  };
  const handleChange = (event) => {
    setFilterType(
      event.target.value === 'draft' ? 'unsupportedInput' : event.target.value,
    );
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  const handleDeleteProject = async (projectId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/projects/${projectId}`,
        {
          headers: {
            authorization: authState?.accessToken.accessToken,
          },
        },
      );
      const newProjects = projects.filter(
        (project) => project.id !== projectId,
      );
      setProjects(newProjects);
      setFilteredProjects(newProjects);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Header />
      <div className="landing-page">
        <div className="landing-page-wrapper">
          <div className="landing-page-header">
            <div className="landing-page-header-top-section">
              <h1 className="landing-page-title">Projects</h1>
              <div className="search-box">
                <button className="btn-search">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ marginTop: '0px', fontSize: '20px' }}
                  />
                </button>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Search Project"
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <div className="landing-page-header-bottom-section">
              <div className="bookmark-switch">
                <b>BOOKMARKED</b>
                <Switch
                  checked={bookmarked === true}
                  value={bookmarked}
                  onChange={handleBookmark}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>

              <div className="filter-search">
                <FormControl
                  sx={{ width: 200, display: 'flex', height: '40px' }}
                  style={{ backgroundColor: 'white', borderRadius: '4px' }}
                >
                  <InputLabel
                    variant="standard"
                    htmlFor="uncontrolled-native"
                    style={{ marginTop: '-13px' }}
                    sx={{ ml: 2, height: '40px', mt: -1 }}
                  >
                    Select Status
                  </InputLabel>
                  <Select
                    value={
                      filterType === 'unsupportedInput' ? 'draft' : filterType
                    }
                    onChange={handleChange}
                    sx={{ height: '40px' }}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Select Status"
                  >
                    <MenuItem value={'All'}>All</MenuItem>
                    <MenuItem value={'planned'}>Planned</MenuItem>
                    <MenuItem value={'draft'}>Draft</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div>No Projects</div>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                width: '100%',
                bgcolor: 'white',
                height: '100%',
                pt: '30px',
                pb: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Box id="project-card-container">
                {filteredProjects.map((project) => (
                  <Box
                    key={project.id}
                    onClick={() => handleClick(project.id)}
                    sx={{
                      width: '30%',
                      minWidth: '350px',
                      height: '250px',
                    }}
                  >
                    <ProjectCard
                      project={project}
                      handleBookmarkChange={handleBookmarkChange}
                      handleDeleteProject={handleDeleteProject}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </div>
      </div>
    </>
  );
}
