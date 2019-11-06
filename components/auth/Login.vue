<template>
    <div class="screen">
        <div>
            <img src="@/assets/desktop.svg"/>
        </div>
        <div class="login container right">
            <form @submit.prevent="login" class="card-panel">
                <h2 class="center yellowText">Log In</h2>
                <div class="field">
                    <label for="email">Email:</label>
                    <input type="email" name="email" v-model="email">
                </div>
                <div class="field">
                    <label for="password">Password:</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <p class="red-text center">{{ feedback }}</p>
                <div class="field">
                    <button class="btn yellowBackground">Log In</button>
                </div>
            </form>
        </div>
        <div class="missionStatement">
            <p>Meet and connect with people<br/>
                from all over the world</p>
        </div>
    </div>
</template>

<script>
import firebase from "firebase"
export default {
    name: "Login",
    data(){
        return{
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login(){
            if(this.email && this.password){
                this.feedback = null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(cred => {
                    this.$router.push({ name: "GMap" })
                }).catch(err => {
                    this.feedback = err.message
                })
            }
            else{
                this.feedback = "Please fill in both fields"
            }
        }
    }
}
</script>

<style>
    .screen{
        display: grid;
        grid-template-columns: 2.5fr 1fr
    }
    .screen img{
        width: 45vw;
        margin: 5% 15%;
    }
    .login{
        max-width: 40vw;
        margin: 13% -12.5%;
    }
    .login h2{
        font-size: 2.4em
    }
    .login .field{
        margin-bottom: 16px;
    }
    .missionStatement{
        margin-top: -15%;
        margin-left: 3%;
        line-height: 30px;
        font-size: 1.7rem;
    }
    .yellowText{
        color: #ffc107
    }
    .yellowBackground:hover{
        background: #E6AE06
    }
    .yellowBackground{
        background: #ffc107
    }
    .yellowBackground:focus{
        background:  #ffc107
    }
</style>