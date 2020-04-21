
import React from 'react'

export default React.createContext({
  habits: [],
  days: [],
  habitHistory: [],
  day: null,
  deleteHabits: () => {},
  deleteHabit: () => {},
  editHabit: () => {},
  newWeek: () => {},
  addHabit: () => {},
  logDay: () => {},
})