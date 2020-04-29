import config from '../config'

const DaysApiService = {
    getDays() {
        return fetch(`${config.API_BASE_URL}/days`)
            .then((days) => 
                (!days.ok)
                    ? days.json().then(e => Promise.reject(e))
                    : days.json()
            )
    }
}

export default DaysApiService