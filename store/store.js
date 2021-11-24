import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import $api, {API_URL} from "../http";

export default class Store {
    user = {};
    userInfo={};
    posts=[];
    userPosts=[]
    friends=[];
    isAuth = false;
    isLoading = false;
    isActivated = false;
    status=1;
    stat='Friends';
    post=0;
    commentView= false;
    userProfile={}
    sendingStatus = false;
    userFriends =[];
    profilePages = 'MainProfile'
    currentUser =0
    friendStatus = false;
    requested = []
    constructor () {
        makeAutoObservable(this)
    }

    setProfilePages(page) {
        this.profilePages = page
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
    setPosts(posts){
        this.posts = posts
    }
    setFriends(friends){
        this.friends = friends
    }
    setRequested(friends){
        this.requested = friends
    }
    setStat(stat){
        this.stat = stat
    }
    setPost(post){
        this.post= post
    }
    setUserPosts(post){
        this.userPosts = post
    }
    setCommentView(bool){
        this.commentView = bool
    
    }
    setUserProfile(user) {
        this.userProfile = user
    }
    setUserFriends(friends) {
        this.userFriends = friends
    }
    setCurrentUser(user) {
        this.currentUser = user
    }
    setFriendStatus(bool) {
        this.friendStatus =bool
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
            window.localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e);
        }
    }

    async getUser(user){
        this.setLoading(true)
        try {
            const response = await $api.post('/get-user',{
                user: user
            })
            this.setUserProfile(response.data.user)
            this.setUserFriends(response.data.user.friends)

        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/refresh`, {withCredentials: true})
            window.localStorage.setItem('token', response.data.accessToken);
            this.setActivated(response.data.userInfo.isActivated)
            this.setAuth(true);
            this.setUser(response.data.userInfo)
            this.setUserInfo(response.data.userAbout)
            this.setFriends(response.data.userAbout.friends)
            console.log();
        } catch (e) {
            console.log(e);
            
        } finally {
            this.setLoading(false)
        }
    }
    async getPosts(){
        this.setLoading(true)
        try {
            const response = await axios.get(`http://localhost:3000/api/posts`, {withCredentials: true})
            this.setPosts(response.data.posts)
        } catch(e){
            console.log(e);
        } finally {
            this.setLoading(false)

        }
    }
}