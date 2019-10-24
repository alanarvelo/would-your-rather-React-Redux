import { RECEIVE_QUESTIONS, SAVE_ANSWER, SAVE_NEW_QUESTION } from '../actions/questions'

export default function questions (state={}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    case SAVE_ANSWER :
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    case SAVE_NEW_QUESTION :
      const { newQuestion } = action
      return {
        ...state,
        [newQuestion.id]: newQuestion
      } 
    default :
      return state
  }
}