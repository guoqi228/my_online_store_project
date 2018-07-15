var empty = `<li id="empty" class="dropdown-item inline list-group-item d-flex align-items-center flex-center"> Your cart is empty</li>`;
$.get('../../components/header.html', function(response) {
  var check_out = `<li class="dropdown-item inline list-group-item d-flex align-items-center flex-center"><button id="checkout" type="button" class="btn btn-primary">Check out</button></li>`;
  $("#nav").html(response);
  $("#cart").html(check_out);
  $("#cart").prepend(empty);
})

var item_obj = {"items":[]};
function showItems(response) {
  var all_items = response;
  console.log(all_items);
  console.log(response.items.length)
  var item = "";
  //var item_obj = {"items":[]};
  for (let i = 0; i < response.items.length; i ++) {
    var id = response.items[i].id;
    var name = response.items[i].name;
    var price = response.items[i].price;
    var description = response.items[i].description;
    item_obj.items.push({"id":id, "name":name, "price":price, "quantity": 0});
    item += `<div id=${id} class="product-card"><div class="card"><div class="card-body"><img class="card-img-top" src="https://picsum.photos/g/150?random" alt="item img"><p>Here is some description of the item, here is some description of the item.</p><p class="p-normal">${name}<br>Price: ${price}</p><button id="btn-${id}" class="btn btn-primary add-item" type="button" onclick="addToCart(${id})">Add to cart</button></div></div></div></div></div>`;
  }
  console.log(item_obj);
  $("#show-items").html(item);
}
$.get('../../assets/items.json', showItems);

function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}

var cart = {};
var item_in_cart = "";

function addToCart(id) {
  console.log("ID:")
  console.log(id);
  let index = id - 1;
  let item_name = item_obj.items[index].name;
  let item_price = item_obj.items[index].price;
  //item_obj.items[index].quantity += 1;
  //let item_quantity = item_obj.items[index].quantity;
  if (cart.hasOwnProperty(id)) {
    cart[`${id}`] += 1;
    //$(`#quantity-item-${id}`).text(`${cart[id]}`);
    console.log(cart[`${id}`]);
    $(`#quantity-item-${id}`).text(cart[`${id}`]);
  } else {
    cart[`${id}`] = 1;
    item_in_cart = `<li id="cart-item-${id}" class="dropdown-item inline list-group-item d-flex justify-content-between align-items-center"><a>${item_name}------->${item_price}</a><span id="quantity-item-${id}" class="badge badge-primary badge-pill">${cart[`${id}`]}</span><button class="btn badge badge-pill badge-danger" type="button" onclick="removeFromCart(${id})">remove</button></li>`;
    $("#cart").prepend(item_in_cart);
    alert("Item added to shopping cart!");
    //showCart(item_in_cart);
  }
  let num_of_items = sum(cart);
  if (num_of_items > 0) {
    $("#empty").remove();
    $("#dropdownMenuButton").text(`Shopping cart (${num_of_items})`);
    let new_total = getTotal(cart);
    $("#checkout").text("Total: $" +`${new_total}`+"  "+ "Check out");
  }

  console.log(item_in_cart);
}

function removeFromCart(id) {
  console.log(`cart-item-${id}`);
  $(`#cart-item-${id}`).slideUp("slow");
  $(`#cart-item-${id}`).remove();
  delete cart[`${id}`];
  let num_of_items = sum(cart);
  if (num_of_items > 0) {
    $("#empty").remove();
    $("#dropdownMenuButton").text(`Shopping cart (${num_of_items})`);
    let new_total = getTotal(cart);
    $("#checkout").text("Total: $" +`${new_total}`+"  "+ "Check out");
  } else {
    $("#cart").prepend(empty);
    $("#dropdownMenuButton").text(`Shopping cart`);
    $("#checkout").text(`Check out`);
  }
}

function getTotal(cart) {
  let total = 0;
  for (key in cart) {
    if (cart.hasOwnProperty(key)) {
      //console.log("ID:"+ key + "value:" + cart[key]);
      let num = cart[key];
      //console.log("num: " + `${num}`);
      let index = key - 1;
      let price  =  item_obj.items[index].price;
      let sub = num * price;
      total += sub
    }
  }
  return total.toFixed(2);
}
