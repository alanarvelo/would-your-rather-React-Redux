import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import Question from './questions/Question'

class QuestionPage extends Component {
  render() {
    const { id, url, notFound } = this.props
    if (notFound) {
      return <p>This question does not exists.</p>
    }
    return (
      <div className='centered-container'>
        <Card style={{ width: '48rem'}}>
          <Card.Body>
            <Question id={id} url={url}/>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }, props) {
  const { id } = props.match.params
  const url = props.location.pathname
  return {
    id,
    url,
    notFound: !Object.keys(questions).includes(id)
  }
}

export default withRouter(connect(mapStateToProps)(QuestionPage))