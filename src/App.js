import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types'
import QuestionPic from './components/QuestionPic'
import AnswerOptions from "./components/AnswerOptions";
import ScoreBoard from "./components/ScoreBoard";
import SubmitActions from "./components/SubmitActions";
import LoginRedirectMonitor from "./containers/LoginRedirectMonitor";
import Timer from "./containers/Timer";
import {connect} from 'react-redux';
import * as QuestionActions from './actions/QuestionActions'
import * as Utils from "./utils/Utils";
import * as RestClient from './api/RestClient'
import AnswerExplanation from "./components/AnswerExplanation";
import PieChartTestAnalysis from "./components/PieChartTestAnalysis";
import BarAnswerStats from "./components/BarAnswerStats";
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


const App = ({match: { params }, history, questions, settings, onSkipQuestionClicked, onNextQuestionClicked, dispatch}) => {
    if(questions.length == 0){
        return(
            <div className="row">
                <div className="col-md-8 col-sm-12">
                    No questions found.
                    <p><a className="btn btn-primary" href={process.env.REACT_APP_JAVA_APP_URL + "/student/dashboard"}>Go to Home Page</a></p>
                </div>
            </div>
        );
    } else{
        return(
            <div className="row">
                <div className="col-md-8 col-sm-12">
                    <LoginRedirectMonitor />
                    <Alert stack={{limit: 2}} />
                    <Timer />
                    <QuestionPic picUrl={questions[getIndex(params)].picUrl} />
                    <AnswerOptions question={questions[getIndex(params)]} dispatch={dispatch} history={history} index={getIndex(params)} totalQuestion={questions.length} settings={settings}/>
                    <AnswerExplanation question={questions[getIndex(params)]} />
                    <SubmitActions onSkipQuestionClicked={() => {
                        dispatch(onSkipQuestionClicked(questions[getIndex(params)].id));
                        Utils.redirectToNextQuestion(history, getIndex(params), questions.length);
                    }} onNextQuestionClicked={() => {
                        dispatch(onNextQuestionClicked(questions[getIndex(params)].id));
                        Utils.redirectToNextQuestion(history, getIndex(params), questions.length);
                    }} dispatch={dispatch} settings={settings} question={questions[getIndex(params)]}/>
                </div>
                <div className="col-md-4 col-sm-12">
                    <ScoreBoard questions={questions} />
                    <PieChartTestAnalysis questions={questions}/>
                    <BarAnswerStats question={questions[getIndex(params)]}/>
                </div>
            </div>
        );
    }
};

function getIndex(params){
    return parseInt(params.index) || 0;
}

App.propTypes = {
    questions: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    onSkipQuestionClicked: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};



const mapStateToProps = state => ({
    settings: state.settings,
    questions: state.questions
});


const mapDispatchToProps = (dispatch) => ({
    onSkipQuestionClicked: QuestionActions.skipQuestion,
    onNextQuestionClicked: QuestionActions.nextQuestion,
    dispatch
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


