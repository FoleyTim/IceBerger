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
  var orderlist = [];
  function addItem(id, name, price) {
    var item = {};
    item['id'] = id;
    item['name'] = name;
    item['price'] = price;
    orderlist.push(item);
    updateDocket();
  }

  function updateDocket() {
    $("#docketitems").empty();

    var totalPrice = 0;

    orderlist.forEach(function (item, index) {
      var listitem = document.createElement("li");
      listitem.appendChild(document.createTextNode(item['name']+" - $"+item['price']));
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

  function removeItem(){
    var index = orderlist.indexOf();

  }


$(document).ready(function() {


  $.getJSON("http://10.140.124.121/iceberger_backend/api.php?callback=?", "method=getinventory&category=6", function(data) {
      $('#Sides').empty();
      data.forEach(function(category) {
        category['items'].forEach(function(item) {
        // console.log(item);
          $('#Sides').append("<div class=\"itemcontainer animate\" onclick=\"addItem("+item['id']+", '"+item['name']+"', "+item['cost']+");\"><div class=\"burgerItem\"><img class=\"donut\" src=\"images/donutburger.png\" alt=\"\" width=\"80%\"></div><h3>"+item['name']+"</h3><h3>$"+item['cost']+"</h3></div>");
        });
      });
    });













  openMenu(null, 'Burgers');

  $("#loginform").submit(function(event) {
    event.preventDefault();

    var name = document.getElementById("logUname").value;
    var password = document.getElementById("logPsw").value;
    $.getJSON("//10.140.124.121/iceberger_backend/login.php?callback=?", "email=" + name + "&password=" + password, function(data) {
      console.log(data);
      if (data['success']) {
        $("#id01").hide();
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

function login() {

}

function logout() {

}

/*Payment*/
// var owner = $('#owner'),
//   cardNumber = $('#cardNumber'),
//   cardNumberField = $('#card-number-field'),
//   CVV = $("#cvv"),
//   mastercard = $("#mastercard"),
//   confirmButton = $('#confirm-purchase'),
//   visa = $("#visa"),
//   amex = $("#amex");
// cardNumber.payform('formatCardNumber');
// CVV.payform('formatCardCVC');
//
// cardNumber.keyup(function() {
//     amex.removeClass('transparent');
//     visa.removeClass('transparent');
//     mastercard.removeClass('transparent');
//
//     if ($.payform.validateCardNumber(cardNumber.val()) == false) {
//         cardNumberField.removeClass('has-success');
//         cardNumberField.addClass('has-error');
//     } else {
//         cardNumberField.removeClass('has-error');
//         cardNumberField.addClass('has-success');
//     }
//
//     if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
//         mastercard.addClass('transparent');
//         amex.addClass('transparent');
//     } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
//         mastercard.addClass('transparent');
//         visa.addClass('transparent');
//     } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
//         amex.addClass('transparent');
//         visa.addClass('transparent');
//     }
// });
//
// confirmButton.click(function(e) {
//     e.preventDefault();
//
//     var isCardValid = $.payform.validateCardNumber(cardNumber.val());
//     var isCvvValid = $.payform.validateCardCVC(CVV.val());
//
//     if(owner.val().length < 5){
//         alert("Wrong owner name");
//     } else if (!isCardValid) {
//         alert("Wrong card number");
//     } else if (!isCvvValid) {
//         alert("Wrong CVV");
//     } else {
//         // Everything is correct. Add your form submission code here.
//         alert("Everything is correct");
//     }
// });
