import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, NavDropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component {
  handleLogOut = (evt) => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }
  render() {
    const { loggedIn, authedUser, users } = this.props
    console.log("login on nav: ", loggedIn)
    return (
      <Nav fill variant="tabs" defaultActiveKey="/home" className='centered-container'>
        <Nav.Item>
          <NavLink to='/' exact >
            Home
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to='/add'>
            New Question
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </Nav.Item>
          {loggedIn
            ? <NavDropdown title={`${users[authedUser].name}`} id="nav-dropdown" >
                <NavDropdown.Item > {`Logged in as ${users[authedUser].name}`} </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleLogOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            : <Nav.Item>
                <NavLink to='/login' activeClassName='active'>
                  Login
                </NavLink>
              </Nav.Item>
          }
      </Nav>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    loggedIn: authedUser !== null,
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(NavBar)