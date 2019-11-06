<template>
    <div class="viewProfile container">
        <div v-if="profile" class="card">
            <h2 class="yellowText center">{{profile.alias}}'s Profile</h2>
            <ul class="comments collection">
                <li v-for="(comment, index) in comments" :key="index">
                    <div class="yellowText">
                        {{ comment.from }}
                    </div>
                    <div class="grey-text text-darken-2">
                        {{ comment.content }}
                    </div>
                </li>
            </ul>
            <form @submit.prevent="addPost">
                <div class="field">
                    <label for="comment">Add a comment</label>
                    <input type="text" name="comment" v-model="newComment">
                    <p class="red-text center">{{ feedback }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init"
import firebase from "firebase"
export default {
    name: "ViewProfile",
    data(){
        return{
            profile: null,
            newComment: null,
            feedback: null,
            user: null,
            comments: []
        }
    },
    methods: {
        addPost(){
            if(this.newComment){
                this.feedback = null
                db.collection("comments").add({
                    to: this.$route.params.id,
                    from: this.user.alias,
                    content: this.newComment,
                    time: Date.now()
                }).then(() => {
                    this.newComment = null
                })
            }
            else{
                this.feedback = "You must enter some text to add a comment"
            }
        }
    },
    created(){
        let ref = db.collection("users")

        //get current user
        ref.where("userId", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data()
                this.user.id = doc.id
            })
        })

        //profile data
        ref.doc(this.$route.params.id).get().then(user => {
            this.profile = user.data()
        })

        //get comments and posts
        db.collection("comments").where("to", "==", this.$route.params.id).onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change => {
                if(change.type == "added"){
                    this.comments.unshift({
                        from: change.doc.data().from,
                        content: change.doc.data().content
                    })
                }
            })
        })
    }
}
</script>

<style>
    .viewProfile .card{
        padding: 20px;
        margin-top: 60px;
    }
    .viewProfile h2{
        font-size: 2em;
        margin-top: 0;
    }
    .viewProfile li{
        padding: 10px;
        border-bottom: 1px solid #eee
    }
</style>