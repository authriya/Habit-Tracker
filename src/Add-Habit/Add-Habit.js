import React from 'react';
import './Add-Habit.css'

class AddHabit extends React.Component {
    render() {
        return(
            <div className="Add_Habit_Form">
                <div className = "page_title"><h2 className="title">Add a Habit</h2></div>
                <form className="add_habit">
                    <label htmlFor="habit_name" className="add_habit_label">Habit Name </label>
                    <input id="habit_name" type="text" name="habit_name" className="add_habit_input"/>
                    <label htmlFor="habit_description" className="add_habit_label">Habit description</label>
                    <input id="habit_description" type="text" name="habit_description" className="add_habit_input"/>
                    <input type="button" value="submit" className="add_habit_input"/>
                </form>
            </div>
        )
    }
}

export default AddHabit
