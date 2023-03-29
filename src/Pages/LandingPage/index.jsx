import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { DataContext } from '../../Contexts/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from '@mui/material/Switch';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProjectCard, Header } from '../../Components';
import './LandingPage.css';
import { useOktaAuth } from '@okta/okta-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { authState } = useOktaAuth();
  const [projects, setProjects] = React.useState([]);
  const [filterType, setFilterType] = React.useState('All');
  const { setProjectId, projectId } = React.useContext(DataContext);
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [query, setQuery] = React.useState('');
  React.useEffect(() => {
    axios
      .get('http://localhost:8080/api/projects', {
        headers: { authorization: authState?.accessToken.accessToken },
      })
      .then((res) => {
        setProjects(res.data.data);
        setFilteredProjects(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // const handleSearch = () => {
  //   const results = projects.filter((project) =>
  //     project.title.toLowerCase().includes(query.toLowerCase()),
  //   );
  //   setFilteredProjects(results);
  // };
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
  }, [query, filterType, bookmarked]);

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
  return (
    <>
      <Header />
      <div className="landing-page">
        <div className="landing-page-header">
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
          <div className="bookmark-switch">
            Bookmarked
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
              style={{ backgroundColor: 'white', borderRadius: '10px' }}
            >
              <InputLabel
                variant="standard"
                htmlFor="uncontrolled-native"
                style={{ marginTop: '-13px' }}
                sx={{ ml: 2, height: '40px' }}
              >
                Select Status
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={filterType === 'unsupportedInput' ? 'draft' : filterType}
                label="Select Status"
                onChange={handleChange}
                sx={{ height: '40px' }}
              >
                <MenuItem value={'All'}>All</MenuItem>
                <MenuItem value={'planned'}>Planned</MenuItem>
                <MenuItem value={'draft'}>Draft</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div>No Projects</div>
        ) : (
          <Box sx={{ flexGrow: 1, width: '80%', margin: 'auto' }}>
            <Grid container rowSpacing={2} sx={{ mt: 2 }}>
              {filteredProjects.map((project) => (
                <Grid
                  key={project.id}
                  onClick={() => handleClick(project.id)}
                  xs={12}
                  md={4}
                  sx={{ mt: 2 }}
                >
                  <ProjectCard
                    project={project}
                    //onClick={() => handleClick(project.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>
    </>
  );
}
