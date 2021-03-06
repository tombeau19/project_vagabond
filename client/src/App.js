import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
import City from './components/City.js'
import Post from './components/Post'
import PostForm from './components/PostForm'
import EditForm from './components/EditForm'


class App extends Component {
  state = {
    cities: []
  }

  async componentWillMount() {
    try{
      const response = await axios.get('/api/cities')
      this.setState({cities: response.data})
      // console.log(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const HomePageComponent = () => (<HomePage cities={this.state.cities} />)
    return (
      <Router className="App">
        <div>
          <NavBar />

          <Switch>
              <Route exact path="/"  render={HomePageComponent}/>
              <Route exact path="/cities/:city_id" component={City} />
              <Route exact path="/cities/:city_id/posts/:id" component={Post} />
              <Route exact path="/cities/:city_id/posts" component={PostForm} />
              <Route exact path="/cities/:city_id/posts/:id" component={EditForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
