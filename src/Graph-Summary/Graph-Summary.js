import React from 'react';
import ApiContext from '../ApiContext';
import {Link} from 'react-router-dom'
import {findHabit} from '../Habits-Helpers'
import './Graph-Summary.css'
import HabitsApiService from '../Services/habits-api-service';
import HabitsHistoryApiService from '../Services/habitshistory-api-service';

class GraphSummary extends React.Component {

    state = {
        habits: [],
        habitHistory: []
    }

    static contextType = ApiContext

    componentDidMount() {
        HabitsApiService.getHabits()
            .then((habits) => {
                return HabitsHistoryApiService.getHistory().then((habitHistory) => {
                    this.setState({
                        habits,
                        habitHistory
                    })
                })
            })
            .catch((error) => {
                console.error({error})
            })
    }

    render() {
        let {habitHistory} = this.state
        let {habits} = this.state

        let habitWarning

        if(habits.length === 0) {
            habitWarning = <p className = "habit_warning">Uh oh! Looks like you haven't added a habit yet. Please click <Link to = '/add-habit'>here</Link> to add a habit</p>
        }

        if(habits.length && habitHistory.length === 0) {
            habitWarning = <p className = "habit_warning">Looks like you haven't logged your day yet. Please click <Link to = '/log-day'>here</Link> to log your day</p>
        }

        return(
            <div className="Graph_Summary">
                <div className="page_title"><h2 className="title">Your Progress</h2></div>
                <div className="graph_summary_main">
                    {habitWarning}
                    <table>
                        <thead>
                            <tr>
                                <th>Habit</th>
                                <th>Day 1</th>
                                <th>Day 2</th>
                                <th>Day 3</th>
                                <th>Day 4</th>
                                <th>Day 5</th>
                                <th>Day 6</th>
                                <th>Day 7</th>
                            </tr>
                        </thead>
                        <tbody>
                            {habitHistory.map(row => 
                                <tr key={row.id}>
                                    <td><Link to ={`/habit/${row.habit}`}>{findHabit(habits, row.habit).name}</Link></td>
                                    {row.day1 ? <td className="yes"/> : <td/>}
                                    {row.day2 ? <td className="yes"/> : <td/>}
                                    {row.day3 ? <td className="yes"/> : <td/>}
                                    {row.day4 ? <td className="yes"/> : <td/>}
                                    {row.day5 ? <td className="yes"/> : <td/>}
                                    {row.day6 ? <td className="yes"/> : <td/>}
                                    {row.day7 ? <td className="yes"/> : <td/>}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default GraphSummary
