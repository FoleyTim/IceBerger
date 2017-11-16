var orderlist = [];
var createlist = [];

function openMenu(evt, item) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("order_tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(item).style.display = "block";

    if(item == 'burgers') {
        document.getElementById('createburgerbutton').style.display = 'block';
    } else {
        document.getElementById('createburgerbutton').style.display = 'none';
    }
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
  tablinks = document.getElementsByClassName("create_tab");
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

        $("#create_docketitems").empty();

        var totalPrice = 0;

        if(createlist.length > 0) {
            $('#create_clear_button').css('display','block');
        }
        else {
            $('#create_clear_button').css('display','none');
        }

      createlist.forEach(function(item, index) {
        totalPrice += parseFloat(item['price']);

        var listitem = document.createElement("li");
        listitem.setAttribute('class', 'create_docket_item');

        var remove = document.createElement("div");
        remove.setAttribute('class', 'create_docket_remove');
        listitem.appendChild(remove);
        remove.addEventListener('click', function() {
          createlist.splice(index, 1);
          document.getElementById('create_docketitems').removeChild(listitem);
          updateDocket();
        });

        var price = document.createElement('div');
        price.setAttribute('class', 'create_docket_price');
        price.appendChild(document.createTextNode(parseFloat(Math.round(item['price'] * 100) / 100).toFixed(2)));
        listitem.appendChild(price);

        var name = document.createElement('div');
        name.setAttribute('class', 'create_docket_name');
        name.appendChild(document.createTextNode(item['name']));
        listitem.appendChild(name);

        document.getElementById('create_docketitems').appendChild(listitem);
      });
      $("#create_docketprice").text(parseFloat(Math.round(totalPrice * 100) / 100).toFixed(2));
}

function addCreateBurger() {
  var totalPrice = 0;

  createlist.forEach(function(item, index) {
    totalPrice += parseFloat(item['price']);
  });

  var item = {};
  item['id'] = null;
  item['name'] = $('#create_dockettitle').val() || "Custom Burger";
  item['price'] = totalPrice;
  item['ingredients'] = createlist;
  orderlist.push(item);
  updateDocket();
  document.getElementById('id02').style.display = 'none'

  createlist = [];
  $('#create_dockettitle').val('');
  updateCreate();
}

function updateDocket() {
    $("#docketitems").empty();

    var totalPrice = 0;

    if(orderlist.length > 0) {
        $('#clear_button').css('display','block');
    }
    else {
        $('#clear_button').css('display','none');
    }

  orderlist.forEach(function(item, index) {
    totalPrice += parseFloat(item['price']);

    var listitem = document.createElement("li");
    listitem.setAttribute('class', 'docket_item');

    var remove = document.createElement("div");
    remove.setAttribute('class', 'docket_remove');
    listitem.appendChild(remove);
    remove.addEventListener('click', function() {
      orderlist.splice(index, 1);
      document.getElementById('docketitems').removeChild(listitem);
      updateDocket();
    });

    var price = document.createElement('div');
    price.setAttribute('class', 'docket_price');
    price.appendChild(document.createTextNode(parseFloat(Math.round(item['price'] * 100) / 100).toFixed(2)));
    listitem.appendChild(price);

    var name = document.createElement('div');
    name.setAttribute('class', 'docket_name');
    name.appendChild(document.createTextNode(item['name']));
    listitem.appendChild(name);

    document.getElementById('docketitems').appendChild(listitem);
  });
  $("#docketprice").text(parseFloat(Math.round(totalPrice * 100) / 100).toFixed(2));
}

