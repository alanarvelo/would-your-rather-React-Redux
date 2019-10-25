import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Container, Row, Col, Image } from 'react-bootstrap'

import MinQtnText from './MinQtnText'
import PreQtnText from './PreQtnText'
import PostQtnText from './PostQtnText'

class Question extends Component {

  render() {

    const { qtn, authedUser, users, url } = this.props
    if (qtn === null) {
      return <p>This question doesn't exist</p>
    }
    const author = users[qtn.author]
    const questionsPage = url.includes("questions/")
    const hasAnswered = qtn.optionOne.votes.concat(qtn.optionTwo.votes).includes(authedUser)
    
    return (
        <Card >
          <Card.Header as="h6">{`${author.name} asks:`}</Card.Header>
          <Card.Body>
            <Container>
              <Row>

                <Col sm>
                  <Image src={author.avatarURL} height="150" width="150" roundedCircle />
                </Col>

                <Col md>
                {!questionsPage
                  ? <MinQtnText qtn={qtn} />
                  : ( !hasAnswered
                      ? <PreQtnText qtn={qtn} authedUser={authedUser} />
                      : <PostQtnText qtn={qtn} authedUserFull={users[authedUser]} />
                    )
                }
                </Col>
                
              </Row>
            </Container>
           </Card.Body>
         </Card>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser },  { id, url } ) {
  const qtn = questions[id]
  return {
    authedUser,
    users,
    qtn : qtn
      ? qtn
      : null,
    url
  }
}

export default connect(mapStateToProps)(Question)