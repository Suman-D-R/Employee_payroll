$(document).ready(function () {
  $("#reset").click(function (e) {
    e.preventDefault();
    $("#name").val("");
    $("input[name='avatar']").prop("checked", false);
    $("input[name='gender']").prop("checked", false);
    $("input[name='department']").prop("checked", false);
    $("#salary").val("");
    $("#date").val("");
    $("#note").val("");
  });

  $("#myForm").submit(function (e) {
    let isValid = true;

  if ($.trim($("#name").val()) === "") {
    $("#name-error").text("Name is required");
    $("#name-error").show();
    isValid = false;
  } else {
    $("#name-error").text(""); // Clear the name error message
  }

  if ($("input[name='avatar']:checked").length === 0) {
    $("#profile-error").text("Profile image is required");
    $("#profile-error").show();
    isValid = false;
  } else {
    $("#profile-error").text(""); // Clear the profile image error message
  }

  if ($("input[name='gender']:checked").length === 0) {
    $("#gender-error").text("Gender is required");
    $("#gender-error").show();
    isValid = false;
  } else {
    $("#gender-error").text(""); // Clear the gender error message
  }

  if ($.trim($("#salary").val()) === "") {
    $("#salary-error").text("Salary is required");
    $("#salary-error").show();
    isValid = false;
  } else {
    $("#salary-error").text(""); // Clear the salary error message
  }

  if ($.trim($("#date").val()) === "") {
    $("#date-error").text("Date is required");
    $("#date-error").show();
    isValid = false;
  } else {
    $("#date-error").text(""); // Clear the date error message
  }
  
  if(!isValid) {
    e.preventDefault();
  }
  else{

      const name = $("#name").val();
      const avatar = $("input[name='avatar']:checked").val();
      const gender = $("input[name='gender']:checked").val();
      const department = [];
      $("input[name='department']:checked").each(function () {
        department.push($(this).val());
      });
      const salary = $("#salary").val();
      const date = $("#date").val();
      const note = $("#note").val();

      const data = {
        name: name,
        avatar: avatar,
        gender: gender,
        department: department,
        salary: salary,
        startDate: date,
        note: note,
      };
      const jsonString = JSON.stringify(data);

      $.ajax({
        type: "POST",
        url: "http://localhost:3000/posts",
        data: jsonString,
        contentType: "application/json",
        success: function (response) {
          console.log("AJAX request was successful.");
          console.log("Server response: " + response);
          window.location.href = "Dashboard.html";
        },
        error: function (xhr, status, error) {
          console.log("AJAX request failed.");
          console.log("Error status: " + status);
          console.log("Error message: " + error);
        },
      });
     // Prevent form submission if any field is invalid
    }
  });

  const id = localStorage.getItem("id");
  if (id) {
    $("#submit-button").hide();
    $("#update-button").show();

    // Send an AJAX request to get the specific employee's data
    $.ajax({
      url: "http://localhost:3000/posts/" + id,
      type: "GET",
      dataType: "json",
      success: function (employee) {
        $("#name").val(employee.name);
        $('input[name="avatar"][value="' + employee.avatar + '"]').prop(
          "checked",
          true
        );
        $('input[name="gender"][value="' + employee.gender + '"]').prop(
          "checked",
          true
        );
        employee.department.forEach(function (departmentValue) {
          $('input[name="department"][value="' + departmentValue + '"]').prop(
            "checked",
            true
          );
        });
        $("#salary").val(employee.salary);
        $("#date").val(employee.startDate);
        $("#note").val(employee.note);

        $("#update-button").click(function (e) {
          e.preventDefault();

          const updatedData = {
            name: $("#name").val(),
            avatar: $("input[name='avatar']:checked").val(),
            gender: $("input[name='gender']:checked").val(),
            department: getSelectedDepartments(),
            salary: $("#salary").val(),
            startDate: $("#date").val(),
            note: $("#note").val(),
          };

          function getSelectedDepartments() {
            const selectedDepartments = [];
            $("input[name='department']:checked").each(function () {
              selectedDepartments.push($(this).val());
            });
            return selectedDepartments;
          }

          $.ajax({
            type: "PUT",
            url: "http://localhost:3000/posts/" + id,
            data: JSON.stringify(updatedData),
            contentType: "application/json",
            success: function () {
              localStorage.removeItem("id");
              window.location.href = "Dashboard.html";
            },
            error: function (xhr, status, error) {
              console.log("AJAX request failed.");
              console.log("Error status: " + status);
              console.log("Error message: " + error);
            },
          });
        });
      },
      error: function () {
        console.error("Failed to load employee data");
      },
    });
  }
});
