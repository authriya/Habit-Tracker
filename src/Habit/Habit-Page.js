import React from 'react';
import ApiContext from '../ApiContext';
import {Link} from 'react-router-dom';
import {findHabit} from '../Habits-Helpers';
import './Habit-Page.css'

class HabitPage extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext

    handleDeleteHabit = e => {
        e.preventDefault()
        this.context.deleteHabit()
    }
    render() {
        const {habits = []} = this.context
        const {habitId} = this.props.match.params
        const habit = findHabit(habits, parseInt(habitId))
        console.log(habit)
        if(!habit) {
            return null
        }
        return(
            <div className="Habit_Page">
                <h2 className="habit_title">{habit.name}</h2>
                <p className="habit_description">{habit.description}</p>
                <Link to ={`/edit-habit/${habit.id}`}><input type="button" value="Edit Habit" className="habit_page_button"/></Link><input type="button" value="Delete Habit" className="habit_page_button" onClick = {this.handleDeleteHabit}/>
            </div>
        )
    }
}

export default HabitPage
