import React, { Component } from 'react';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Post from './Post'

class App extends Component {
  constructor(){
    super();
    this.state={
      posts:[]
    }
  }

  componentDidMount(){
    let state = localStorage.getItem('appState');
    state = JSON.parse(state);
    this.setState(state);
  }

  saveInStorage(){
    let actualState = this.state;
    actualState = JSON.stringify(actualState);
    localStorage.setItem('appState', actualState);
  }

  newPost(){
    const post = prompt('Insira o texto do seu novo post');
    let posts = this.state.posts;
    posts.push(post);
    this.setState({posts: posts});
    this.saveInStorage();
  }

  render() {
   
    return (
      <MuiThemeProvider>
        <div style={{padding: 30, backgroundColor: '#DDDDDD'}}>
          {this.state.posts.map((post,index)=>{
            return(<Post storageKey={'post' + index} text={post}/>)
          })}
          <FlatButton label={'Novo Post'} onClick={this.newPost.bind(this)}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
