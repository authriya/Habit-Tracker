export const findHabit = (habits = [], habitId) =>
    habits.find(habit => habit.id === habitId)