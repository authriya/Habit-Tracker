import config from '../config'

const HabitsApiService = {
    getHabits() {
        return fetch(`${config.API_BASE_URL}/habits`)
            .then((habits) =>
                (!habits.ok)
                    ? habits.json().then(e => Promise.reject(e))
                    : habits.json()
            )
    },
    getHabitById(habitId) {
        return fetch(`${config.API_BASE_URL}/habits/${habitId}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postHabit(habit) {
        return fetch(`${config.API_BASE_URL}/habits`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                habit
            )
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    :res.json()
            )
    },
    deleteAllHabits() {
        return fetch(`${config.API_BASE_URL}/habits`, {
            method: 'DELETE'
        })
    },
    deleteAHabit(habitId){
        return fetch(`${config.API_BASE_URL}/habits/${habitId}`, {
            method: 'DELETE'
        })
    },
    patchHabit(habit, habitId){
        return fetch(`${config.API_BASE_URL}/habits/${habitId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                habit
            )
        })
    }
}

export default HabitsApiService