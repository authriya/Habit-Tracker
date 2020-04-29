import config from '../config'

const HabitsHistoryApiService = {
    getHistory() {
        return fetch(`${config.API_BASE_URL}/habithistory`)
            .then((history) =>
                (!history.ok)
                    ? history.json().then(e => Promise.reject(e))
                    : history.json()
            )
    },
    getHistoryById(habitId) {
        return fetch(`${config.API_BASE_URL}/habithistory/${habitId}`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postHistory(history) {
        return fetch(`${config.API_BASE_URL}/habithistory`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                history
            )
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deleteHistory() {
        return fetch(`${config.API_BASE_URL}/habithistory`, {
            method: 'DELETE'
        })
    },
    patchHistory(newHistory) {
        return fetch(`${config.API_BASE_URL}/habithistory`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                newHistory
            )
        })
    }

}

export default HabitsHistoryApiService