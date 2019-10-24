import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, addUserAnswer, addUserQuestion } from './users'
import { receiveQuestions, saveAnswer, saveNewQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

// to initialize the Redux Store
export function handleInitialData () {
  return ((dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveQuestions(questions))
        dispatch(receiveUsers(users))
        dispatch(hideLoading())
      })
  })
}

export function handleSaveQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((newQuestion) => {
        dispatch(saveNewQuestion(newQuestion))
        dispatch(addUserQuestion(newQuestion))
      })
      .then(() => dispatch(hideLoading()))
  }
}

// to save a new answer both in the questions and user parts of the Store
// optimistic save
export function handleSaveAnswer (info) {
  return (dispatch) => {
    dispatch(saveAnswer(info))
    dispatch(addUserAnswer(info))
    
    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn("Error in handleSaveAnswer: ", e)
        dispatch(saveAnswer(info))
        dispatch(addUserAnswer(info))
        alert("There was an error recording your answer. Please try again.")
      })
  }
}
