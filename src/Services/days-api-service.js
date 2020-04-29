import config from '../config'

const DaysApiService = {
    getDays() {
        return fetch(`${config.API_BASE_URL}/days`)
            .then((days) => 
                (!days.ok)
                    ? days.json().then(e => Promise.reject(e))
                    : days.json()
            )
    },
    deleteDays() {
        return fetch(`${config.API_BASE_URL}/days`, {
            method: 'DELETE'
        })
    },
    postDays(newDays) {
        return fetch(`${config.API_BASE_URL}/days`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                newDays
            ),
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e=> Promise.reject(e))
                    : res.json()
            )
    }
}

export default DaysApiService