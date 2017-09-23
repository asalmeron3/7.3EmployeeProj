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

 var database = firebase.database();

 var empName = "";
 var empRole = "";
 var startDate = "";
 var monthlyRate = "";

 $(document).on("click", ".pressToSubmit", function(event) {

     event.preventDefault();

     empName = $("#inputEmployee").val().trim();
     empRole = $("#inputRole").val().trim();
     startDate = $("#inputDate").val().trim();
     monthlyRate = $("#inputRate").val().trim();

     database.ref().push({
         name: empName,
         role: empRole,
         date: startDate,
         rate: monthlyRate,
         dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
 });

 database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
  var ourFBdata = snapshot.val();

  var tableHTML = "<tr><th>" +ourFBdata.name + "</th><th>" +ourFBdata.role +  "</th><th>" + ourFBdata.date +  "</th><th> NAN</th><th>" + ourFBdata.rate + "</th><th> NAN </th></tr>";
  $(".employeeList").append(tableHTML);


 }, function(errorObject) {

         });