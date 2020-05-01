import React from 'react';
import ApiContext from '../ApiContext';
import {Link} from 'react-router-dom';
import './Habit-Page.css'
import HabitsApiService from '../Services/habits-api-service';

class HabitPage extends React.Component {
    state = {
        name: '',
        description: ''
    }
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext

    componentDidMount() {
        const {habitId} = this.props.match.params
        const habitIdInteger = parseInt(habitId) 
        HabitsApiService.getHabitById(habitIdInteger)
            .then(habit => {
                this.setState({
                    name: habit.name,
                    description: habit.description
                })
            })
            .catch((error) => {
                console.error({error})
            })
    }

    handleDeleteHabit = e => {
        e.preventDefault()
        const {habitId} = this.props.match.params
        const habitIdInteger = parseInt(habitId)
        HabitsApiService.deleteAHabit(habitIdInteger)
            .then(() => {
                this.context.deleteHabit(habitIdInteger)
                this.props.history.push('/overview')
            })
            .catch((error) => {
                console.error({error})
            })
    }

    render() {
        const {name, description} = this.state
        const {habitId} = this.props.match.params
        return(
            <div className="Habit_Page">
                <Link to ={`/overview`}><button className = "back_button"><i className = "fas fa-chevron-left"></i>Overview</button></Link>
                <h2 className="habit_title">{name}</h2>
                <p className="habit_description">{description}</p>
                <Link to ={`/edit-habit/${habitId}`}><input type="button" value="Edit Habit" className="habit_page_button start"/></Link><input type="button" value="Delete Habit" className="habit_page_button delete" onClick = {this.handleDeleteHabit}/>
            </div>
        )
    }
}

export default HabitPage
