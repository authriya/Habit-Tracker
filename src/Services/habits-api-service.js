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
}

export default HabitsApiService