import React from 'react';
import './Graph-Summary.css'

class GraphSummary extends React.Component {
    render() {
        return(
            <div className="Graph_Summary">
                <div className="page_title"><h2 className="title">Your Progress</h2></div>
                <div className="graph_summary_main">
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
                            <tr>
                                <td> Habit 1 </td>
                                <td className="yes"/>
                                <td/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td/>
                                <td className="yes"/>
                            </tr>
                            <tr>
                                <td> Habit 2 </td>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td/>
                                <td className="yes"/>
                            </tr>
                            <tr>
                                <td> Habit 3 </td>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td/>
                                <td/>
                                <td className="yes"/>
                            </tr>
                            <tr>
                                <td> Habit 4 </td>
                                <td/>
                                <td/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                            </tr>
                            <tr>
                                <td> Habit 5 </td>
                                <td className="yes"/>
                                <td/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td className="yes"/>
                                <td/>
                                <td className="yes"/>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default GraphSummary
