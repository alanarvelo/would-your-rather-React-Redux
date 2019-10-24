import React, { Component } from 'react';
import '../App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Dashboard from './main/Dashboard'
import QuestionPage from './main/QuestionPage'
import NavBar from './Nav'
import NewQuestion from './main/questions/NewQuestion'
import Leaderboard from './main/Leaderboard'
import Login from './main/Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    // console.log(this.props.loggedIn)
    console.log("passed through App")
    return (
      <Router>
        
        <div className="container">
          <LoadingBar />
          <NavBar />
          {this.props.loggedIn
            ? <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/questions/:id' exact component={QuestionPage} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
              </div>
            : <Redirect to='/login' exact/>
          }
          <Route path='/login' component={Login} />
          
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(App);
