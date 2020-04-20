import React from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from './Landing-Page/Landing-Page'
import AddHabit from './Add-Habit/Add-Habit';
import GraphSummary from './Graph-Summary/Graph-Summary';
import Overview from './Overview/Overview';
import LogHabit from './Log-Habit/Log-Habit';
import HabitPage from './Habit/Habit-Page';
import EditHabit from './Habit/Edit-Habit';
import {findDate} from './Habits-Helpers'
import ApiContext from './ApiContext'
import './App.css'
import dummyStore from './dummy-store';

class App extends React.Component {
  state = {
    habits: [],
    days: [],
    habitHistory: [],
    day: null
  }
  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
    setTimeout(() => this.setDate(), 2000)
    setTimeout(() => console.log(this.state), 5000)
  }
  renderMainRoutes() {
    return(
      <>
      <Route
        exact
        path = '/'
        component = {LandingPage} 
      />
      <Route
        path = '/add-habit'
        component = {AddHabit} 
      />
      <Route
        path = '/progress'
        component = {GraphSummary} 
      />
      <Route 
        path = '/overview'
        component = {Overview}
      />
      <Route 
        path = '/log-day'
        component = {LogHabit}
      />
      <Route 
        path = '/habit/:habitId'
        component = {HabitPage}
      />
      <Route 
        path = '/edit-habit/:habitId'
        component = {EditHabit}
      />
      </>
    )
  }
  handleDeleteHabits = () => {
    console.log('delete habits')
  }

  handleDeleteHabit = () => {
    console.log('delete habit')
  }

  handleNewWeek = () => {
    this.setFirstDay()
  }

  handleEditHabit = () => {
    console.log('edit habit')
  }

  setDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let {days} = this.context
    let foundDate = findDate(days, today)

    if(!foundDate) {
      if(!this.state.habitHistory.length) {
        this.setFirstDay()
        return
      } else {
        this.setState({
          day: 8
        })
      }
    } else {
      let day = foundDate.dayNumber
      this.setState({
        day
      })
    } 
  }

  setFirstDay = () => {
    this.setState({
      habitHistory: []
    })
    let newDays = this.state.days
    for(let i = 0; i < this.state.days.length; i++) {
      let today = new Date();
      let nextDay = new Date(today.setDate(today.getDate() + i));
      let dd = String(nextDay.getDate()).padStart(2, '0');
      let mm = String(nextDay.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      let stringDate = mm + '/' + dd + '/' + yyyy;
      newDays[i].date = stringDate
    }
    this.updateDays(newDays)
  }

  updateDays(newDays) {
    this.setState({
      days: newDays
    })
    this.setState({
      day: 1
    })
  }

  render() {
    const value = {
      habits: this.state.habits,
      days: this.state.days,
      habitHistory: this.state.habitHistory,
      day: this.state.day,
      deleteHabits: this.handleDeleteHabits,
      deleteHabit: this.handleDeleteHabit,
      newWeek: this.handleNewWeek,
      editHabit: this.handleEditHabit
    };
    return (
      <ApiContext.Provider value = {value}>
        <div className='App'>
          <nav className="navbar">
            <ul className ="nav_list">
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to='/overview'>Overview</Link>
              </li>
              <li>
                <Link to="/add-habit">Add Habit</Link>
              </li>
              <li>
                <Link to ="/log-day">Log Day</Link>
              </li>
              <li>
                <Link to = "/progress">Progress</Link>
              </li>
            </ul>
          </nav>
          <header>
            <Link to= "/overview"><h1>Habit Tracker</h1></Link>
          </header>
          <main>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
