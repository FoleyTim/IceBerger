var orderlist = [];
var createlist = [];

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
}


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


function addItem(id, name, price) {
  var item = {};
  item['id'] = id;
  item['name'] = name;
  item['price'] = price;
  orderlist.push(item);
  updateDocket();
}

function addcreateitem(id, name, price) {
  var item = {};
  item['id'] = id;
  item['name'] = name;
  item['price'] = price;
  createlist.push(item);
  updateCreate();
}

function updateCreate() {
  $("#createdocketitems").empty();

  var totalPrice = 0;

  createlist.forEach(function(item, index) {
    var listitem = document.createElement("li");
    listitem.appendChild(document.createTextNode(item['name'] + " - $" + item['price']));
    var button = document.createElement("button");
    button.appendChild(document.createTextNode("X"));
    listitem.appendChild(button);
    button.addEventListener('click', function() {
      createlist.splice(index, 1);
      document.getElementById('createdocketitems').removeChild(listitem);
      updateCreate();
    });

    document.getElementById('createdocketitems').appendChild(listitem);
    totalPrice += item['price'];
  });
  $("#createtotal").empty();
  $("#createtotal").append("$" + totalPrice);
}

function addCreateBurger() {
  var totalPrice = 0;

  createlist.forEach(function(item, index) {
    totalPrice += item['price'];
  });

  var item = {};
  item['id'] = null;
  item['name'] = $('#createName').val() || "Custom Burger";
  item['price'] = totalPrice;
  item['ingredients'] = createlist;
  orderlist.push(item);
  updateDocket();
  document.getElementById('id02').style.display = 'none'

  createlist = [];
  $('#createName').val('');
  updateCreate();
}

function updateDocket() {
  $("#docketitems").empty();

  var totalPrice = 0;

  orderlist.forEach(function(item, index) {
    var listitem = document.createElement("li");
    listitem.appendChild(document.createTextNode(item['name'] + " - $" + item['price']));
    var button = document.createElement("button");
    button.appendChild(document.createTextNode("remove"));
    listitem.appendChild(button);
    button.addEventListener('click', function() {
      // $("#docketitems").remove(listitem);
      orderlist.splice(index, 1);
      document.getElementById('docketitems').removeChild(listitem);
      updateDocket();
    });

    document.getElementById('docketitems').appendChild(listitem);
    // $("#docketitems").append("<li id=\"\">"+item['name']+" - $"+item['price']+"0</li>");
    totalPrice += item['price'];
  });
  $("#total").empty();
  $("#total").append("$" + totalPrice);
}

function checkout() {
  $("#finalCheck").empty();

  var totalPrice = 0;

  orderlist.forEach(function(item, index) {
    var listitem = document.createElement("li");
    listitem.appendChild(document.createTextNode(item['name'] + " - $" + item['price']));


    document.getElementById('finalCheck').appendChild(listitem);
    // $("#docketitems").append("<li id=\"\">"+item['name']+" - $"+item['price']+"0</li>");
    totalPrice += item['price'];
  });
}

function payment() {
  var check = document.getElementById("rcpt");
  var pay = document.getElementById("paynow");
  var title = document.getElementById("rcptTitle");

  if (check.style.display === "none") {
    check.style.display = "block";
    pay.style.display = "none";
  } else {
    check.style.display = "none";
    pay.style.display = "block";
    $('#rcptTitle').html('Payment');
  }
}

function confirm() {
  var check = document.getElementById("rcpt");
  var pay = document.getElementById("paynow");
  var success = document.getElementById("success");
  var title = document.getElementById("rcptTitle");

  if (pay.style.display === "none") {
    success.style.display = "block";
    pay.style.display = "none";
  } else {
    pay.style.display = "none";
    success.style.display = "block";
    $('#rcptTitle').html('Success');
  }
}

function resetCheck() {
  var check = document.getElementById("rcpt");
  var pay = document.getElementById("paynow");
  var success = document.getElementById("success");

  check.style.display = "block";
  pay.style.display = "none";
  success.style.display = "none";

  $('#rcptTitle').html('Checkout');

  clearInterval(timer);
}

