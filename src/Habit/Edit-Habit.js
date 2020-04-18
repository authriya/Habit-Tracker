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
        console.log(this.state.name)
        console.log(this.state.description)
        e.preventDefault();
        console.log('hi')
        this.context.editHabit()
    }


    render() {
        return(
            <div className="Edit_Habit_Form">
                <div className = "page_title"><h2 className="title">Edit Habit</h2></div>
                <form className="edit_habit_form">
                    <label htmlFor="habit_name" className="add_habit_label">Habit Name </label>
                    <input id="habit_name" type="text" name="habit_name" className="add_habit_input" value={this.state.name} onChange = {e => this.nameChange(e.target.value)}/>
                    <label htmlFor="habit_description" className="add_habit_label">Habit description</label>
                    <input id="habit_description" type="text" name="habit_description" className="add_habit_input" value={this.state.description} onChange = {e => this.descChange(e.target.value)}/>
                    <input type="button" value="Submit Edit" className="add_habit_input" onClick={e => this.handleEditSubmit(e)}/>
                </form>
            </div>
        )
    }
}

export default EditHabit
