import React from 'react'
import { Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function MinQtnText (props) {
    const { qtn } = props
    return (
      <Col md>
        <Link to={`/questions/${qtn.id}`} style={{color: '#000'}} >
          <h4>Would you rather...</h4>
            <span style={{fontWeight: 'normal'}}>{qtn.optionOne.text}</span>
            <br></br>
            OR
            <br></br>
            <span style={{fontWeight: 'normal'}}>{qtn.optionTwo.text} </span>
            <Button variant="primary" size="md" >
              View Question
            </Button>
        </Link>
      </Col>
    )
  }

export default MinQtnText