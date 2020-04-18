import React from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from './Landing-Page/Landing-Page'
import AddHabit from './Add-Habit/Add-Habit';
import GraphSummary from './Graph-Summary/Graph-Summary';
import Overview from './Overview/Overview';
import LogHabit from './Log-Habit/Log-Habit';
import HabitPage from './Habit/Habit-Page';
import EditHabit from './Habit/Edit-Habit';
import ApiContext from './ApiContext'
import './App.css'
import dummyStore from './dummy-store';

class App extends React.Component {
  state = {
    habits: []
  }
  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600)
    setTimeout(() => console.log(this.state), 1000)
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
    console.log('new week')
  }

  handleEditHabit = () => {
    console.log('edit habit')
  }

  render() {
    const value = {
      habits: this.state.habits,
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
