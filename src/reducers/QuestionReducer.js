import * as ActionTypes from '../constants/ActionTypes'
const initialState = [
    {
        id: 0,
        "isAnswered": false,
        'picUrl' : '/images/question-sample.png',
        'answer' : 'A',
        'selectedOption' : null
    }

];

export default function QuestionReducer(state = [], action) {
    switch (action.type) {
        case "MARK_ANSWER" :
            return state.map(answer =>
                answer.id === action.id
                    ? {...answer, isAnswered: true, selectedOption: action.selectedOption}
                    : answer);
        case ActionTypes.SKIP_QUESTION :
            alert("SKIP_QUESTION " + action.id);
            return state.map(question =>
                question.id === action.id
                ? {...question, skipped: true}
                :question);
        default:
            return state
    }
}