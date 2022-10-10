$(function() {
  //Get ID DONE
  $('#get-button').on('click', function() {
       //TODO: get all users' IDs & display it
       $.ajax({
         url: '/tweetinfo',
         contentType: 'application/json',
         success: function(response){

            //problem with this code
           //console.log(JSON.parse(response).tweetinfo[0]);

           var textBodyHolder = $('#namebody');
           textBodyHolder.html('');
           
           response.tweetinfo.forEach(function(element) {
             console.log(element)
           
             textBodyHolder.append('\
               <tr>\
                 <td class="id">' + element.id + '</td>\
                 <td class="screen_name">' + element.user.screen_name + '</td>\
                 <td class="name">' + element.user.name + '</td>\
                 </tr>\
             ');
             
          });
         }
       })
   });


   //Get tweets DONE
   $('#get-tweets-button').on('click', function(){
       //TODO: get tweet info and display it
       $.ajax({
         url: '/tweetinfo',
         contentType: 'application/json',
         success: function(response){

          //problem with this code
           //console.log(JSON.parse(response).tweetinfo[0]);

           var textBodyHolder = $('#tweetbody');
           textBodyHolder.html('');
           
           response.tweetinfo.forEach(function(element) {

            //problem with this code
             //console.log(element)
           
             textBodyHolder.append('\
               <tr>\
                 <td class="id">' + element.id + '</td>\
                 <td class="text">' + element.text + '</td>\
                 <td class="text">' + element.created_at + '</td>\
                 </tr>\
             ');
             
          });
         }
       })
       
   });

 //CREATE DONE
 $('#create-form').on('submit', function(event){

       event.preventDefault();

       var newUserInput = $('#create-input');
       $.ajax({
         url: '/tweetinfo',
         method: 'POST',
         contentType: 'application/json',
         data : JSON.stringify({name: newUserInput.val()}),
         success: function(response){

          //problem with this code
           //console.log(response);

           newUserInput.val('');
           $('#get-tweets-button').click();
         }
       })

       //TODO: create a tweet
 });

   //Create searched tweets database
 $('#search-form').on('submit', function(event){
   event.preventDefault();
   var IdForAllUsers = $('#search-input');

   //problem with this code
   //console.log(userID);
   
   //TODO: search a tweet and display it.
   $.ajax({
     url: '/tweetinfo',
     
     contentType: 'application/json',

     success: function(response){

      //problem with this code
       //console.log(JSON.parse(response).tweetinfo[0]);

       var textBodyHolder = $('#searchbody');
       textBodyHolder.html('');
       
       response.tweetinfo.forEach(function(element) {

        //problem with this code
         //console.log(element)
        // if(element.id === userID){

           textBodyHolder.append('\
           <tr>\
             <td class="id">' + IdForAllUsers.val().id + '</td>\
             <td class="text">' + element.text + '</td>\
             <td class="text">' + element.created_at + '</td>\
             </tr>\
         ');
         //}
         
         
      });
     }
   })


 });

 
 $("table").on('click', '.update-button', function(){
   var FisrtRow = $(this).closest('tr');
   var IDforUser = FisrtRow.find('.id').text();
   var createName = FisrtRow.find('.name').val();

   $.ajax({
     url:'/tweetinfo/' + IDforUser,
     method: 'PUT',
     contentType: 'application/json',
     data: JSON.stringify({createName: createName}),
     success: function(response){
       console.log(response);
       $('#get-button').click();
     }
   })
 })


 $("#delete-form").on('submit', function() {
   var IDforUser = $('#delete-input')
   event.preventDefault();

   //TODO: delete a tweet
   $.ajax({
     url:'/tweetinfo/' + IDforUser,
     method: 'DELETE',
     contentType: 'application/json',
     success: function(response){

      //problem with this code
       //console.log(response);

       $('#get-tweets-button').click();
     }
   })

 });
function test_print(){
	console.log("test code")
}

});

                   
  
