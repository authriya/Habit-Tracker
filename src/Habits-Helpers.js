export const findHabit = (habits = [], habitId) =>
    habits.find(habit => habit.id === habitId)

export const findDate = (days = [], date) =>
    days.find(day => day.date === date)
