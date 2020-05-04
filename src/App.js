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
import HabitsApiService from './Services/habits-api-service'
import DaysApiService from './Services/days-api-service'
import HabitsHistoryApiService from './Services/habitshistory-api-service'
import Collapsible from 'react-collapsible'
import './App.css'

class App extends React.Component {
  state = {
    habits: [],
    days: [],
    habitHistory: [],
    day: null
  }
  componentDidMount() {
    HabitsApiService.getHabits()
      .then((habits) => {
        DaysApiService.getDays()
          .then((days) =>{
            //GET days then set the day in context
            this.setDate() 
            HabitsHistoryApiService.getHistory().then((habitHistory) => {
              this.setState({
                habits, days, habitHistory
              })
            })
          })
      })
      .catch((error) => {
        console.error({ error })
      })
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
    HabitsApiService.deleteAllHabits()
      .then(() => {
        HabitsHistoryApiService.deleteHistory()
          .then(() => {
            this.setState({
              habits: [],
              habitHistory: []
            })
          })
      })
  }

  handleDeleteHabit = (habitId) => {
    this.setState({
      habits: this.state.habits.filter(habit => habit.id !== habitId),
      habitHistory: this.state.habitHistory.filter(log => log.habit !== habitId)
    })
  }

  handleNewWeek = () => {
    this.setFirstDay()
  }

  handleEditHabit = (updatedHabit) => {
    let habits = this.state.habits.map(function(e, i){
      if(e.id === updatedHabit.id) {
        return updatedHabit
      }
      return e
    });

    this.setState({
      habits
    })
  }

  handleAddHabit = (habit) => {
    let habitHistoryId;
    if(this.state.habitHistory.length === 0) {
      habitHistoryId = 1
    } else {
      habitHistoryId = this.state.habitHistory[this.state.habitHistory.length - 1].id + 1
    }
    this.setState({
      habits: [...this.state.habits, habit]
    })
    this.setState({
      habitHistory: [...this.state.habitHistory, {
        id: habitHistoryId,
        habit: habit.id,
        day1: false,
        day2: false,
        day3: false,
        day4: false,
        day5: false,
        day6: false,
        day7: false
      }]
    })
  }

  handleLogDay = (habitHistory) => {
    this.setState({
      habitHistory
    })
  }

  setDate = () => {
    //get new date for today
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let {days} = this.state;
    //find date in state
    let foundDate = findDate(days, today);

    if(!foundDate) {
      //if date is not found in state
      if(!this.state.habitHistory.length) {
        //if history has no length, then treat this as the first day
        this.setFirstDay()
        return
      } else {
        //if there is a history of habits, assume previous week is over
        this.setState({
          day: 8
        })
      }
    } else {
      //if found then set the day in the state as the dayNumber for that date
      let day = foundDate.dayNumber;
      this.setState({
        day
      })
    } 
  }

  setFirstDay = () => {
    let newHabitHistory = this.state.habitHistory;

    function loopOverHabits(newHabitHistory) {
      for(let i = 0; i < newHabitHistory.length; i++) {
        for(let j = 1; j<= 7; j++) {
          newHabitHistory[i][`day${j}`] = false
        }
      }
      return newHabitHistory
    };

    if(newHabitHistory.length) {
      //if the history has habits in it then loop over it and set all habit/day
      //values to false so that there is technically no history of habit logging
      loopOverHabits(newHabitHistory);
      HabitsHistoryApiService.patchHistory(newHabitHistory)
      .then(
        this.setState({
          habitHistory: newHabitHistory
        })
      )
      .catch(error => {
        console.error({error})
      })
    }

    setTimeout(() => {
      //update days by setting current date as the first date and then looping over
      //array and setting dates for the next week
      let newDays = this.state.days;
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
    }, 1000);
    
  }

  updateDays(newDays) {
    DaysApiService.patchDays(newDays)
      .then(() => {
        this.setState({
          days: newDays,
          day: 1
        })
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
      editHabit: this.handleEditHabit,
      addHabit: this.handleAddHabit,
      logDay: this.handleLogDay
    };

    return (
      <ApiContext.Provider value = {value}>
        <div className='App'>
          <div className="navbar">
            <Collapsible trigger = {<><span className="nav-title">Menu</span><i className="fas fa-chevron-down"></i></>}
              triggerWhenOpen = {<><span className="nav-title">Menu</span><i className="fas fa-chevron-up"></i></>}
            >
              <ul className= 'nav-list'>
                  <li className="nav-item">
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
            </Collapsible>
          </div>
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
