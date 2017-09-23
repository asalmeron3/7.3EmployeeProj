 // Initialize Firebase 
 var config = {
     apiKey: "AIzaSyA4kAB0zJysihVjCzEwAX5fH-vE9V0K8TM",
     authDomain: "inclassemployeeassignment.firebaseapp.com",
     databaseURL: "https://inclassemployeeassignment.firebaseio.com",
     projectId: "inclassemployeeassignment",
     storageBucket: "",
     messagingSenderId: "833622573521"
 };
 firebase.initializeApp(config);


//this step is optional. it's useful for shorter typing. to access the project database, we could always type "firebase.database"
 var database = firebase.database();


//global variables to store out information
 var empName = "";
 var empRole = "";
 var startDate = "";
 var monthlyRate = "";


//query the document for a click event on the class ".pressToSubmit". 
 $(document).on("click", ".pressToSubmit", function(event) {

  //When the user clicks on ".pressToSubmit", run the following steps"

    //prevent the page from refreshing upon submitting
     event.preventDefault();

     //getting the values of the inputs and storing them in variables. These variables are gloabl BUT they can also be made local.
     empName = $("#inputEmployee").val().trim();
     empRole = $("#inputRole").val().trim();
     startDate = $("#inputDate").val().trim();
     monthlyRate = $("#inputRate").val().trim();

     //now that we have the values from the form (stored in variables), we are going to PUSH these values to Firebase. With Push(), firebase will assign a unique key to the data that way it does not get overwritten
     database.ref().push({
        //make firebase keys and store the variables that have the user's input
         name: empName, //the key is "name", the key's value is empName (which is from the user's form input)
         role: empRole, //the key is "role"
         date: startDate, //the key is "date"
         rate: monthlyRate,//the key is "rate"

         //make one more key and store the TIMESTAMP of when the data was added. TIMESTAMP is a firebase method and will be useful for sorting later
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     });

     //Our data is now in FIREBASE, so we need to access the data from Firebase in order to update the DOM 
 });

//first, access your firebase database for this project. --> "firebase.database.ref()"

//then, sort the data based on the timestamp --> .orderByChild("dateAdded")

//then, make sure to 1) loop through all the data 2) run/update each time you add a child via the push() method. BOTH of these functions happen with the method ".on()" and with the first property as "child_added"

// add a second propert to the ".on()" method; this property is function(snapshot) --> the function(snapshot) grabs all of the data from the reference "ref()" . This data is stored in "snapshot"

//add a third property to the ".on()" method; this property is function(errorObject) --> useful for displaying and error --> something to add later.

 database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {

  //Optional: store the values of the data in a variable for "easier" referencing below
  var ourFBdata = snapshot.val();

  //make a variable that will store a long STRING of html code to be appended to our table. This html code should include the data we want to display on the DOM-table. The data should come from firebase (which we called and store in the 2 lines above). 
  var tableHTML = "<tr><th>" +ourFBdata.name + "</th><th>" +ourFBdata.role +  "</th><th>" + ourFBdata.date +  "</th><th> NAN_1 </th><th>" + ourFBdata.rate + "</th><th> NAN_2 </th></tr>";

  //append the html code to the table
  $(".employeeList").append(tableHTML);


 }, function(errorObject) {

         });