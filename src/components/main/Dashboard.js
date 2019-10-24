import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import Question from './questions/Question'

class Dashboard extends Component {
  render() {
    const { answeredIds, unAnsweredIds, url } = this.props
    // if (!loggedIn) {
    //   return <p>Login to view this page.</p>
    // }
    return (
      <div className='centered-container'>
        <Card style={{ width: '48rem'}}>
          <Card.Header as="h5">Dashboard</Card.Header>
          <Card.Body>
            <Tabs className='centered-container' width="100%"  id="uncontrolled-tab-example">
              <Tab eventKey="Unanswered Questions" title="Unanswered Questions" style={{marginBottom: '2em'}}>
                <ul className='dashboard-list'>
                  {unAnsweredIds.map((id) => (
                    <li key={id}>
                      <Question id={id} url={url} />
                    </li>
                  ))}
                </ul>
              </Tab>
              <Tab eventKey="Answered Questions" title="Answered Questions">
                <ul className='dashboard-list'>
                  {answeredIds.map((id) => (
                    <li key={id}>
                      <Question id={id} url={url} />
                    </li>
                  ))}
                </ul>
              </Tab>
            </Tabs> 
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }, props) {
  const answeredQtnIds = Object.keys(users[authedUser]['answers'])
  const unAnsweredQtnIds = Object.keys(questions)
    .filter((q) => !answeredQtnIds.includes(q))
  return {
    unAnsweredIds: unAnsweredQtnIds
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredIds: answeredQtnIds
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    url: props.location.pathname,
    loggedIn: authedUser !== null
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard))