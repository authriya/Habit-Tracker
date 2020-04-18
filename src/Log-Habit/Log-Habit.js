import React from 'react';
import './Log-Habit.css'

class LogHabit extends React.Component {
    render() {
        return(
            <div className="Log_Habit_Form">
                <div className="page_title"><h2 className="title">Log Habits For The Day</h2></div>
                <div className = "page_subheading"><h3 className="subheading">Habits for Day X </h3></div>
            <form className="day_tracker">
                <label htmlFor="habit_1" className="log_habit_label">Habit 1
                    <input type="checkbox" id="habit_1" name="habit_1" className="log_habit_input"/>
                </label>
                <label htmlFor="habit_2" className="log_habit_label">Habit 2
                    <input type="checkbox" id="habit_2" name="habit_2" className="log_habit_input"/>
                </label>
                <label htmlFor="habit_3" className="log_habit_label">Habit 3
                    <input type="checkbox" id="habit_3" name="habit_3" className="log_habit_input"/>
                </label>
                <label htmlFor="habit_4" className="log_habit_label">Habit 4
                    <input type="checkbox" id="habit_4" name="habit_4" className="log_habit_input"/>
                </label>
                <label htmlFor="habit_5" className="log_habit_label">Habit 5
                    <input type="checkbox" id="habit_5" name="habit_5" className="log_habit_input"/>
                </label>
                <input type="button" className="log_habit_input" value="submit"/>
            </form>
        </div>
        )
    }
}

export default LogHabit
