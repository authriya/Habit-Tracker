import React from 'react';
import ApiContext from '../ApiContext'
import './Add-Habit.css'
import HabitsApiService from '../Services/habits-api-service';
import HabitsHistoryApiService from '../Services/habitshistory-api-service';

class AddHabit extends React.Component {
    state = {
        name: '',
        description: '',
        error: null 
    }

    static contextType = ApiContext

    handleNameChange = (name) => {
        this.setState({
            name
        })
    }

    handleDescChange = (description) => {
        this.setState({
            description
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const habit = {
            name: this.state.name, 
            description: this.state.description
        };
        this.setState({error: null});
        HabitsApiService.postHabit(habit)
            .then((habit) => {
                HabitsHistoryApiService.postHistory({
                    habit: habit.id,
                    day1: null,
                    day2: null,
                    day3: null,
                    day4: null,
                    day5: null,
                    day6: null,
                    day7: null
                })
                .then(this.context.addHabit(habit))
                .then(this.setState({
                    name: '',
                    description: ''
                }))
                .catch(res => {
                    this.setState({error: res.error})
                })
                .then(this.props.history.push('/overview'))
            })
    }

    render() {
        return(
            <div className="Add_Habit_Form">
                <div className = "page_title"><h2 className="title">Add a Habit</h2></div>
                <form className="add_habit" onSubmit={e => this.handleFormSubmit(e)}>
                    <label htmlFor="habit_name" className="add_habit_label">Habit Name </label>
                    <input id="habit_name" type="text" name="habit_name" className="add_habit_input" onChange={e => this.handleNameChange(e.target.value)} required/>
                    <label htmlFor="habit_description" className="add_habit_label">Habit description</label>
                    <input id="habit_description" type="text" name="habit_description" className="add_habit_input" onChange={e => this.handleDescChange(e.target.value)} required/>
                    <button type="submit" value="Add Habit" className="add_habit_input start"> Add Habit </button>
                </form>
            </div>
        )
    }
}

export default AddHabit
