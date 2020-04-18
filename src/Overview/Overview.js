import React from 'react';
import ApiContext from '../ApiContext';
import {Link} from 'react-router-dom';
import './Overview.css'

class Overview extends React.Component {
    static contextType = ApiContext
    render() {
        const {habits = []} = this.context
        return(
            <div className="Overview">
                <div className ="page_title"><h2 className="title">Your Overview</h2></div>
                <div className="overview_main">
                    <div className="habits_section">
                        <h3 className="subheading_overview"> Habits </h3>
                        <ul className="habits_list">
                            {habits.map(habit => 
                                <li key={habit.id}>
                                    <Link to = {`/habit/${habit.id}`}>{habit.name}</Link>
                                </li>
                            )}
                            <input type="button" value ="Delete All Habits" className="overview_button" onClick={this.context.deleteHabits}/>
                        </ul>
                    </div>
                    <div className="day_number">
                        <h3 className="subheading_overview"> On Day: </h3>
                        <h4 className="on_day"> X </h4>
                        <input type="button" value="Start New Week" className="overview_button" onClick={this.context.newWeek}/>
                    </div>
                    <div className="success_section">
                        <h3 className="subheading_overview"> Your Most Consistent Habit </h3>
                        <h4 className="habit_best"> Habit X </h4>
                        <h5 className="consistency"> Completed : 5/7 Days </h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview
