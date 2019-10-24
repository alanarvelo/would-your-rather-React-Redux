import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, DropdownButton, Dropdown } from 'react-bootstrap'
import { setAuthedUser } from '../../actions/authedUser'
import { Redirect } from 'react-router-dom'


class Login extends Component {
  handleSelection = (evt) => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(evt.target.name))
  }
  render() {
    const { users, loggedIn } = this.props
    if (loggedIn) {
      return <Redirect to='/' />
    }
    return (
      <div className='centered-container'>
        <Card style={{ width: '48rem'}} >
          <Card.Header></Card.Header>
          <Card.Title className="center" style={{'marginTop':'1em'}}>Login</Card.Title>
          <Card.Body className='centered-container'>
            <DropdownButton alignRight id="dropdown-item-button" title="Select User">
              {Object.keys(users).map((uid) => {
                let user = users[uid]
                return (
                <Dropdown.Item as="button" key={user.id} name={user.id} onClick={this.handleSelection}> {user.name} </Dropdown.Item>
                )
              })}
            </DropdownButton>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }, props) {
  const url = props.location.pathname
  return {
    loggedIn: authedUser !== null,
    users,
    authedUser,
    url
  }
}

export default connect(mapStateToProps)(Login)