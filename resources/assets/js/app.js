
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('hotel-index', require('./components/HotelIndex.vue'));

const app = new Vue({
    el: '#app'
});

//update data function
function updateData(url, uid, table) {
    var newData = {};
    newData.id = uid;
    $('body').find("#edit_body input").each(function(){
        
    var key = $(this).attr('name');
    var val = $(this).val();

    newData[key] = val;
    });
    
    axios.post(url, newData).then(res => {
        // $('#hotel_table').DataTable.ajax.reload();
        reloadTable(table);
    })
}



//delete data function
function deleteData(url, $id, table) {
    axios.delete(url, $id).then(res => {
           reloadTable(table);
    })
    
}


//reload datatable
function reloadTable(table) {
    table.ajax.reload(null, false);
} 

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
    
    function formatHotel ( d ) {
        if(d.profile==null) {
            d.profile="Not set" }
            return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                    '<tr>'+
                        '<td>Full name:</td>'+
                        '<td>'+d.name+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Address:</td>'+
                        '<td>'+d.address+'</td>'+
                    '</tr>'+
                '</table>';
        
            
        }
/* 
Perform contact crud
*/


//get contact list
    
    $(document).ready( function () {
              var table = $('#contact_table').DataTable(
                    {
                        // stateSave: true,
                        "ajax":{"url":"/api/v1/contact","dataSrc":""},
                        // data:newdata,
                        columns: [
                            {
                                "className":      'details-control',
                                "orderable":      false,
                                "data":           null,
                                "defaultContent": 'view'
                            },
                            { data: 'name' },
                            { data: 'email' },
                            { data: 'hotel.name',
                            "defaultContent": "<i>Not set</i>" },
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
                )


                $('#contact_table tbody').on( 'click', 'tr', function () {
                    if ( $(this).hasClass('selected') ) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }} );
                        
                        
                //contact edit
                $('#contact_edit_btn').off('click').click(function(){
                    var data = table.row( '.selected' ).data();
                    console.log(data)
                    var uid = data.id;
                    $('#contactPosition').val(data.position)

                    $('body').find("form input").each(function(){
                        
                        var name = $(this).attr('name');
                        var name = name.replace('contact','').toLowerCase();
                        var element_id = $(this).attr('id');
                        
                        for (var key in data) {
                            if (key == name) {
                                if(data.hotel==""){
                                    $('#hotel').val("")
                                    
                                } else if (data.hotel !== null){
                                    $('#hotel').val(data.hotel.name)
                                }
                                $('#'+element_id).val(data[key])
                            }
                        }
                        });

                    $('#exampleModalLong .modal-title').html(data.name);

                    $('form').off('click').on('click','#btn_edit_contact', function(e){
                        e.preventDefault();
                        var newHotel={};
                        newHotel.name = $('#hotel').val();
                        newHotel.address = "";
                        
                            if(data.hotel == null || newHotel.name !== data.hotel.name) {
                                axios.post('./api/v1/hotel', newHotel)
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
                                        deleteData(`api/v1/contact/${uid}`, uid, table)
                                    
                                        // $('#user_table').DataTable().ajax.reload(null, false);
                                        // table.draw();
                                    })
                                })
                            } else {

                                var contact = {};
                                    contact.hotel_id=data.hotel.id;
                                    contact.name = $('#contactName').val();
                                    contact.position = $('#contactPosition').val();
                                    contact.title = $('#contactTitle').val();
                                    contact.email =$('#contactEmail').val();
                                    contact.phone =$('#contactPhone').val();
                                    contact.id = data.id;
                                    axios.post('api/v1/contact/edit', contact)
                                    .then(res => {
                                        reloadTable(table);
                                        
                                    })
                            }
                            // $('#user_table').DataTable().ajax.reload(null, false);
                            // table.draw();
                            
                        
                    })   
                });

                //delete contact
                $('#contact_delete_btn').off('click').click(function(){
                    var data = table.row( '.selected' ).data();
                    var uid = data.id;
                    if(confirm("Want to delete?")) {
                        
                        deleteData(`api/v1/contact/${uid}`, uid, table);
                        
                    }   
                    // $('#user_table').DataTable().ajax.reload(null, false);
                    // table.ajax.reload(null, false);
                    // reloadTable(table);
                    // table.draw();                       
                })


                $('#contact_table tbody').on('click', 'td.details-control', function () {
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

        //autocomplete hotel input
        axios.get('../api/v1/hotel')
        .then(res=>{
            var newdata = res.data;
            var hotels = newdata.map(a => a.name);
            autocomplete(document.getElementById("hotelName"), hotels);
        }).then(
        )
        .catch(function(err){
            console.log(err);
        });

        //autocomplete hotel input
        axios.get('../api/v1/hotel')
        .then(res=>{
            var newdata = res.data;
            var hotels = newdata.map(a => a.name);
            autocomplete(document.getElementById("hotel"), hotels);
        })
        .catch(function(err){
            console.log(err);
        });
     
/* Perform Hotel CRUD */

    // get hotel list    
    $(document).ready( function () {
            var hoteltable = $('#hotel_table').DataTable(
                {
                    // "processing": true,
                    // "serverSide": true,
                    "ajax":{"url":"/api/v1/hotel","dataSrc":""},
                    // data:newdata,
                    columns: [
                        {
                            "className":      'details-control',
                            "orderable":      false,
                            "data":           null,
                            "defaultContent": 'view'
                        },
                        { data: 'name', },
                        { data: 'address',
                        "defaultContent": "<i>Not set</i>"  },
                        { data: 'created_at'},
                        { data: 'contacts.length'},
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
                    hoteltable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            } );

            //hotel edit
            $('#hotel_edit_btn').off('click').click(function(){

                var data = hoteltable.row( '.selected' ).data();
                var name = data.name;
                var address = data.address;
                var uid = data.id;
                
                $('#exampleModalLong .modal-title').html(name)
                $('#hotelName').val(name);
                $('form #hotelAddress').val(address);
                $('form #btn_edit_hotel').off('click').click(function(){         
                    updateData('api/v1/hotel/edit', uid, hoteltable);
                })
                
            });

            //hotel delete
            $('#hotel_delete_btn').off('click').click(function(){
                var data = hoteltable.row( '.selected' ).data();
                var uid = data.id;
                if(confirm("Want to delete?")) {
                    deleteData(`api/v1/hotel/${uid}`, uid, hoteltable);
                }
            })
                
            
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
                    row.child( formatHotel(row.data()) ).show();
                    tr.addClass('shown');
                }
            } );
    } );
    
            
        

