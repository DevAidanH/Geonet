<template>
    <div class="navBar">
        <nav class="header">
            <div class="container">
               <router-link :to="{ name: 'GMap'}" class="brand-logo left">Geonet</router-link>
                <ul class="right">
                    <li v-if="!user"><router-link :to="{ name: 'Signup'}">Sign Up</router-link></li>
                     <li v-if="!user"><router-link :to="{ name: 'Login'}">Log In</router-link></li>
                     <li v-if="user" class="alias" v-on:click="ownProfile()">{{ currentUser && currentUser.alias }}</li>
                      <li><router-link :to="{ name: 'Mission'}">Our Mission</router-link></li>
                    <li v-if="user"><a @click="logout">Log Out</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from "firebase"
import db from "@/firebase/init"
export default {
    name: "NavBar",
    data (){
        return{
            user: null,
            userAlias: null,
            currentUser: null,
            id: null
        }
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: "Login" })
            })
        },
        ownProfile(){
            this.$router.push({name: "ViewProfile", params: {id: this.id}})
        }
    },
    mounted(){
        //let user = firebase.auth().currentUser
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.user = user
                db.collection("users").where("userId", "==", user.uid).get().then(snapshot => {
                    snapshot.forEach((doc) => {
                        this.currentUser = doc.data()
                        this.id = doc.id
                    })
            })}
            else{
                this.user = null
            }
        })
    }
}
</script>

<style>
    .navBar .alias{
        margin-right: 20px;
        cursor: pointer;
    }
    .header{
        background: #ffc107;
    }     
</style>