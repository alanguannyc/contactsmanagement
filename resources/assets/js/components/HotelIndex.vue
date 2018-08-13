<template>
    <div class="container">
         <div class="row">
            <div class="col-md-9 col-sm-12 col-xs-12">
                <div class="x_panel tile ">
                <div class="x_title">
        <table class="table table-hover">
        <thead>
                <tr>
                <th scope="col"><h5><strong></strong></h5></th>
                <th scope="col"><h5><strong>Name</strong></h5></th>
                <th scope="col"><h5><strong>Position</strong></h5></th>
                <th scope="col"><h5><strong>Title</strong></h5></th>
                <th scope="col"><h5><strong>Email</strong></h5></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts" v-bind:key="contact.id" >
                <td> <contact-detail :data="contact">  
                                        </contact-detail>
                </td>
                <td ><h5>{{ contact.name }}</h5></td>
                <td><h5>{{ contact.position}}</h5></td>
                <td>{{ contact.title}}</td>
                <td>{{ contact.email}}</td>
                </tr>
            </tbody>
        </table>
                </div>
                </div>
            </div>
        
            <div class="col-md-3 col-sm-12 col-xs-12">
                <div class="x_panel tile ">
                    <div class="x_title">
                        <h2>{{ hotel.name }}</h2>
                    <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <ul class="list-group">             
                            <li v-if="hotel.address" class="list-group-item">{{ hotel.address }}</li>
                        </ul>
                    </div>
                    </div>
            </div>
         </div>
    </div>
</template>

<script>
var _ = require('lodash');
    export default {
        data(){
            return {
                contacts:'',
                hotel:''
            }
        },
        watch: {
        contacts: function (){
                        this.debouncedGetAnswer()
                        
                        }

                    },
        created: function () {
        
            this.debouncedGetAnswer = _.debounce(this.getUpdate, 3500)

        },
        mounted() {
            var app = this;
            var url = purl(window.location.href)
            var id= url.segment(-1)
            
            axios.get(`../api/v1/hotel/${id}`)
                .then(res=>{
                    this.hotel = res.data[0]
                    this.contacts = res.data[0].contacts
                    
                }).then(
                )
                .catch(function(err){
                    console.log(err);
                });

        },
        methods:{
            getUpdate(){
                var app = this;
                var url = purl(window.location.href)
                var id=url.segment(-1)
                axios.get(`../api/v1/hotel/${id}`)
                .then(res=>{
                    this.hotel = res.data[0]
                    this.contacts = res.data[0].contacts
                    
                }).then(
                )
                .catch(function(err){
                    console.log(err);
                });
            },
        }
        
    }
</script>
