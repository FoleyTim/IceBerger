function openMenu(evt, item) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(item).style.display = "block";
    evt.currentTarget.className += " active";
}
// document.getElementsById("default").trigger('click');


function openHeader(evt, item) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(item).style.display = "block";
    evt.currentTarget.className += " active";
}




function openCreate(evt, item) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("createBurgercontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(item).style.display = "block";
    evt.currentTarget.className += " active";
}



var signIn = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signIn) {
        modal.style.display = "none";
    }
}

var createBurger = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == createBurger) {
        modal.style.display = "none";
    }
}

function login(form){
  // form.preventDefault;
  // form.returnValue = false;

  // console.log("login submit");
  // var http = new XMLHttpRequest();
  // var url = "http://10.140.124.121/iceberger_backend/login.php";
  // var name = document.getElementById("logUname").value;
  // var password = document.getElementById("logPsw").value;
  // var params = "email=" + name + "&password=" + password;
  // http.open("POST", url, true);
  //
  // http.sendRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //
  // http.onreadystatechange = function() {
  //   if(http.readyState == 4 && http.status == 200){
  //     console.log(http.responseText);
  //   }
  // }
  // http.send(params);

  // return false;
}
