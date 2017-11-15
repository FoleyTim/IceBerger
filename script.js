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
  $("#tot").empty();
  $("#tot").append("Total - $" + totalPrice);
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
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=checkorder&order=" + currentOrder, function(data) {
    console.log(data);
    if(data['status'] == 0) {

      var progress = document.getElementById("progress");
      progress.style.backgroundColor = "#6A2D00";
      progress.style.color = "white";
      progress.style.height = "50px";
      progress.style.textAlign = "center";
      progress.style.paddingTop = "10px";
      progress.style.paddingBottom = "15px";
      progress.style.marginBottom = "50px";
      progress.style.marginTop = "100px";
      $('#stat').html('Your Order Is In The Queue');
    }
    else if(data['status'] == 1) {
      var progress = document.getElementById("progress");
      progress.style.backgroundColor = "#9A4198";
      progress.style.color = "white";
      progress.style.height = "50px";
      progress.style.textAlign = "center";
      progress.style.paddingTop = "10px";
      progress.style.paddingBottom = "15px";
      progress.style.marginBottom = "50px";
      progress.style.marginTop = "100px";
      $('#stat').html('Your Order Is Being Made');
    }
    else if(data['status'] == 2) {
      var progress = document.getElementById("progress");
      progress.style.backgroundColor = "#147871";
      progress.style.color = "white";
      progress.style.height = "50px";
      progress.style.textAlign = "center";
      progress.style.paddingTop = "10px";
      progress.style.paddingBottom = "15px";
      progress.style.marginBottom = "50px";
      progress.style.marginTop = "100px";
      $('#stat').html('Your Order Is Complete');
    }
  });
}

