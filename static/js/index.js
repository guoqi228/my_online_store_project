$.get('../../components/header.html', function(response) {
  $("#nav").html(response);
})

function showItems(response) {
  console.log(response);
  console.log(response.items.length)
  var item = "";
  for (let i = 0; i < response.items.length; i ++) {
    var id = response.items[i].id;
    var name = response.items[i].name;
    var price = response.items[i].price;
    var description = response.items[i].description;
    item += `<div id=${id} class="product-card"><div class="card"><div class="card-body"><img class="card-img-top" src="https://picsum.photos/g/200?random" alt="item img"><p>Here is some description of the item, here is some description of the item.</p><p class="p-normal">${name}<br>Price: ${price}</p><input class="btn btn-primary" type="submit" value="Add to cart"></div></div></div></div></div>`;
  }
  $("#show-items").html(item);
}
$.get('../../assets/items.json', showItems);
