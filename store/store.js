import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {API_URL} from "../http";

export default class Store {
    user = {};
    userInfo={};
    isAuth = false;
    isLoading = false;
    isActivated = false;
    status=1;
    constructor () {
        makeAutoObservable(this)
    }


    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }
    setStatus(int){
        this.status = int
    }
    setActivated(bool){
        this.isActivated = bool
    }
    setUserInfo(userInfo){
        this.userInfo = userInfo
    }
    async login(email, password){
        try {
            const response = await AuthService.login(email, password);
            window.localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(email, password, nickname) {
        try {
            const response = await AuthService.registration(email, password, nickname);
            this.setStatus(response.status)
            this.setUser(response.data);
        } catch (e) {
            console.log(e);
        }
    }


    async logout(){
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e);
        }
    }


    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/refresh`, {withCredentials: true})
            console.log(response);
            window.localStorage.setItem('token', response.data.accessToken);
            this.setActivated(response.data.userInfo.isActivated)
            this.setAuth(true);
            this.setUser(response.data.userInfo)
            this.setUserInfo(response.data.userAbout)
        } catch (e) {
            console.log(e);
            
        } finally {
            this.setLoading(false)
        }
    }

}