//show error message

function showError(data){
    jQuery.each(data.errors, function(key, value){
        jQuery('.alert-danger').show();
        jQuery('.alert-danger').append('<p>'+value+'</p>');
})}

//show success message

function showSucess(msg){
        jQuery('.alert-success').html('<p>'+msg+'</p>').show();
        jQuery('.alert-success').fadeOut(3000,null);
        disableBtn()
        
}


function disableBtn(){
    
    $(':button').prop('disabled', true);
    setTimeout(function(){$(':button').prop('disabled', false);},2500);
    // var timeleft = 3;
    // var downloadTimer = setInterval(function(){
    // timeleft--;
    // document.getElementById("btn_hotel").textContent = timeleft;
    // if(timeleft <= 0) {
    //     clearInterval(downloadTimer);
    //     document.getElementById("btn_hotel").textContent = "Add";
    // }
        
    // },1000);
}

        //ajax new hotel/contact form
        $(document).ready(function(){
            

            $('form').on('click', '#btn_hotel', function(e){
                e.preventDefault();
                var newHotel={};
                 
                newHotel.name = $('#hotelName').val();
                newHotel.address = $('#hotelAddress').val();
                
                axios.post('/api/v1/hotel', newHotel)
                .then(res=>{
                    // location.reload();
                    $('#hotelName').val('');
                    $('#hotelAddress').val('');
                    
                    showSucess('Your hotel has been added!')
                    // disableBtn()
                    // document.getElementById(id).prop('disabled',true)
                    // $('#btn_hotel').prop('disabled', true);
                    // document.getElementById('#btn_hotel').attr('disabled',true);
                }).catch(function (error) {
                    showError(error.response.data)
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
                        // document.getElementById("#new_contact").reset()
                    $('#contactName').val('');
                    $('#contactPosition').val('');
                    $('#contactTitle').val('');
                    $('#contactEmail').val('');
                    $('#contactPhone').val('');
                    
                    showSucess('Your contact has been added!')
                    
                    }).catch(function (error) {
                        console.log(error.response)
                        showError(error.response.data)
                      })
                }).catch(function (error) {
                    showError(error.response.data)
                  })
            })
        });

