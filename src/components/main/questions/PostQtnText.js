import React from 'react'
import { Col, Row } from 'react-bootstrap'

function PostQtnText (props) {
  const { qtn, authedUserFull } = props
  const op1 = qtn.optionOne.votes.length
  const op2 = qtn.optionTwo.votes.length
  const total = op1 + op2
  const yourVote = qtn[authedUserFull['answers'][qtn.id]].text
  
  return (
    <Col md>
      <h3>Results</h3>
      <Row className={yourVote === qtn.optionOne.text ? 'your-choice' : null}>
        <Col sm>
        <label style={{fontWeight: 'bold'}}>
            {qtn.optionOne.text}
          </label>
        </Col>
        <Col lg>
          {`${op1} out of ${total}, or ${Math.round(op1*100/total)}% voted for this option.`}
        </Col>
      </Row>
      <Row className={yourVote === qtn.optionTwo.text ? 'your-choice' : null}>
        <Col sm>
        <label style={{fontWeight: 'bold'}}>
            {qtn.optionTwo.text}
          </label>
        </Col>
        <Col lg>
        {`${op2} out of ${total}, or ${Math.round(op2*100/total)}% voted for this option.`}
        </Col>
      </Row>
      <Row>
        <Col>
        {`You voted for – ${yourVote} – on this question.`}
        </Col>
      </Row>

    </Col>
  )
}

export default PostQtnText