import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { handleSaveQuestion } from '../../../actions/shared'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  }

  handleChange = (e) => {
    const opt = e.target.name
    const text = e.target.value
    this.setState((prevState) => (
      Object.assign(prevState, {[opt]: text})
    ))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handleSaveQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: true
    }))
  }


  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='centered-container'>
        <Card style={{ width: '48rem', padding: '1em'}}>
          <Card.Title>Complete the Question...</Card.Title>
          <Card.Body>
            <form className='new-tweet' onSubmit={this.handleSubmit}>
              <Card.Subtitle>Would You Rather...</Card.Subtitle>
              <br></br>
              <input
                type='text'
                name="optionOneText"
                className='textarea'
                placeholder="Option 1"
                value={optionOneText}
                onChange={this.handleChange}
              />
              <br></br>
              <Card.Subtitle> Or </Card.Subtitle>
              <br></br>
              <input
                type='text'
                name="optionTwoText"
                className='textarea'
                placeholder="Option 2"
                value={optionTwoText}
                onChange={this.handleChange}
              />
              <Button
                className='btn'
                type='submit'
                disabled={optionOneText === '' || optionTwoText === ''}
                >
                  Post Question
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default connect()(NewQuestion)