var currentOrder = null;
var timer = null;
function checkStatus() {
  $.getJSON("//10.140.124.121/iceberger_backend/api.php?callback=?", "method=checkorder&order=" + currentOrder, function(data) {
    console.log(data);
    if(data['status'] == 0) {

      var progress = document.getElementById("progress");
      progress.style.backgroundColor = "blue";
      progress.style.color = "white";
      progress.style.height = "50px";
    }
    else if(data['status'] == 1) {
      var progress = document.getElementById("progress");
      progress.style.backgroundColor = "red";
      progress.style.color = "white";
      progress.style.height = "50px";
    }
    else if(data['status'] == 2) {
      var progress = document.getElementById("progress");
      progress.style.backgroundColor = "green";
      progress.style.color = "white";
      progress.style.height = "50px";
    }
  });
}

$(document).ready(function() {

  /*Populates the sides from the database*/
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=6", function(data) {
    $('#Sides').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Sides').append("<div class=\"itemcontainer animate\" onclick=\"addItem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"burgerItem\"><img class=\"ingredient\" src=\"images/ingredients/sides/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the drinks from the database*/
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=5", function(data) {
    $('#Drinks').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Drinks').append("<div class=\"itemcontainer animate\" onclick=\"addItem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"burgerItem\"><img class=\"ingredient\" src=\"images/ingredients/drinks/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the buns from the database*/
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=1", function(data) {
    $('#Buns').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Buns').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/buns/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the fillings from the database*/
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=2", function(data) {
    $('#Fillings').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Fillings').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/icecream/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the sauce from the database*/
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=3", function(data) {
    $('#Sauce').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Sauce').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/sauce/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the sprinkles from the database*/
  $.getJSON("http://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=4", function(data) {
    $('#Sprinkles').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Sprinkles').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/sprinkles/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  $('#confirm-purchase').click(function(e) {
    $.getJSON("//10.140.124.121/iceberger_backend/api.php?callback=?", "method=submitorder&user="+currentUser+"&order=" + JSON.stringify(orderlist), function(data) {
      console.log(data);
      if (data['success']) {
        currentOrder = data['id'];
        checkStatus();
        timer = setInterval(checkStatus, 1000);
      }
    });
  });

if($.cookie('user_id')) {
$("#pastOrders").show();
$("#myBurgers").show();
$("#log_sign").text("Logout - " +$.cookie('user_name'));
logged_in = true;
 currentUser = $.cookie('user_id');
} else {
  $("#pastOrders").hide();
  $("#myBurgers").hide();
  $("#log_sign").text("Login");
  var logged_in = false;
  var currentUser = null;
}

  $("#log_sign").click(function (e) {
    if(!logged_in) {
    document.getElementById('id01').style.display='block';
  } else {
      logged_in = false;
      $("#pastOrders").hide();
      $("#myBurgers").hide();
      $("#log_sign").text("Login");
       currentUser = null;

       $.removeCookie('user_id');
       $.removeCookie('user_name');
  }
  });





  openMenu(null, 'Burgers');
  document.getElementById('default').className += ' active';

  $("#loginform").submit(function(event) {
    event.preventDefault();

    var name = document.getElementById("logUname").value;
    var password = document.getElementById("logPsw").value;
    $.getJSON("//10.140.124.121/iceberger_backend/login.php?callback=?", "email=" + name + "&password=" + password, function(data) {
      console.log(data);
      if (data['success']) {
        $("#id01").hide();
        $("#pastOrders").show();
        $("#myBurgers").show();
        $("#log_sign").text("Logout - " + data['name']);
        logged_in = true;
         currentUser = data['user'];
         $.cookie('user_id', data['user']);
         $.cookie('user_name', data['name']);
      }
    });

    return false;
  });

  $("#signupform").submit(function(event) {
    event.preventDefault();

    var name = document.getElementById("signUname").value;
    var password = document.getElementById("signPsw").value;
    var email = document.getElementById("signEmail").value;
    $.getJSON("//10.140.124.121/iceberger_backend/register.php?callback=?", "name=" + name + "&password=" + password + "&email=" + email, function(data) {
      console.log(data);
      if (data['success']) {
        $("#id01").hide();
      }
    });

    return false;
  });
});
