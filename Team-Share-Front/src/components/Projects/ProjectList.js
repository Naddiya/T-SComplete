// == Import : npm
import React from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Redirect} from 'react-router-dom';
import { IoIosAddCircle, IoIosBatteryCharging } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import store from 'src/store';

// == Import : local


// == Composant
const ProjectList = ({
  image,
  title,
  tags,
  description,
  nbLike,
  skills,
  technos,
  createdAt,
  id }) => {

  const state = store.getState();

  const data = {
    token: state.token,
    project: id,
  }
  const handleClickLike = () => {
    axios.post('http://95.142.160.243/team-share-back/public/follow/add', data)
      .then((response) => {
        console.log(response);
        if("Un nouveau like a été ajouté au projet"==response.message){
          document.getElementById(id).innerHTML=nbLike++;
        }
        if("Le projet a été disliké"==response.message){
          document.getElementById(id).innerHTML=nbLike--;
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(data);
      });
  }

  return (
    <Item>
      <Item.Image src={image} />
      <Item.Content>
        <Item.Header
          className="projectTitle"
          as={NavLink}
          to={`project-detail/${id}`}>{title}
        </Item.Header>

        <Button onClick={handleClickLike} color="grey" className="item-follow"><IoIosAddCircle size="15px" />Like</Button>

        <Item.Extra>

          <Label>{createdAt.date}</Label>
          <a>
            
            <span> <Icon name='heart' /> <span id={id}> {nbLike} </span></span> likes
            </a>

          <span className="item-follow"><IoIosBatteryCharging size="28px" />Progression</span>

        </Item.Extra>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>
          <div>Technologies : </div>
          {technos.map((techno) => (
            <Label key={techno.id} {...techno}>{techno.name}</Label>
          ))}
          <div>Compétences : </div>
          {skills.map((skill) => (
            <Label key={skill.id} {...skill}>{skill.name}</Label>
          ))}
          <div>Tags : </div>
          {tags.map((tag) => (
            <Label key={tag.id} {...tag}>{tag.name}</Label>
          ))}
        </Item.Extra>

      </Item.Content>
    </Item>
  );
};

// == Export
export default ProjectList;


// <Card fluid>
// <Image src={image} wrapped ui={false} />
// <Card.Content>
//   <Card.Header>{title}</Card.Header>
//   <Card.Meta>
//     <span className='date'>{tag}</span>
//   </Card.Meta>
//   <Card.Description>
//     {description}
//   </Card.Description>
// </Card.Content>
// <Card.Content extra>
//   <a>
//     <Icon name='heart' />
//     {nbLike} likes
//   </a>
// </Card.Content>
// </Card>