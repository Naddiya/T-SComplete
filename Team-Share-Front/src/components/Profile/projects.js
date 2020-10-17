// == Import : npm
import React from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react';
import { MdPerson } from 'react-icons';
import 'semantic-ui-css/semantic.min.css';
import store from 'src/store';
// == Import : local
const state = {
  isPersonal: 'none'
}

// == Composant
const Projects = ({ image, title, tags, description, nbLike }) => (
  <Item>
    <Item.Image src={image} />
    <Item.Content>
      <Item.Header as='a'>{title}</Item.Header>
      <Item.Description>{description}</Item.Description>
      <Item.Extra>
        <Label>{console.log(tags, state.isPersonal)}</Label>
        <Icon name='heart' />
        {isNaN(parseInt(nbLike)) ? 0 : nbLike} likes
        {store.getState().projectsUser.find(element =>
          element.title == title) == undefined ? state.isPersonal = 'none' : state.isPersonal = 'block'
        }
      </Item.Extra>
      <Button floated='right' basic color='red' style={{ display: state.isPersonal }} >Supprimer</Button>
    </Item.Content>
  </Item>
);

// == Export
export default Projects;


// si paseInt de nblike n'est pas a number alors 0 sinon le nombre de like */
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