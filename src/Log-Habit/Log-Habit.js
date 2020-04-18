import React from 'react';
import ApiContext from '../ApiContext'
import './Log-Habit.css';

class LogHabit extends React.Component {
    static contextType = ApiContext
    render() {
        const {habits = []} = this.context
        return(
            <div className="Log_Habit_Form">
                <div className="page_title"><h2 className="title">Log Habits For The Day</h2></div>
                <div className = "page_subheading"><h3 className="subheading">Habits for Day X </h3></div>
            <form className="day_tracker">
                {habits.map(habit => 
                    <label htmlFor={`habit_${habit.id}`} key = {habit.id} className="log_habit_label"> {habit.name}
                        <input type="checkbox" id={`habit_${habit.id}`} name={`habit_${habit.id}`} className="log_habit_input"/>
                    </label>
                )}
                <input type="button" className="log_habit_input" value="submit"/>
            </form>
        </div>
        )
    }
}

export default LogHabit
