import React from 'react'
import { Card, Container, Row, Col, Image } from 'react-bootstrap'

function UserCard (props) {
  const { answered, asked, total, user } = props
  return (
    <Card >
      <Card.Header as="h5">{`${user.name}`}</Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col sm>
              <Image src={user.avatarURL} height="150" width="150" roundedCircle />
            </Col>

            <Col md>
            <span style={{fontWeight: 'normal'}}>{`Questions Answered: ${answered}`}</span>
              <br></br>
            <span style={{fontWeight: 'normal'}}>{`Questions Answered: ${asked}`}</span>
            
            </Col>

            <Col md>
            <span style={{fontWeight: 'bold'}}>{"Total Participations:"}</span>
            <br></br>
            <span style={{fontWeight: 'bold'}}>{`${total}`}</span>
            </Col>
            
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default UserCard