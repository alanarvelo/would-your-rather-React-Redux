import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

import UserCard from './UserCard'

class Leaderboard extends Component {
  participationCounter = (user) => {
    let answered = Object.keys(user.answers).length
    let asked = user.questions.length
    return {
      answered,
      asked,
      total: (answered + asked),
    }
  }

  render() {
    const { users } = this.props
    let userIds = Object.keys(users)
    userIds = userIds.sort((a, b) => this.participationCounter(users[b])['total'] - this.participationCounter(users[a])['total'])
    return (
      <div className='centered-container'>
        <Card style={{ width: '54rem'}}>
        <Card.Header>LeaderBoard</Card.Header>
          <Card.Body>
            <ul className='dashboard-list'>
              {userIds.map((uid) => {
                let { answered, asked, total } = this.participationCounter(users[uid])
                return (<li key={uid}>
                  <UserCard answered={answered} asked={asked} total={total} user={users[uid]} />
                  </li>)
              })}
            </ul>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)