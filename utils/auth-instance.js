import axios from 'axios'

const baseURL = 'http://localhost:3000/api/v1/'

const instance = axios.create({
    baseURL: baseURL,
    timeout: 15000
})

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
instance.defaults.headers.put['Content-Type'] =
  'application/x-www-form-urlencoded'

instance.interceptors.response.use(
    function (response) {
    // Do something with response data
        return response
    },
    function (error) {
        if (typeof error.response === 'undefined') {
            return null
        } else if (error.response.status === 401 || error.response.status === 403) {
            return error
        } else if (error.response.status === 400) {
            return error.response
        }
        try {
            alert(error)
            return error
        } catch (e) {
            return e
        }
    }
)

export default instance
