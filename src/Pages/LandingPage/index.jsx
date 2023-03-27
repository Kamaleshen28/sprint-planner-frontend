import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ProjectCard, Header } from '../../Components';
import './LandingPage.css';
import { useOktaAuth } from '@okta/okta-react';

export default function LandingPage() {
  const { authState } = useOktaAuth();
  const [projects, setProjects] = React.useState([]);
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  const [query, setQuery] = React.useState('');
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
    const results = projects.filter((project) =>
      project.title.toLowerCase().includes(query),
    );
    setFilteredProjects(results);
  }, [query]);
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
        </div>
        <Box sx={{ flexGrow: 1, width: '80%', margin: 'auto' }}>
          <Grid container rowSpacing={2}>
            {filteredProjects.map((project) => (
              <Grid key={Math.random()} xs={12} md={4} sx={{ mt: 2 }}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
