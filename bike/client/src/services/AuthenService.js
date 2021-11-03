import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('register', credentials)
    },    
    clientLogin(credentials) {
        return Api().post('front/login', credentials)
    }
}