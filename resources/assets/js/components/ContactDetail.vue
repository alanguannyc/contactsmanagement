<template>
    <div class="container" >
<button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#' + data.id" >
  view
</button>

<div class="modal fade bd-example-modal-lg" :id="data.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"></h5>
           
          
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
 
 

     <form autocomplete="off" id="new_contact">

        <div class="form-group autocomplete">
            <v-autocomplete :items="hotels" v-model="hotel" :get-label="getLabel" :component-item='template' @update-items="updateItems">
  </v-autocomplete>
                <!-- <label for="HotelInput">Hotel</label>
                <input type="text" class="form-control" v-model="hotel.name" id="hotel" name="hotel" placeholder="Enter Hotel" required> -->
                </div>
        
    <div class="form-group">
            <label for="contactName">Name</label>
            <input type="text" class="form-control" v-model="contact.name"  id="contactName" name="ContactName" placeholder="Enter Name" required>
            </div>
    <div class="form-group">
      <label for="contactEmail">Email address</label>
      <input type="email" class="form-control" v-model="contact.email" id="contactEmail" placeholder="name@example.com" required>
    </div>
    <div class="form-group">
      <label for="contactPosition">Position</label>
      <select class="form-control" id="contactPosition"  v-model="contact.position" name="contactPosition" placeholder="Please Select" required>
            <option></option>
        <option>General Managers</option>
        <option>Hotel Managers</option>
        <option>Front Office Director</option>
        <option>Director of HR</option>
        <option>Controller</option>
        <option>Director of Sales</option>
        <option>Food and Beverage Director</option>
        <option>Director of Marketing</option>
        <option>Director of Public Relations</option>
        <option>Director of Engineering/Chief Engineer</option>
        <option>Director of Security</option>
        <option>Director/Manager of Banquets</option>
        <option>Director of Revenue/Revenue Manager</option>
        <option>Purchase Manager</option>
        <option>Payroll Accounting</option>
        <option>Director of IT /Digital Space</option>
        <option>Others</option>
      </select>
    </div>
    <div class="form-group">
            <label for="contactTitle">Title</label>
            <input type="text" class="form-control"  v-model="contact.title" id="contactTitle" name="contactTitle" required placeholder="Enter Position Title">
            </div>
    <div class="form-group">
            <label for="contactPhone">Phone Number</label>
            <input type="text" class="form-control"  v-model="contact.phone" id="contactPhone" name="contactPhone" placeholder="Enter Phone Number">
            </div>
        
    <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="updateContact">Save changes</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="deleteContact">Delete</button>
    </div>
</form>
    </div>
    </div>
    </div>
    </div>
    </div>
   
    
</template>

<script>
import Autocomplete from 'vue2-autocomplete-js'
import HotelList from './HotelList.vue';
    export default {
        data() {
            return {
              contact : "",
              hotel : "",
              hotelName : "",
              hotels: [],
              template: HotelList
            }
        },
        props: {
                data: {
                        type: Object
                            }
                },

        mounted() {
                var app = this;
                var id = this.data.id;

                axios.get('../api/v1/hotel')
                .then(res=>{
                    app.hotels = res.data
                    
                    // var hotels = newdata.map(a => a.name);
                    
                })

                axios.get(`/api/v1/contact/${id}`)
                    .then(function (resp) {
                        app.contact = resp.data[0];
                        app.hotel = resp.data[0].hotel
                        app.hotelName = resp.data[0].hotel.name
                       
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        // alert("Could not load nominations");
                    });
                
            },
            
            
           
        methods: {
            getLabel (item) {
                return item.name
            },
            updateItems (text) {
                this.hotels = this.hotels.filter((item) => {
                return (new RegExp(text.toLowerCase())).test(item.name.toLowerCase())
            })

            },
            updateContact() {
                var app = this;
 
                var newContact = app.contact;
                newContact.id = app.data.id;
                if(app.hotel.name != app.hotelName) {
                                axios.post('../api/v1/hotel', app.hotel)
                                .then(res=>{
                                    
                                    newContact.hotel_id = res.data.id

                                        axios.post('../api/v1/contact/edit', newContact)
                                        .then(res => {
                                            
                                        })
                                })
                            } else {
                                
                                    axios.post('../api/v1/contact/edit', newContact)
                                    .then(res => { 

                                    })
                            }    
                 
            },
            deleteContact() {
                var app = this;
                var id = app.data.id;
                axios.delete(`/api/v1/contact/${id}`)
                .then(function (resp) {
                    console.log(resp.data);
                })
                .catch(function (resp) {
                    console.log(resp);
                });
               
            }
        }
    }
    </script>

<style>
.v-autocomplete
  .v-autocomplete-input-group
    .v-autocomplete-input{
      font-size: 1.2em;
      padding: 10px 15px;
      box-shadow: none;
      border: 1px solid #157977;
      width: calc(100% - 32px);
      outline: none;
      background-color: #eee
      }
    .v-autocomplete-selected
      .v-autocomplete-input
        {
            color: black;
        background-color: #f2fff2
        }
  .v-autocomplete-list
   { 
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #157977;
    }
    .v-autocomplete-list-item
      {cursor: pointer;
      background-color: #fff;
      padding: 10px;
      border-bottom: 1px solid #157977;
      border-left: 1px solid #157977;
      border-right: 1px solid #157977;
      }
      :last-child
       { 
           border-bottom: none
       }
      :hover
        {
            /* background-color: #eee */
            }

      abbr
        {
            opacity: 0.8;
        font-size: 0.8em;
        display: block;
        font-family :sans-serif;
        }
</style>
