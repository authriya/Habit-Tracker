import React from 'react';
import ApiContext from '../ApiContext'
import './Add-Habit.css'
import HabitsApiService from '../Services/habits-api-service';

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
        }
        this.setState({error: null})
        HabitsApiService.postHabit(habit)
            .then(this.context.addHabit(habit))
            .then(() => {setTimeout(
                this.setState({
                    name: '',
                    description: ''
                }), 1000
            )})
            .catch(res => {
                this.setState({error: res.error})
            })
            .then(this.props.history.push('/overview'))
    }

    render() {
        return(
            <div className="Add_Habit_Form">
                <div className = "page_title"><h2 className="title">Add a Habit</h2></div>
                <form className="add_habit" onSubmit={e => this.handleFormSubmit(e)}>
                    <label htmlFor="habit_name" className="add_habit_label">Habit Name </label>
                    <input id="habit_name" type="text" name="habit_name" className="add_habit_input" onChange={e => this.handleNameChange(e.target.value)}/>
                    <label htmlFor="habit_description" className="add_habit_label">Habit description</label>
                    <input id="habit_description" type="text" name="habit_description" className="add_habit_input" onChange={e => this.handleDescChange(e.target.value)}/>
                    <button type="submit" value="Add Habit" className="add_habit_input"> Add Habit </button>
                </form>
            </div>
        )
    }
}

export default AddHabit
