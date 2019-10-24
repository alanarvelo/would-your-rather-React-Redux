import React, { Component } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { handleSaveAnswer } from '../../../actions/shared'
import { connect } from 'react-redux'

class PreQtnText extends Component {
  state = {
    selectedOption: ""
  }

  // create a hasAnswered state to track user's has responded or not
  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.selectedOption === "") return null
    else {
      const { dispatch, qtn, authedUser } = this.props  
      dispatch(handleSaveAnswer({
        answer: this.state.selectedOption,
        qid: qtn.id,
        authedUser
      }))
      this.setState({
        selectedOption: ""
      })
      console.log("You have submitted:", this.state.selectedOption)
    }
  }
      
  render() {
    const { qtn } = this.props  
    return (
      <Col md>
        <h3>Would you rather...</h3>
        <form onSubmit={this.handleFormSubmit}>
          <Row>
            <label>
              <input
                type="radio"
                name="optionOne"
                value="optionOne"
                checked={this.state.selectedOption === "optionOne"}
                onChange={this.handleOptionChange}
              />
              {qtn.optionOne.text}
            </label>
          </Row>
          <Row>
            <label>
              <input
                type="radio"
                name="optionTwo"
                value="optionTwo"
                checked={this.state.selectedOption === "optionTwo"}
                onChange={this.handleOptionChange}
              />
              {qtn.optionTwo.text}
            </label>
          </Row>
          <Button type='submit' disabled={this.state.selectedOption === ""}>
            Submit Answer
          </Button>
        </form>
      </Col>
    )
  }
}

export default connect()(PreQtnText)