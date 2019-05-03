const API = 'http://localhost:3000';

let app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        postJson(url,data){
            return fetch(url,{
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data),
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        putJson(url,data){
            return fetch(url,{
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data),
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        deleteJson(url,data){
            return fetch(url,{
                method: "delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data),
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted(){
        //console.log(this.$refs)
    }
});

