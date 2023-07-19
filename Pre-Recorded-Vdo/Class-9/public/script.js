$(document).ready(function () {
  $("#movieTable").DataTable();
});
const sendMail = (index) => {
  console.log(movieList[index]);

  //jQuery AJAX call
  $.post("http://localhost:6001/sendMail", movieList[index], (data, status) => {
    console.log(`Data:${data} & Status: ${status}`);
  });
};
