$(document).ready(function () {
  // Fetch data from the API using AJAX
  $.ajax({
    url: "http://localhost:3000/posts",
    type: "GET",
    dataType: "json",
    success: function (data) {
      // Get the profile template
      var profileTemplate = $(".profile-details").clone();

      // Clear the original profile template
      $(".profile-details").remove();

      // Iterate through the JSON data and update the HTML
      data.forEach(function (employee) {
        var newProfile = profileTemplate.clone();
        newProfile.find(".profile-details").attr("id", employee.id);
        newProfile.find("svg").attr("id", employee.id);
        console.log(employee.id);
        newProfile
          .find("img")
          .attr("src", "../assets/" + employee.avatar + ".jpg");
        newProfile.find("p#name").text(employee.name);
        newProfile.find("p#gender").text(employee.gender);
        var departments = employee.department.map((val) => val);
        var departmentText = departments.join(", "); 
        newProfile.find("p#department").text(departmentText);
        newProfile.find("p#salary").text(employee.salary);
        newProfile.find("p#date").text(employee.startDate);
        $(".card-content").append(newProfile);
      });
    },
    error: function () {
      console.error("Failed to load employee data");
    },
  });
});

function remove(id) {
  console.log(id);

  $.ajax({
    url: "http://localhost:3000/posts/" + id,
    type: "DELETE",
    success: function () {
      // alert("deleted");
    },
    error: function () {
      console.error("Failed to remove the employee");
    },
  });
}

function update(id) {
  console.log(id);

  localStorage.setItem("id",id);
  window.location.href = 'From.html';

 
}
