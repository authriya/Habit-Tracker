import React from 'react';
import {findHabit} from '../Habits-Helpers'
import ApiContext from '../ApiContext'

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
        const {habits} = this.context
        const habit = findHabit(habits, parseInt(habitId))

        console.log(habits)

        if(!habit) {
            return null
        }

        this.setState({
            name: habit.name,
            description: habit.description
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
            id:habitIdInteger,
            name: this.state.name,
            description: this.state.description
        }
        this.context.editHabit(updatedHabit)
        this.props.history.push('/overview')
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
