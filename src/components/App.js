import React, { Component } from 'react';
import '../App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'

import Dashboard from './main/Dashboard'
import QuestionPage from './main/QuestionPage'
import NavBar from './Nav'
import NewQuestion from './main/questions/NewQuestion'
import Leaderboard from './main/Leaderboard'
import Login from './main/Login'
import NotFound from './main/NotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { url } = this.props
    
    return (
      <Router>
        <div className="container">
          <LoadingBar />
          <NavBar />

              {this.props.loggedIn
                ? <div>
                    <Switch>
                      <Route path='/' exact component={Dashboard} />
                      <Route path='/questions/:id' component={QuestionPage} />
                      <Route path='/add' component={NewQuestion} />
                      <Route path='/leaderboard' component={Leaderboard} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                : <Redirect to={{pathname: '/login', state: { prevUrl: url } }} />
              }
          <Route path='/login' component={Login} />
        </div>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }, props) {
  const url = props.location.pathname
  return {
    loggedIn: authedUser !== null,
    url: url
  }
}

export default withRouter(connect(mapStateToProps)(App));
