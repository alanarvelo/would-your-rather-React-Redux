import { RECEIVE_USERS, ADD_USER_ANSWER, ADD_USER_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ADD_USER_ANSWER :
      return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: Object.assign(state[action.authedUser]['answers'], {[action.qid]: action.answer})
          }
      }
    case ADD_USER_QUESTION:
      const { newQuestion } = action
      return {
        ...state,
        [newQuestion.author]: {
          ...state[newQuestion.author],
          questions: state[newQuestion.author].questions.concat([newQuestion.id])
        }
      }
    default :
      return state
  }
}