$(document).ready(function() {

  /*Populates the burgers from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getpresetburgers", function(data) {
    $('#Burgers').empty();
    data['burgers'].forEach(function(burger) {
      var burgeritem = document.createElement("div");

      var totalPrice = 0;
      burger['ingredients'].forEach(function(ingredient) {
        totalPrice += parseInt(ingredient['cost']);
      });
      burgeritem.addEventListener('click', function() {
        console.log("burgerclick");
        document.getElementById('id04').style.display='block';
        $(".ordertitle").text(burger['name']);
        document.getElementById('setburgimg').src = 'images/ingredients/burger/' + burger['id'] + '.png';
        $("#presetIngredients").empty();

        var ingredientslist = [];

        burger['ingredients'].forEach(function(ingredient) {
          var ingredientitem = document.createElement("li");
          ingredientitem.innerHTML = ingredient['name'];
          document.getElementById('presetIngredients').appendChild(ingredientitem);

          var ingrdobject = {};
          ingrdobject['id'] = ingredient['id'];
          ingrdobject['name'] = ingredient['name'];
          ingrdobject['price'] = ingredient['cost'];
          ingredientslist.push(ingrdobject);
        });

        $("#presetButton").empty();
        var addButton = document.createElement("button");
        addButton.setAttribute('id', 'myburgbtn');
        addButton.setAttribute('type', 'submit');
        addButton.appendChild(document.createTextNode('Add'));
        document.getElementById('presetButton').appendChild(addButton);

        addButton.addEventListener('click', function() {
            console.log("preset add");

            var orderitem = {};
            orderitem['id'] = null;
            orderitem['name'] = burger['name'];
            orderitem['price'] = totalPrice;
            orderitem['ingredients'] = ingredientslist;
            orderlist.push(orderitem);
            updateDocket();
            document.getElementById('id04').style.display = 'none'
        });

      });
      burgeritem.innerHTML = "<div class=\"itemcontainer animate\"><div class=\"burgerItem\"><img class=\"ingredient\" src=\"images/ingredients/burger/" + burger['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + burger['name'] + "</h3><h3>$" + totalPrice + "</h3></div>";


      document.getElementById('Burgers').appendChild(burgeritem);
    });
  });

  /*Populates the sides from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=6", function(data) {
    $('#Sides').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Sides').append("<div class=\"itemcontainer animate\" onclick=\"addItem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"burgerItem\"><img class=\"ingredient\" src=\"images/ingredients/sides/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the drinks from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=5", function(data) {
    $('#Drinks').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Drinks').append("<div class=\"itemcontainer animate\" onclick=\"addItem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"burgerItem\"><img class=\"ingredient\" src=\"images/ingredients/drinks/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the buns from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=1", function(data) {
    $('#Buns').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Buns').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/buns/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the fillings from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=2", function(data) {
    $('#Fillings').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Fillings').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/icecream/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the sauce from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=3", function(data) {
    $('#Sauce').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Sauce').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/sauce/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  /*Populates the sprinkles from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=4", function(data) {
    $('#Sprinkles').empty();
    data['inventory'].forEach(function(category) {
      category['items'].forEach(function(item) {
        // console.log(item);
        $('#Sprinkles').append("<div class=\"createcontainer animate\" onclick=\"addcreateitem(" + item['id'] + ", '" + item['name'] + "', " + item['cost'] + ");\"><div class=\"createItem\"><img class=\"ingredient\" src=\"images/ingredients/sprinkles/" + item['id'] + ".png\" alt=\"\" width=\"80%\"></div><h3>" + item['name'] + "</h3><h3>$" + item['cost'] + "</h3></div>");
      });
    });
  });

  $('#confirm-purchase').click(function(e) {
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=submitorder&user="+currentUser+"&order=" + JSON.stringify(orderlist), function(data) {
      console.log(data);
      if (data['success']) {
        currentOrder = data['id'];
        checkStatus();
        timer = setInterval(checkStatus, 1000);
      }
    });
  });

  if($.cookie('user_id') && $.cookie('user_name')) {
    login($.cookie('user_id'), $.cookie('user_name'));
  } else {
    logout();
  }

  function login(id, name) {
    $("#id01").hide();
    $("#pastOrders").show();
    $("#myBurgers").show();
    $("#log_sign").text("Logout - " + name);
    logged_in = true;
    currentUser = id;
    $.cookie('user_id', id);
    $.cookie('user_name', name);

    /*Populates Past Orders from the database*/
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getuserorders&user=" + id, function(data) {
      $('#pastorderslist').empty();
      data['orders'].forEach(function(order) {
        console.log('order');
        var totalPrice = 0;
        var orderitems = [];
        order['sides'].forEach(function(ingredient) {
          totalPrice += parseInt(ingredient['cost']);

          var ingrdobject = {};
          ingrdobject['id'] = ingredient['id'];
          ingrdobject['name'] = ingredient['name'];
          ingrdobject['price'] = ingredient['cost'];
          orderitems.push(ingrdobject);
        });

        order['burgers'].forEach(function(burger) {
          var burgerobject = {};
          burgerobject['id'] = null;
          burgerobject['name'] = burger['name'];
          burgerobject['ingredients'] = [];
          var burgerprice = 0;
          burger['ingredients'].forEach(function(ingredient) {
            totalPrice += parseInt(ingredient['cost']);
            burgerprice += parseInt(ingredient['cost']);

            var ingrdobject = {};
            ingrdobject['id'] = ingredient['id'];
            ingrdobject['name'] = ingredient['name'];
            ingrdobject['price'] = ingredient['cost'];
            burgerobject['ingredients'].push(ingrdobject);
          });
          burgerobject['price'] = burgerprice;
          orderitems.push(burgerobject);
        });

        var myburgcase = document.createElement("div");
        myburgcase.setAttribute('class', 'myburgcase');

          var myburgerItem = document.createElement("div");
          myburgerItem.setAttribute('class', 'myburgerItem');
          myburgcase.appendChild(myburgerItem);

            var myburgAdd = document.createElement("button");
            myburgAdd.setAttribute('class', 'myburgAdd');
            myburgAdd.appendChild(document.createTextNode('Add'));
            myburgerItem.appendChild(myburgAdd);

            var price = document.createElement("h3");
            price.setAttribute('class', 'price');
            price.appendChild(document.createTextNode('$' + totalPrice));
            myburgerItem.appendChild(price);

            var date = document.createElement("h3");
            date.setAttribute('class', 'date');
            date.appendChild(document.createTextNode(order['id']));

            myburgerItem.appendChild(date);

            var name = document.createElement("h3");
            name.setAttribute('class', 'name');
            var newDate = order['date'];
            var year = newDate.substring(0, 4);
            var month = newDate.substring(5, 7);
            var day = newDate.substring(8, 10);
            name.appendChild(document.createTextNode(day + ' - ' + month + ' - ' + year));
            myburgerItem.appendChild(name);

          var myingredcase = document.createElement("div");
          myingredcase.setAttribute('class', 'myingredcase');
          myingredcase.style.display = 'none';
          myburgcase.appendChild(myingredcase);

            var myburgingred = document.createElement("ul");
            myburgingred.setAttribute('class', 'myburgingred');
            myingredcase.appendChild(myburgingred);

            order['burgers'].forEach(function(burger) {
              var burgeritem = document.createElement("li");
              burgeritem.appendChild(document.createTextNode(burger['name']));
              myburgingred.appendChild(burgeritem);
            });

            order['sides'].forEach(function(side) {
              var sideitem = document.createElement("li");
              sideitem.appendChild(document.createTextNode(side['name']));
              myburgingred.appendChild(sideitem);
            });

        myburgcase.addEventListener('click', function(e) {
          if(myingredcase.style.display == 'block')
            myingredcase.style.display = 'none';
          else
            myingredcase.style.display = 'block';
        });

        myburgAdd.addEventListener('click', function(e) {
              orderlist = orderlist.concat(orderitems);
              updateDocket();
              document.getElementById('id08').style.display = 'none'
        });

        document.getElementById('pastorderslist').appendChild(myburgcase);
      });
    });

    /*Populates myburgers from the database*/
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getuserburgers&user=" + id, function(data) {
      $('#myburgerslist').empty();
      data['burgers'].forEach(function(burger) {

        var totalPrice = 0;
        var ingredientslist = [];
        burger['ingredients'].forEach(function(ingredient) {
          totalPrice += parseInt(ingredient['cost']);

          var ingrdobject = {};
          ingrdobject['id'] = ingredient['id'];
          ingrdobject['name'] = ingredient['name'];
          ingrdobject['price'] = ingredient['cost'];
          ingredientslist.push(ingrdobject);
        });

        var myburgcase = document.createElement("div");
        myburgcase.setAttribute('class', 'myburgcase');

          var myburgerItem = document.createElement("div");
          myburgerItem.setAttribute('class', 'myburgerItem');
          myburgcase.appendChild(myburgerItem);

            var myburgAdd = document.createElement("button");
            myburgAdd.setAttribute('class', 'myburgAdd');
            myburgAdd.appendChild(document.createTextNode('Add'));
            myburgerItem.appendChild(myburgAdd);

            var price = document.createElement("h3");
            price.setAttribute('class', 'price');
            price.appendChild(document.createTextNode(totalPrice));
            myburgerItem.appendChild(price);

            var date = document.createElement("h3");
            date.setAttribute('class', 'date');
            date.appendChild(document.createTextNode(burger['name']));
            myburgerItem.appendChild(date);

            var name = document.createElement("h3");
            name.setAttribute('class', 'name');
            var newDate = burger['date'];
            var year = newDate.substring(0, 4);
            var month = newDate.substring(5, 7);
            var day = newDate.substring(8, 10);
            name.appendChild(document.createTextNode(day + ' - ' + month + ' - ' + year));
            myburgerItem.appendChild(name);

          var myingredcase = document.createElement("div");
          myingredcase.setAttribute('class', 'myingredcase');
          myingredcase.style.display = 'none';
          myburgcase.appendChild(myingredcase);

            var myburgingred = document.createElement("ul");
            myburgingred.setAttribute('class', 'myburgingred');
            myingredcase.appendChild(myburgingred);

            burger['ingredients'].forEach(function(ingredient) {
              var ingredientitem = document.createElement("li");
              ingredientitem.appendChild(document.createTextNode(ingredient['name']));
              myburgingred.appendChild(ingredientitem);
            });

        myburgcase.addEventListener('click', function(e) {
          if(myingredcase.style.display == 'block')
            myingredcase.style.display = 'none';
          else
            myingredcase.style.display = 'block';
        });

        myburgAdd.addEventListener('click', function(e) {
              var orderitem = {};
              orderitem['id'] = null;
              orderitem['name'] = burger['name'];
              orderitem['price'] = totalPrice;
              orderitem['ingredients'] = ingredientslist;
              orderlist.push(orderitem);
              updateDocket();
              document.getElementById('id07').style.display = 'none'
        });

        document.getElementById('myburgerslist').appendChild(myburgcase);
      });
    });
  }

  function logout() {
    $("#pastOrders").hide();
    $("#myBurgers").hide();
    $("#log_sign").text("Login");
     currentUser = null;
       logged_in = false;

     $.removeCookie('user_id');
     $.removeCookie('user_name');
  }

  $("#log_sign").click(function (e) {
    if(!logged_in) {
    document.getElementById('id01').style.display='block';
  } else {
      logout();
  }
  });

  openMenu(null, 'Burgers');
  document.getElementById('default').className += ' active';

  $("#loginform").submit(function(event) {
    event.preventDefault();

    var name = document.getElementById("logUname").value;
    var password = document.getElementById("logPsw").value;
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=login&email=" + name + "&password=" + password, function(data) {
      console.log(data);
      if (data['success']) {
        login(data['user'], data['name']);
      }
    });

    return false;
  });

  $("#signupform").submit(function(event) {
    event.preventDefault();

    var name = document.getElementById("signUname").value;
    var password = document.getElementById("signPsw").value;
    var email = document.getElementById("signEmail").value;
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=register&name=" + name + "&password=" + password + "&email=" + email, function(data) {
      console.log(data);
      if (data['success']) {
        login(data['user'], data['name']);
      }
    });

    return false;
  });
});
