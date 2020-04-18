import React from 'react';
import './Overview.css'

class Overview extends React.Component {
    render() {
        return(
            <div className="Overview">
                <div className ="page_title"><h2 class="title">Your Overview</h2></div>
                <div className="overview_main">
                    <div className="habits_section">
                        <h3 className="subheading_overview"> Habits </h3>
                        <ul className="habits_list">
                            <li> Habit 1 </li>
                            <li> Habit 2 </li>
                            <li> Habit 3 </li>
                            <li> Habit 4 </li>
                            <li> Habit 5 </li>
                            <input type="button" value ="Delete All Habits" className="overview_button"/>
                        </ul>
                    </div>
                    <div className="day_number">
                        <h3 className="subheading_overview"> On Day: </h3>
                        <h4 className="on_day"> X </h4>
                        <input type="button" value="Start New Week" className="overview_button"/>
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
