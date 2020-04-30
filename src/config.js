require('dotenv').config()
export default {
    PORT: process.env.PORT || 8000,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "https://still-everglades-25442.herokuapp.com/api"
}