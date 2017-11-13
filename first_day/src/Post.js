import React, { Component } from 'react';


import {Card, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Post extends Component {

  constructor(){
    super();
    this.state={
      name: 'Baraky',
      likes: 0,
      isFavorite: false,
      comments: ['Olá']
    }
  }

  componentDidMount(){
    let state = localStorage.getItem(this.props.storageKey);
    state = JSON.parse(state);
    this.setState(state);
  }

  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem(this.props.storageKey, actualState);
  }


  giveLike(){
    let numLikes = this.state.likes;
    numLikes = numLikes + 1;
    const newState = {
      likes: numLikes        
    }
    console.log('GIVELIKES');
    this.setState(newState);
    this.saveInStorage();
  }

  setFavorite(){
    let favorite = this.state.isFavorite;
    favorite = !favorite;
    this.setState({isFavorite: favorite});
    this.saveInStorage();
  }

  newComment(){
    // PEGAR O ESTADO ATUAL
    let comments = this.state.comments;
    // MUDAR ELE
    const newCommentText = prompt('Digite seu comentário');
    comments.push(newCommentText);
    // SETAR NO ESTADO
    this.setState({comments: comments});
    this.saveInStorage();
  }

 
  render() {
    console.log('RENDER DO APP - ', this.state);
    let favoriteText;
    if(this.state.isFavorite){
      favoriteText = 'REMOVER DOS FAVORITOS';
    } else {
      favoriteText = 'FAVORITO';
    }

    return (
      <Card style={{marginBottom:30, backgroundColor: '#DDDDFF'}}>
          <CardText>
        <h1> {this.props.text} </h1>
        <h3> {this.state.name} </h3>
        <h4> {'Likes: ' + this.state.likes} </h4>

        <FlatButton 
            backgroundColor="#a4c639"
            label={'Like'}
            onClick={this.giveLike.bind(this)} />       
        <FlatButton 
            backgroundColor="#99AAAA"
            label={favoriteText}
            onClick={this.setFavorite.bind(this)} />
        <FlatButton 
            label={'Comentar'}
            onClick={this.newComment.bind(this)} />
        <Card style={{padding: 15, backgroundColor: '#FFFFFF'}}>
          {this.state.comments.map((text,index) => {
            return (
            <h4 key={index}> 
              {text} 
            </h4>);
          })}
        </Card>
        </CardText>
      </Card>
    );
  }
}

export default Post;
