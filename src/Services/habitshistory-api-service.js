import config from '../config'

const HabitsHistoryApiService = {
    getHistory() {
        return fetch(`${config.API_BASE_URL}/habithistory`)
            .then((history) =>
                (!history.ok)
                    ? history.json().then(e => Promise.reject(e))
                    : history.json()
            )
    }
}

export default HabitsHistoryApiService