/* 

    Manage Users 

*/

        $(document).ready( function () {
            var table = $('#user_table').DataTable(
                  {
                    "ajax":{"url":"/api/v1/user","dataSrc":""},
                    "paging":   false,
                    "ordering": false,
                    "info":     false,
                    "columnDefs": [ {
                        "targets": [2],
                        "createdCell": function (td, cellData, rowData, row, col) {
                            // $(td).replaceWith('<td><select><option>admin</option><option>member</option></select></td>')
                              $(td).attr('contenteditable','true')
                              $(td).attr('id','role'+rowData.id)                 
                          }
                      } ],
                      columns: [
                          { data: 'name' },
                          { data: 'email' },
                          { data: 'roles[0].name', className: 'userRole' },
                          { data: null,
                            // className: "center",
                            // defaultContent: '<a href="" class="user_edit" ><i class="fas fa-edit fa-lg"></i></a>&nbsp<a href="" class="user_remove danger" style="color:Tomato"><i class="fas fa-trash-alt fa-lg"></i></a>'
                            defaultContent: '<a href="" class="user_edit" data-toggle="modal" data-target="#user_modal_center"><i class="fas fa-edit fa-lg"></i></a>&nbsp<a href="" class="user_remove danger" style="color:Tomato"><i class="fas fa-trash-alt fa-lg"></i></a>'
                           },
                      ]
                  }
              )
            //   $('#user_table tbody').on( 'click', 'tr', function () {
            //       if ( $(this).hasClass('selected') ) {
            //           $(this).removeClass('selected');
            //       }
            //       else {
            //           table.$('tr.selected').removeClass('selected');
            //           $(this).addClass('selected');
            //       }} );
                      
                      
              //user edit
              $('body').on('click', 'a.user_edit', function (e) {
                e.preventDefault();
                var index = $(this).closest('tr').index();
                var data = table.row(index).data();
                $('#user_modal_title').html(data.name)
                $('#userRole').val(data.roles[0].name)
                $('#userModalSave').click(function(){
                    var newUser = {}
                    newUser.role = $('#userRole').val()
                    newUser.id = data.id
                    axios.patch(`./api/v1/user/${newUser.id}`, newUser).then(res=>{
                        reloadTable(table)
                    }).catch(eer => {
                        console.log(eer)
                    })
                })
            } );

             //delete user
             $('body').on('click', 'a.user_remove', function (e) {
                e.preventDefault();
                var index = $(this).closest('tr').index();
                var data = table.row(index).data();
                var uid = data.id
                if(confirm("Want to delete?")) {
                    deleteData(`api/v1/user/${uid}`, uid, table);
                }  
            } )
            // $("body").on('click','td',function(){
            //     if($(this).prop("contentEditable") == true){
            //         $(this).prop("contentEditable","false");
            //     } else {
            //         $(this).prop("contentEditable","true");
            //     }
            // })
          } );








 /* Upload File and Parse it*/



 $(document).ready(function(){

    
    $('.custom-file-input').on('change', function() {
        
      
       let fileName = $(this).val().split('\\').pop(); 
       $(this).next('.custom-file-label').addClass("selected").html(fileName); 
       
    });

    $('.container').on('click', '.btn', function() {
        // var file = $('#exceldoc').prop('files')[0];
        var file = document.getElementById('exceldoc').files[0];
        var config = {
            delimiter: "",	// auto-detect
            newline: "",	// auto-detect
            quoteChar: '"',
            escapeChar: '"',
            header: true,
            trimHeader: false,
            dynamicTyping: false,
            preview: 0,
            encoding: "",
            worker: false,
            comments: false,
            step: undefined,
            complete: function(results, file) {
                // console.log("Parsing complete:", results.data[0]);
                uploadData(results.data)
            },
            error: undefined,
            download: false,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined
        }
        var data = Papa.parse(file, config);
        

        function uploadData(results){
            results.forEach( function (data)
            {
                var newHotel={};
                newHotel.name = data.Hotel;
                newHotel.address = "";
                
                axios.post('../api/v1/hotel', newHotel)
                .then(res=>{
                    var contact = {};
                    contact.hotel_id=res.data.id;
                    
                    contact.name = data.Name + data.Last
                    contact.position = data.Position
                    contact.title = data.Title
                    contact.email = data.Email
                    contact.phone = data.Phone
                    
                    axios.post('../api/v1/contact', contact)
                    .then(res => {
                        // document.getElementById("#new_contact").reset()
                    
                    
                    }).catch(function (error) {
                        console.log(error.response)
                        
                      })
                })
            });
            
            $('.alert-success').show();
            $('.alert-success').append(`<strong>Success!</strong> Indicates a successful or positive action.`);
        }
       
    })


    
 })


 //Add Column
 

//  $(document).ready(function(){
//     $('body').on('click','#add-column',function(e){
//         e.preventDefault();
//         axios.post('./column').then(res => {
//             console.log(res)
//         })
//     })
//  })