function checkout() {
    var check = document.getElementById("rcpt");
    var pay = document.getElementById("paynow");
    var success = document.getElementById("success");

    check.style.display = "block";
    pay.style.display = "none";
    success.style.display = "none";

    $('#chkouttitle').text('Checkout');

    $("#reciept_docketitems").empty();

    var totalPrice = 0;

    orderlist.forEach(function(item, index) {
        totalPrice += parseFloat(item['price']);

        var listitem = document.createElement("li");
        listitem.setAttribute('class', 'reciept_docket_item');

        var price = document.createElement('div');
        price.setAttribute('class', 'reciept_docket_price');
        price.appendChild(document.createTextNode(parseFloat(Math.round(item['price'] * 100) / 100).toFixed(2)));
        listitem.appendChild(price);

        var name = document.createElement('div');
        name.setAttribute('class', 'reciept_docket_name');
        name.appendChild(document.createTextNode(item['name']));
        listitem.appendChild(name);

        document.getElementById('reciept_docketitems').appendChild(listitem);
    });
    $("#reciept_docketprice").text(parseFloat(Math.round(totalPrice * 100) / 100).toFixed(2));

    if(orderlist.length == 0) {
        document.getElementById('reciept_payment_btn').style.display = 'none';
    } else {
        document.getElementById('reciept_payment_btn').style.display = 'block';
    }
}


function payment() {
  var check = document.getElementById("rcpt");
  var pay = document.getElementById("paynow");
  var success = document.getElementById("success");

    check.style.display = "none";
    pay.style.display = "block";
    success.style.display = "none";

    $('#chkouttitle').text('Payment');
}

function confirm() {
  var check = document.getElementById("rcpt");
  var pay = document.getElementById("paynow");
  var success = document.getElementById("success");

  check.style.display = "none";
  pay.style.display = "none";
  success.style.display = "block";

  $('#chkouttitle').text('Thank You');

  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=submitorder&user="+currentUser+"&order=" + JSON.stringify(orderlist), function(data) {
    console.log(data);
    if (data['success']) {
      currentOrder = data['id'];
      checkStatus();
      timer = setInterval(checkStatus, 1000);

      orderlist = [];
      updateDocket();

      populateMyBurgers();
      populatePastOrders();
    }
  });
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

function populatePastOrders() {
    /*Populates Past Orders from the database*/
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getuserorders&user=" + currentUser, function(data) {
      $('#pastorderslist').empty();
      data['orders'].forEach(function(order) {
        console.log('order');
        var totalPrice = 0;
        var orderitems = [];
        order['sides'].forEach(function(ingredient) {
          totalPrice += parseFloat(ingredient['cost']);

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
            totalPrice += parseFloat(ingredient['cost']);
            burgerprice += parseFloat(ingredient['cost']);

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

            var price = document.createElement("div");
            price.setAttribute('class', 'price');
            price.appendChild(document.createTextNode(parseFloat(Math.round(totalPrice * 100) / 100).toFixed(2)));
            myburgerItem.appendChild(price);

            var date = document.createElement("div");
            date.setAttribute('class', 'name');
            date.appendChild(document.createTextNode("Order #" + order['id']));

            myburgerItem.appendChild(date);

            var name = document.createElement("div");
            name.setAttribute('class', 'date');
            var newDate = order['date'];
            var fmtDate = new Date(newDate);
            name.appendChild(document.createTextNode(fmtDate.toLocaleDateString("en-NZ")));
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
          if(myingredcase.style.display == 'block') {
            myingredcase.style.display = 'none';
        } else {

          ingrdcases = document.getElementsByClassName("myingredcase");
          for (i = 0; i < ingrdcases.length; i++) {
            ingrdcases[i].style.display = "none";
          }
            myingredcase.style.display = 'block';
        }
        });

        myburgAdd.addEventListener('click', function(e) {
              orderlist = orderlist.concat(orderitems);
              updateDocket();
              document.getElementById('id08').style.display = 'none'
        });

        document.getElementById('pastorderslist').appendChild(myburgcase);
      });
    });
}

