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
                <label for="HotelInput">Hotel</label>
                <input type="text" class="form-control" v-model="hotel.name" id="hotel" name="hotel" placeholder="Enter Hotel" required>
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
    export default {
        data() {
            return {
              contact : "",
              hotel : "",
              hotelName : ""
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
            
            updateContact() {
                var app = this;
                
                

                
                // delete newContact.hotel; 
                // console.log(newContact)
                // axios.post(`/api/v1/contact/edit`, newContact)
                //     .then(function (resp) {
                //     })
                //     .catch(function (resp) {
                //         console.log(resp);
                //     });
                var newContact = app.contact;
                newContact.id = app.data.id;
                if(app.hotel.name != app.hotelName) {
                                axios.post('../api/v1/hotel', app.hotel)
                                .then(res=>{
                                    
                                    newContact.hotel_id = res.data.id
                                        axios.post('../api/v1/contact', newContact)
                                        .then(res => {
                                            
                                        }).then(res => {
                                            var uid = newContact.id
                                            axios.delete(`../api/v1/contact/${uid}`)
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

