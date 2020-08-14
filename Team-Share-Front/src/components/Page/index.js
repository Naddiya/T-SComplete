// == Import : npm
import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

// == Import : local
import Home from 'src/containers/Home';
import HomeProjects from 'src/components/HomeProjects';
import Team from 'src/components/Team';
import Profile from 'src/components/Profile';
import Projects from 'src/containers/Projects';
import ProjectDetail from 'src/containers/ProjectDetail';
// import projectdetails from 'src/data/projects.json';
import ProjectCreation from 'src/containers/ProjectCreation';
import LegalMentions from 'src/components/LegalMentions';


// == Composant
class Page extends React.Component {

  state = {
    projects: [],
    technos: [],
    tag: [],
    skills: [],
    filteredProjects: [],
  }


  componentDidMount() {
    axios.get('http://95.142.160.243/team-share-back/public/index.php/project/index')
      .then((response) => {
        let homeprojects = response.data;
        this.setState({ projects: homeprojects });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://91.171.100.233/techno/index')
      .then((response) => {
        let profiletechnos = response.data;
        this.setState({ technos: profiletechnos });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('http://localhost:8000/tag/index')
      .then((response) => {
        let tag = response.data;
        this.setState({ tag: tag });
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('http://localhost:8000/skill/index')
      .then((response) => {
        let skills = response.data;
        this.setState({ skills: skills });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <>
        <Route path="/" exact component={Home} />
        <Route path="/" exact render={() => (
          <HomeProjects projects={this.state.projects} />
        )} />
        <Route path="/" exact component={Team} />
        <Route path="/profile" render={() => (
          <Profile
            projects={this.state.projects}
            technos={this.state.technos}
            skills={this.state.skills}
          />
        )} />
        <Route path="/projects" render={() => (
          <Projects
            projects={this.state.projects}
            technos={this.state.technos}
            tags={this.state.tag}
            skills={this.state.skills}
          />
        )} />
        <Route path="/project-creation" render={() => (
          <ProjectCreation />
        )} />
        <Route path="/project-detail/:id" component={ProjectDetail} />
        <Route path="/legal-mentions" render={() => (
          <LegalMentions />
        )} />
        {/* <Route component={Error} /> */}
      </>
    )
  };
};

export default Page;
