
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});




// datatable format
function format ( d ) {
    if(d.profile==null) {
        d.profile="Not set" }
        return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                '<tr>'+
                    '<td>Full name:</td>'+
                    '<td>'+d.name+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Email:</td>'+
                    '<td>'+d.email+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Company:</td>'+
                    '<td>'+d.hotel.name+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Position:</td>'+
                    '<td>'+d.position+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Title:</td>'+
                    '<td>'+d.title+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Phone:</td>'+
                    '<td>'+d.phone+'</td>'+
                '</tr>'+
                '<tr>'+
                    '<td>Address:</td>'+
                    '<td>'+d.hotel.address+'</td>'+
                '</tr>'+
            '</table>';
    
        
    }
    

//get contact list
    axios.get('../api/v1/contact')
        .then(res=>{
            var newdata = res.data;
            $(document).ready( function () {
              var table = $('#user_table').DataTable(
                    {
                        stateSave: true,
                        data:newdata,
                        columns: [
                            {
                                "className":      'details-control',
                                "orderable":      false,
                                "data":           null,
                                "defaultContent": 'view'
                            },
                            { data: 'name' },
                            { data: 'email' },
                            { data: 'hotel.name'},
                            { data: 'position' },
                            { data: 'title'},
                            { data: 'phone',
                            "defaultContent": "<i>Not set</i>" },
                            { data: 'created_at'},
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf'
                        ]
    
                    }
                );
    
                $('#user_table tbody').on( 'click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        var data = table.row( this ).data();
                        
                            $('#modal_btn').click(function(){
                                $('#exampleModalLong .modal-title').html(data.name)});
                    }
                } );

                $('#user_table tbody').on('click', 'td.details-control', function () {
                    var tr = $(this).closest('tr');
        
                    var row = table.row( tr );
        
                    if ( row.child.isShown() ) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        // Open this row
                        row.child( format(row.data()) ).show();
                        tr.addClass('shown');
                    }
                } );

            } );
    
            
        })
        .catch(function(err){
            console.log(err);
        });

    //auto complete function
        function autocomplete(inp, arr) {
            /*the autocomplete function takes two arguments,
            the text field element and an array of possible autocompleted values:*/
            var currentFocus;
            /*execute a function when someone writes in the text field:*/
            inp.addEventListener("input", function(e) {
                var a, b, i, val = this.value;
                /*close any already open lists of autocompleted values*/
                closeAllLists();
                if (!val) { return false;}
                currentFocus = -1;
                /*create a DIV element that will contain the items (values):*/
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                /*append the DIV element as a child of the autocomplete container:*/
                this.parentNode.appendChild(a);
                /*for each item in the array...*/
                for (i = 0; i < arr.length; i++) {
                  /*check if the item starts with the same letters as the text field value:*/
                  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                  }
                }
            });
            /*execute a function presses a key on the keyboard:*/
            inp.addEventListener("keydown", function(e) {
                var x = document.getElementById(this.id + "autocomplete-list");
                if (x) x = x.getElementsByTagName("div");
                if (e.keyCode == 40) {
                  /*If the arrow DOWN key is pressed,
                  increase the currentFocus variable:*/
                  currentFocus++;
                  /*and and make the current item more visible:*/
                  addActive(x);
                } else if (e.keyCode == 38) { //up
                  /*If the arrow UP key is pressed,
                  decrease the currentFocus variable:*/
                  currentFocus--;
                  /*and and make the current item more visible:*/
                  addActive(x);
                } else if (e.keyCode == 13) {
                  /*If the ENTER key is pressed, prevent the form from being submitted,*/
                  e.preventDefault();
                  if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                  }
                }
            });
            function addActive(x) {
              /*a function to classify an item as "active":*/
              if (!x) return false;
              /*start by removing the "active" class on all items:*/
              removeActive(x);
              if (currentFocus >= x.length) currentFocus = 0;
              if (currentFocus < 0) currentFocus = (x.length - 1);
              /*add class "autocomplete-active":*/
              x[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(x) {
              /*a function to remove the "active" class from all autocomplete items:*/
              for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
              }
            }
            function closeAllLists(elmnt) {
              /*close all autocomplete lists in the document,
              except the one passed as an argument:*/
              var x = document.getElementsByClassName("autocomplete-items");
              for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
              }
            }
          }
          /*execute a function when someone clicks in the document:*/
          document.addEventListener("click", function (e) {
              closeAllLists(e.target);
          });
          }

        //update data function
        function updateData(url, uid) {
            var newData = {};
            newData.id = uid;
            $('body').find("#edit_body input").each(function(){
                
            var key = $(this).attr('name');
            var val = $(this).val();
        
            newData[key] = val;
            });
            
            axios.post(url, newData).then(res => {
                // $('body').load(window.location.href + "#hotel_table");
                
            })
        }

        //delete data function
        function deleteData(url, $id) {
            axios.delete(url, $id).then(res => {

            })
        }

        //autocomplete hotel input
        axios.get('../api/v1/hotel')
        .then(res=>{
            var newdata = res.data;
            
            var hotels = newdata.map(a => a.name);
            
            autocomplete(document.getElementById("hotelName"), hotels);
        })
        .catch(function(err){
            console.log(err);
        });
     

        //get hotel list

        axios.get('../api/v1/hotel')
        .then(res=>{
            var newdata = res.data;
            $(document).ready( function () {
              var table = $('#hotel_table').DataTable(
                    {
                        "processing": true,
                        "serverSide": true,
                        "ajax":{"url":"api/v1/hotel","dataSrc":""},
                        data:newdata,
                        columns: [
                            {
                                "className":      'details-control',
                                "orderable":      false,
                                "data":           null,
                                "defaultContent": 'view'
                            },
                            { data: 'name' },
                            { data: 'address',
                            "defaultContent": "<i>Not set</i>"  },
                            { data: 'created_at'},
                            
                        ],
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf'
                        ]
    
                    }
                );
    
                $('#hotel_table tbody').on( 'click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        var data = table.row( this ).data();
                        var name = data.name;
                        var address = data.address;
                        var uid = table.row( this ).data().id;
                        
                        //hotel edit
                            $('#modal_btn').click(function(){
                                table.$('tr.selected').removeClass('selected');
                                $('#exampleModalLong .modal-title').html(name)
                                $('#hotelName').val(name);
                                $('form #hotelAddress').val(address);
                                $('form #btn_edit_hotel').click(function(){         
                                    updateData('api/v1/hotel/edit', uid);
                                    table.draw();
                                })
                                
                            });

                        //hotel delete
                            $('#hotel_delete_btn').click(function(){
                                
                                deleteData(`api/v1/hotel/${uid}`, uid);
                                
                                table.$('tr.selected').removeClass('selected');
                                table.draw();
                            })
            

                    }
                } );

              
    

                $('#hotel_table tbody').on('click', 'td.details-control', function () {
                    var tr = $(this).closest('tr');
        
                    var row = table.row( tr );
        
                    if ( row.child.isShown() ) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        // Open this row
                        row.child( format(row.data()) ).show();
                        tr.addClass('shown');
                    }
                } );

            } );
    
            
        })
        .catch(function(err){
            console.log(err);
        });

        //ajax new hotel/contact form
        $(document).ready(function(){
            $('form').on('click', '#btn_hotel', function(e){
                e.preventDefault();
                var newHotel={};
                newHotel.name = $('#hotelName').val();
                newHotel.address = $('#hotelAddress').val();
                axios.post('../api/v1/hotel', newHotel)
                .then(res=>{

                })
            })


            $('form').on('click','#btn_add', function(e){
                e.preventDefault();
                var newHotel={};
                newHotel.name = $('#hotel').val();
                newHotel.address = "";
                axios.post('../api/v1/hotel', newHotel)
                .then(res=>{
                    var contact = {};
                    contact.hotel_id=res.data.id;
                    
                    contact.name = $('#contactName').val();
                    contact.position = $('#contactPosition').val();
                    contact.title = $('#contactTitle').val();
                    contact.email =$('#contactEmail').val();
                    contact.phone =$('#contactPhone').val();
                    
                    axios.post('../api/v1/contact', contact)
                    .then(res => {
                        console.log(res)
                    })
                })
            })
        });

    