function populateMyBurgers() {
    /*Populates myburgers from the database*/
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getuserburgers&user=" + currentUser, function(data) {
      $('#myburgerslist').empty();
      data['burgers'].forEach(function(burger) {

        var totalPrice = 0;
        var ingredientslist = [];
        burger['ingredients'].forEach(function(ingredient) {
          totalPrice += parseFloat(ingredient['cost']);

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

            var price = document.createElement("div");
            price.setAttribute('class', 'price');
            price.appendChild(document.createTextNode(parseFloat(Math.round(totalPrice * 100) / 100).toFixed(2)));
            myburgerItem.appendChild(price);

            var date = document.createElement("div");
            date.setAttribute('class', 'name');
            date.appendChild(document.createTextNode(burger['name']));
            myburgerItem.appendChild(date);

            var name = document.createElement("div");
            name.setAttribute('class', 'date');
            var newDate = burger['date'];
            var fmtDate = new Date(newDate);
            name.appendChild(document.createTextNode(fmtDate.toLocaleDateString("en-NZ")));
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
          if(myingredcase.style.display == 'block') {
            myingredcase.style.display = 'none';
        } else {
              ingrdcases = document.getElementsByClassName("myingredcase");
              for (i = 0; i < ingrdcases.length; i++) {
                ingrdcases[i].style.display = "none";
              }
            myingredcase.style.display = 'block';
        }
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
    $('#burgers').empty();
    data['burgers'].forEach(function(item) {
        var totalPrice = 0;
        item['ingredients'].forEach(function(ingredient) {
          totalPrice += parseFloat(ingredient['cost']);
        });

        var itemContainer = document.createElement('div');
        itemContainer.setAttribute('class', 'item_container animate');
        var orderItem = document.createElement('div');
        orderItem.setAttribute('class', 'order_item');

        var itemImage = document.createElement('div');
        itemImage.setAttribute('class', 'item_image');
        orderItem.appendChild(itemImage);

        var image = document.createElement('img');
        image.setAttribute('src', 'images/ingredients/burger/' + item['id'] + '.png');
        image.setAttribute('alt', item['name']);
        itemImage.appendChild(image);

        var itemName = document.createElement('div');
        itemName.setAttribute('class', 'item_name');
        itemName.appendChild(document.createTextNode(item['name']));
        orderItem.appendChild(itemName);

        var itemPrice = document.createElement('div');
        itemPrice.setAttribute('class', 'item_price');
        itemPrice.appendChild(document.createTextNode(parseFloat(Math.round(totalPrice * 100) / 100).toFixed(2)));
        orderItem.appendChild(itemPrice);

        itemContainer.appendChild(orderItem);
        document.getElementById('burgers').appendChild(itemContainer);

        itemContainer.addEventListener('click', function() {
            console.log("burgerclick");
            document.getElementById('id04').style.display='block';
            $("#ordertitle").text(item['name']);
            document.getElementById('setburgimg').src = 'images/ingredients/burger/' + item['id'] + '.png';
            $("#presetIngredients").empty();

            var ingredientslist = [];

            item['ingredients'].forEach(function(ingredient) {
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
                var orderitem = {};
                orderitem['id'] = null;
                orderitem['name'] = item['name'];
                orderitem['price'] = totalPrice;
                orderitem['ingredients'] = ingredientslist;
                orderlist.push(orderitem);
                updateDocket();
                document.getElementById('id04').style.display = 'none'
            });

        });
    });
 });

/*Populates the sides from the database*/
$.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=6", function(data) {
    $('#sides').empty();
    data['inventory'].forEach(function(category) {
        category['items'].forEach(function(item) {
            var itemContainer = document.createElement('div');
            itemContainer.setAttribute('class', 'item_container animate');
            itemContainer.addEventListener('click', function() {
            addItem(item['id'], item['name'], item['cost']);
            });
            var orderItem = document.createElement('div');
            orderItem.setAttribute('class', 'order_item');

            var itemImage = document.createElement('div');
            itemImage.setAttribute('class', 'item_image');
            orderItem.appendChild(itemImage);

            var image = document.createElement('img');
            image.setAttribute('src', 'images/ingredients/sides/' + item['id'] + '.png');
            image.setAttribute('alt', item['name']);
            itemImage.appendChild(image);

            var itemName = document.createElement('div');
            itemName.setAttribute('class', 'item_name');
            itemName.appendChild(document.createTextNode(item['name']));
            orderItem.appendChild(itemName);

            var itemPrice = document.createElement('div');
            itemPrice.setAttribute('class', 'item_price');
            itemPrice.appendChild(document.createTextNode(parseFloat(Math.round(item['cost'] * 100) / 100).toFixed(2)));
            orderItem.appendChild(itemPrice);

            itemContainer.appendChild(orderItem);
            document.getElementById('sides').appendChild(itemContainer);
        });
    });
});

  /*Populates the drinks from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=5", function(data) {
    $('#drinks').empty();
    data['inventory'].forEach(function(category) {
        category['items'].forEach(function(item) {
            var itemContainer = document.createElement('div');
            itemContainer.setAttribute('class', 'item_container animate');
            itemContainer.addEventListener('click', function() {
            addItem(item['id'], item['name'], item['cost']);
            });
            var orderItem = document.createElement('div');
            orderItem.setAttribute('class', 'order_item');

            var itemImage = document.createElement('div');
            itemImage.setAttribute('class', 'item_image');
            orderItem.appendChild(itemImage);

            var image = document.createElement('img');
            image.setAttribute('src', 'images/ingredients/drinks/' + item['id'] + '.png');
            image.setAttribute('alt', item['name']);
            itemImage.appendChild(image);

            var itemName = document.createElement('div');
            itemName.setAttribute('class', 'item_name');
            itemName.appendChild(document.createTextNode(item['name']));
            orderItem.appendChild(itemName);

            var itemPrice = document.createElement('div');
            itemPrice.setAttribute('class', 'item_price');
            itemPrice.appendChild(document.createTextNode(parseFloat(Math.round(item['cost'] * 100) / 100).toFixed(2)));
            orderItem.appendChild(itemPrice);

            itemContainer.appendChild(orderItem);
            document.getElementById('drinks').appendChild(itemContainer);
        });
    });
  });

  /*Populates the buns from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=1", function(data) {
      $('#Buns').empty();
      data['inventory'].forEach(function(category) {
          category['items'].forEach(function(item) {
              var itemContainer = document.createElement('div');
              itemContainer.setAttribute('class', 'item_container animate');
              itemContainer.addEventListener('click', function() {
                  addcreateitem(item['id'], item['name'], item['cost']);
              });
              var orderItem = document.createElement('div');
              orderItem.setAttribute('class', 'order_item');

              var itemImage = document.createElement('div');
              itemImage.setAttribute('class', 'item_image');
              orderItem.appendChild(itemImage);

              var image = document.createElement('img');
              image.setAttribute('src', 'images/ingredients/buns/' + item['id'] + '.png');
              image.setAttribute('alt', item['name']);
              itemImage.appendChild(image);

              var itemName = document.createElement('div');
              itemName.setAttribute('class', 'item_name');
              itemName.appendChild(document.createTextNode(item['name']));
              orderItem.appendChild(itemName);

              var itemPrice = document.createElement('div');
              itemPrice.setAttribute('class', 'item_price');
              itemPrice.appendChild(document.createTextNode(parseFloat(Math.round(item['cost'] * 100) / 100).toFixed(2)));
              orderItem.appendChild(itemPrice);

              itemContainer.appendChild(orderItem);
              document.getElementById('Buns').appendChild(itemContainer);
          });
      });
  });

  /*Populates the ice cream from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=2", function(data) {

      $('#Fillings').empty();
      data['inventory'].forEach(function(category) {
          category['items'].forEach(function(item) {
              var itemContainer = document.createElement('div');
              itemContainer.setAttribute('class', 'item_container animate');
              itemContainer.addEventListener('click', function() {
                  addcreateitem(item['id'], item['name'], item['cost']);
              });
              var orderItem = document.createElement('div');
              orderItem.setAttribute('class', 'order_item');

              var itemImage = document.createElement('div');
              itemImage.setAttribute('class', 'item_image');
              orderItem.appendChild(itemImage);

              var image = document.createElement('img');
              image.setAttribute('src', 'images/ingredients/icecream/' + item['id'] + '.png');
              image.setAttribute('alt', item['name']);
              itemImage.appendChild(image);

              var itemName = document.createElement('div');
              itemName.setAttribute('class', 'item_name');
              itemName.appendChild(document.createTextNode(item['name']));
              orderItem.appendChild(itemName);

              var itemPrice = document.createElement('div');
              itemPrice.setAttribute('class', 'item_price');
              itemPrice.appendChild(document.createTextNode(parseFloat(Math.round(item['cost'] * 100) / 100).toFixed(2)));
              orderItem.appendChild(itemPrice);

              itemContainer.appendChild(orderItem);
              document.getElementById('Fillings').appendChild(itemContainer);
          });
      });
  });

  /*Populates the sauce from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=3", function(data) {
      $('#Sauce').empty();
      data['inventory'].forEach(function(category) {
          category['items'].forEach(function(item) {
              var itemContainer = document.createElement('div');
              itemContainer.setAttribute('class', 'item_container animate');
              itemContainer.addEventListener('click', function() {
                  addcreateitem(item['id'], item['name'], item['cost']);
              });
              var orderItem = document.createElement('div');
              orderItem.setAttribute('class', 'order_item');

              var itemImage = document.createElement('div');
              itemImage.setAttribute('class', 'item_image');
              orderItem.appendChild(itemImage);

              var image = document.createElement('img');
              image.setAttribute('src', 'images/ingredients/sauce/' + item['id'] + '.png');
              image.setAttribute('alt', item['name']);
              itemImage.appendChild(image);

              var itemName = document.createElement('div');
              itemName.setAttribute('class', 'item_name');
              itemName.appendChild(document.createTextNode(item['name']));
              orderItem.appendChild(itemName);

              var itemPrice = document.createElement('div');
              itemPrice.setAttribute('class', 'item_price');
              itemPrice.appendChild(document.createTextNode(parseFloat(Math.round(item['cost'] * 100) / 100).toFixed(2)));
              orderItem.appendChild(itemPrice);

              itemContainer.appendChild(orderItem);
              document.getElementById('Sauce').appendChild(itemContainer);
          });
      });

  });

  /*Populates the sprinkles from the database*/
  $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=getinventory&category=4", function(data) {
      $('#Sprinkles').empty();
      data['inventory'].forEach(function(category) {
          category['items'].forEach(function(item) {
              var itemContainer = document.createElement('div');
              itemContainer.setAttribute('class', 'item_container animate');
              itemContainer.addEventListener('click', function() {
                  addcreateitem(item['id'], item['name'], item['cost']);
              });
              var orderItem = document.createElement('div');
              orderItem.setAttribute('class', 'order_item');

              var itemImage = document.createElement('div');
              itemImage.setAttribute('class', 'item_image');
              orderItem.appendChild(itemImage);

              var image = document.createElement('img');
              image.setAttribute('src', 'images/ingredients/sprinkles/' + item['id'] + '.png');
              image.setAttribute('alt', item['name']);
              itemImage.appendChild(image);

              var itemName = document.createElement('div');
              itemName.setAttribute('class', 'item_name');
              itemName.appendChild(document.createTextNode(item['name']));
              orderItem.appendChild(itemName);

              var itemPrice = document.createElement('div');
              itemPrice.setAttribute('class', 'item_price');
              itemPrice.appendChild(document.createTextNode(parseFloat(Math.round(item['cost'] * 100) / 100).toFixed(2)));
              orderItem.appendChild(itemPrice);

              itemContainer.appendChild(orderItem);
              document.getElementById('Sprinkles').appendChild(itemContainer);
          });
      });

  });

$('#clear_button').click(function() {
    orderlist = [];
    updateDocket();
});
  $('#create_clear_button').click(function() {
      createlist = [];
      $('#create_dockettitle').val('')
      updateCreate();
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

    populatePastOrders();
    populateMyBurgers();
  }

  function logout() {
    $("#pastOrders").hide();
    $("#myBurgers").hide();
    $("#log_sign").text("Login / Register");
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

  openMenu(null, 'burgers');
  document.getElementById('default').className += ' active';

  $("#login_submit").click(function(event) {
    // event.preventDefault();

    var name = document.getElementById("logUname").value;
    var password = document.getElementById("logPsw").value;
    $.getJSON("https://iceberger.ey.nz/api.php?callback=?", "method=login&email=" + name + "&password=" + password, function(data) {
      console.log(data);
      if (data['success']) {
        login(data['user'], data['name']);
      }
    });

    // return false;
  });

  $("#register_submit").click(function(event) {
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
