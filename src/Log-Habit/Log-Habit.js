import React from 'react';
import {Link} from 'react-router-dom';
import ApiContext from '../ApiContext';
import './Log-Habit.css';

class LogHabit extends React.Component {
    state = {
        habitHistory: []
    }
    static contextType = ApiContext
    
    componentDidMount() {
        const {habitHistory = []} = this.context
        this.setState({
            habitHistory
        })
        setTimeout(() => console.log(this.state), 700)
    }

    getCheckBoxValue(habitId) {
        const {habitHistory} = this.state;
        const {day}= this.context
        if(day > 7) {
            return false
        } else {
            let log = habitHistory.find(log => log.habit === habitId)
            if(!log) {
                return false
            } else {
                return log[`day${day}`]
            }
        }
    }

    handleCheckBoxChange(habitId) {
        const {habitHistory} = this.state
        const {day} = this.context

        let newHabitHistory = habitHistory
        if(day > 7) {
            return
        } else {
            let index = newHabitHistory.findIndex(log => log.habit === habitId)
            if(index === undefined) {
                return
            } else {
                let newValue = !newHabitHistory[index][`day${day}`]
                newHabitHistory[index][`day${day}`] = newValue
                this.setState({
                    habitHistory: newHabitHistory
                })
            }
        }
    }

    handleChangeWeek() {
        this.context.newWeek()
        this.setState({
            habitHistory: this.context.habitHistory
        })
    }

    handleSubmit(e) {
        const {habitHistory} = this.state
        e.preventDefault()
        this.context.logDay(habitHistory)
        this.props.history.push('/progress')
    }

    render() {
        const {habits = []} = this.context
        const {day} = this.context
        
        let habitWarning

        let dayWarning

        if(habits.length === 0) {
            habitWarning = <p className = "habit_warning">Uh oh! Looks like you haven't added a habit yet. Please click <Link to = '/add-habit'>here</Link> to add a habit</p>
        }

        if(day > 7) {
            dayWarning = <div className="day_warning_section"><p className = "day_warning">Whoops- looks like you're out of days. Please click the button below to start a new week </p> <input type="button" value="Start New Week" className="overview_button" onClick={e => this.handleChangeWeek()}/></div>
        }

        return(
            <div className="Log_Habit_Form">
                <div className="page_title"><h2 className="title">Log Habits For The Day</h2></div>
                <div className = "page_subheading"><h3 className="subheading">Habits for Day {day} </h3></div>
            <form className="day_tracker" onSubmit={e => this.handleSubmit(e)}>
                {habitWarning}
                {dayWarning}
                {habits.map(habit => 
                    <label htmlFor={`habit_${habit.id}`} key = {habit.id} className="log_habit_label"> {habit.name}
                        <input type="checkbox" id={`habit_${habit.id}`} name={`habit_${habit.id}`} className="log_habit_input"
                            checked={this.getCheckBoxValue(habit.id)}
                            onChange={e => this.handleCheckBoxChange(habit.id)}
                        />
                    </label>
                )}
                {habits.length !== 0 && day <= 7 ? <button className="log_habit_input" value="submit">Submit</button> : null}
            </form>
        </div>
        )
    }
}

export default LogHabit
