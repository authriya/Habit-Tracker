import React from 'react';
import {findHabit} from '../Habits-Helpers'
import ApiContext from '../ApiContext'
import HabitsApiService from '../Services/habits-api-service';

class EditHabit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        }
    }
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = ApiContext

    componentDidMount() {
        const {habitId} = this.props.match.params

        HabitsApiService.getHabitById(habitId)
            .then((habit) => {
                this.setState({
                    name: habit.name,
                    description: habit.description
                })
            })
            .catch((error) => {
                console.error({error})
            })
    }

    nameChange(name) {
        this.setState({
            name
        })
    }

    descChange(description) {
        this.setState({
            description
        })
    }

    handleEditSubmit(e) {
        e.preventDefault()
        const {habitId} = this.props.match.params
        const habitIdInteger = parseInt(habitId)
        
        const updatedHabit = {
            name: this.state.name,
            description: this.state.description
        }

        HabitsApiService.patchHabit(updatedHabit, habitIdInteger)
            .then(this.context.editHabit(updatedHabit))
            .catch(error => {
                console.error({error})
            })
            .then(this.props.history.push('/overview'))
    }


    render() {
        return(
            <div className="Edit_Habit_Form">
                <div className = "page_title"><h2 className="title">Edit Habit</h2></div>
                <form className="edit_habit_form" onSubmit = {e=> this.handleEditSubmit(e)}>
                    <label htmlFor="habit_name" className="add_habit_label">Habit Name </label>
                    <input id="habit_name" type="text" name="habit_name" className="add_habit_input" value={this.state.name} onChange = {e => this.nameChange(e.target.value)}/>
                    <label htmlFor="habit_description" className="add_habit_label">Habit description</label>
                    <input id="habit_description" type="text" name="habit_description" className="add_habit_input" value={this.state.description} onChange = {e => this.descChange(e.target.value)}/>
                    <button type = "submit" value="Submit Edit" className="add_habit_input"> Submit Edit </button>
                </form>
            </div>
        )
    }
}

export default EditHabit
