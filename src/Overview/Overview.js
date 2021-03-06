import React from 'react';
import ApiContext from '../ApiContext';
import {Link} from 'react-router-dom';
import './Overview.css'
import HabitsApiService from '../Services/habits-api-service';

class Overview extends React.Component {
    state = {
        habits: []
    }
    static contextType = ApiContext

    componentDidMount() {
        HabitsApiService.getHabits()
            .then((habits) => {
                this.setState({habits})
            })
            .catch((error) => {
                console.error({error})
            })
    }

    handleDeleteHabits= e => {
        e.preventDefault();
        HabitsApiService.deleteAllHabits()
            .then(() => {
                this.context.deleteHabits()
                this.setState({
                    habits: []
                })
            })
    }

    render() {
        let {habits} = this.state;
        let {day} = this.context;
        let habitWarning;
        let dayWarning;

        if(day > 7) {
            dayWarning = <p className = "day_warning">Looks like you've finished a week! Click on the button below to start a new week</p>
        }

        if(habits.length === 0) {
            habitWarning = <p className = "habit_warning">Uh oh! Looks like you haven't added a habit yet. Please click <Link to = '/add-habit'>here</Link> to add a habit</p>
        }

        return(
            <div className="Overview">
                <div className ="page_title"><h2 className="title">Your Overview</h2></div>
                <div className ="parent">
                    <div className="habits_section child">
                        <h3 className="subheading_overview"> Habits </h3>
                        <ul className="habits_list">
                            {habits.map(habit => 
                                <li key={habit.id}>
                                    <Link to = {`/habit/${habit.id}`}>{habit.name}</Link>
                                </li>
                            )}
                            {habitWarning}
                            <input type="button" value ="Delete All Habits" className="overview_button delete" onClick={this.handleDeleteHabits}/>
                        </ul>
                    </div>
                    <div className="day_number child">
                        <h3 className="subheading_overview"> On Day: </h3>
                        <h4 className="on_day"> {day} </h4>
                        {dayWarning}
                        <input type="button" value="Start New Week" className="overview_button start" onClick={this.context.newWeek}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview
