import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { DataContext } from '../../Contexts/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProjectCard, Header } from '../../Components';
import './LandingPage.css';
import { useOktaAuth } from '@okta/okta-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { authState } = useOktaAuth();
  const [projects, setProjects] = React.useState([]);
  const [filterType, setFilterType] = React.useState('');
  const { setProjectId, projectId } = React.useContext(DataContext);
  const handleFilterType = (currentfilter) => {
    setFilterType(currentfilter);
  };
  const [open, setOpen] = React.useState(false);
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  const [query, setQuery] = React.useState('');
  const handleToggle = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    axios
      .get('http://localhost:8080/api/projects', {
        headers: { authorization: authState?.accessToken.accessToken },
      })
      .then((res) => {
        setProjects(res.data.data);
        setFilteredProjects(res.data.data);
        console.log(res);
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
      project.title.toLowerCase().includes(query),
    );
    if (filterType !== '') {
      results = results.filter((project) => {
        return project.status === filterType;
      });
    }
    setFilteredProjects(results);
  }, [query, filterType]);
  const handleClick = (id) => {
    console.log('clicked', id);
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
                style={{ marginTop: '0px', fontSize: '25px' }}
              />
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Search Project"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-search">
            {open ? (
              <KeyboardArrowUpIcon onClick={() => handleToggle()} />
            ) : (
              <KeyboardArrowDownIcon onClick={() => handleToggle()} />
            )}
            <div>FILTER</div>
            <FilterAltIcon />
          </div>
        </div>
        {open && (
          <div className="status-radio-btn">
            <div className="radio-btn">
              Planned
              <input
                type="radio"
                value={filterType}
                name="filterType"
                checked={filterType === 'planned'}
                onClick={() => handleFilterType('planned')}
              />
            </div>
            <div className="radio-btn">
              Draft
              <input
                className="radio-btn-right"
                type="radio"
                value={filterType}
                name="filterType"
                checked={filterType === 'unsupportedInput'}
                onClick={() => handleFilterType('unsupportedInput')}
              />
            </div>
            <div>
              {filterType !== '' && (
                <div className="radio-btn">
                  Clear All
                  <input
                    className="radio-btn-right"
                    type="radio"
                    value={filterType}
                    name="filterType"
                    checked={filterType === ''}
                    onClick={() => handleFilterType('')}
                  />
                </div>
              )}
            </div>
          </div>
        )}
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
                    // onClick={() => handleClick(project.id)}
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
