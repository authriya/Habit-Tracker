
import React from 'react'

export default React.createContext({
  habits: [],
  deleteHabits: () => {},
  deleteHabit: () => {},
  editHabit: () => {},
  newWeek: () => {},
})