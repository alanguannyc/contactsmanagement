<template>
    <div class="container">
        <table class="table table-hover">
        <thead>
                <tr>
                <th scope="col"><h5><strong>Name</strong></h5></th>
                <th scope="col"><h5><strong>Position</strong></h5></th>
                <th scope="col"><h5><strong>Title</strong></h5></th>
                <th scope="col"><h5><strong>Email</strong></h5></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts" v-bind:key="contact.id" >
                <td ><h5>{{ contact.name }}</h5></td>
                <td><h5>{{ contact.position}}</h5></td>
                <td>{{ contact.title}}</td>
                <td>{{ contact.email}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                contacts:{}
            }
        },
        mounted() {
            var app = this;
            var url = purl(window.location.href)
            var id= url.segment(-1)
            
            axios.get(`../api/v1/hotel/${id}`)
                .then(res=>{
                    this.contacts = res.data[0].contacts
                    console.log(res.data[0].contacts)
                }).then(
                )
                .catch(function(err){
                    console.log(err);
                });

        }
    }
</script>
