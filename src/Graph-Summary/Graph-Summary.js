import React from 'react';
import ApiContext from '../ApiContext';
import {Link} from 'react-router-dom'
import {findHabit} from '../Habits-Helpers'
import './Graph-Summary.css'

class GraphSummary extends React.Component {

    static contextType = ApiContext

    render() {
        let {habitHistory} = this.context
        let {habits} = this.context

        let habitWarning

        if(habits.length === 0) {
            habitWarning = <p className = "habit_warning">Uh oh! Looks like you haven't added a habit yet. Please click <Link to = '/add-habit'>here</Link> to add a habit</p>
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
                                    <td>{findHabit(habits, row.habit).name}</td>
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
