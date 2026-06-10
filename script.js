
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.getElementById("wishlistCount").innerText =
    wishlist.length;

function show(index, count){

    for(let i=1; i<=5; i++){
        document.getElementById(`star${index}-${i}`).style.color = "black";
    }

    for(let i=1; i<=count; i++){
        document.getElementById(`star${index}-${i}`).style.color = "gold";
    }

    document.getElementById(`result${index}`).innerText = count + "/5";
}

function buy(index){
    if(!items[index]) return;

    alert("You are buying " + items[index].name);
}

let quantities = [1,1,1,1];

function increase(index){
    quantities[index]++;
    document.getElementById(`qty${index}`).innerText = quantities[index];
}

function decrease(index){
    if(quantities[index] > 0){
        quantities[index]--;
        document.getElementById(`qty${index}`).innerText = quantities[index];
    }
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("cartCount").innerText =
     cart.reduce((sum, item) => sum + (item.qty || 0), 0);

function openCart(){
    window.location.href = "cart.html";
}

 function addToCart(index){

    let item = items[index];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(i =>
        i.name === item.name && i.price === item.price
    );

    if(existingItem){
        existingItem.qty = (existingItem.qty || 1) + 1;
    } else {
        cart.push({
            image: item.image,
            name: item.name || "Unknown",
            price: item.price || 0,
            category: item.category || "",
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("cartCount").innerText =
        cart.reduce((sum, item) => sum + (item.qty || 0), 0);

    alert(item.name + " added to cart");
  alert(item.name + " added to cart");
}


function openWishlist(){
    window.location.href = "wishlist.html";
}

function addToWishlist(index){

    let item = items[index];

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let itemIndex = wishlist.findIndex(
        i => i.name === item.name && i.price === item.price
    );

    let heart = document.getElementById(`wish${index}`);

    // Already wishlist lo unte remove cheyyi
    if(itemIndex !== -1){

        wishlist.splice(itemIndex, 1);

        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");

    } else {

        // Wishlist lo lekapothe add cheyyi
        wishlist.push(item);

        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    document.getElementById("wishlistCount").innerText =
        wishlist.length;
}



function toggleSearch(){

    let box = document.querySelector(".search-box");

    box.classList.toggle("active");
}

function searchProducts(){

    console.log("Search Working");

    let input =
    document.getElementById("search").value.toLowerCase();

    let cards =
    document.querySelectorAll(".card");

    for(let i=0; i<cards.length; i++){

        let name =
        cards[i].querySelector("h2").innerText.toLowerCase();

        if(name.includes(input)){
            cards[i].style.display = "block";
        }
        else{
            cards[i].style.display = "none";
        }
    }
}



let items = [
    {
        image: "./image/pexels-onkar-salvi-28181962-11100267.jpg",
        name: "shirt",
        price: 1500,
        category: "clothing"
    },
    {
        image: "./image/pexels-onkar-salvi-28181962-11546650.jpg",
        name: "shirts",
        price: 500,
        category: "clothing"
    },
    {
        image: "./image/pexels-ushindinamegabe-6098254.jpg",
        name: "watchs",
        price: 1200,
        category: "Accessories"
    },
    {
        image: "./image/watch.jpg",
        name: "watch",
        price: 1000,
        category: "Accessories"
    },
    
    {
        image: "./image/Men shoes.jpg",
        name: " Men shoes",
        price: 1500,
        category: "Footwear"
    },
    {
        image: "./image/Men Shoes (2).jpg",
        name: "MEN shoes",
        price: 500,
        category: "Footwear"
    },
    {
        image: "./image/women shoes.jpg",
        name: "women shoes",
        price: 400,
        category: "Footwear"
    },
    {
        image: "./image/women shoes 2.jpg",
        name: "women shoes",
        price: 550,
        category: "Footwear"
    },
    {
        image: "./image/makeups.jpg",
        name: " makeup",
        price: 250,
        category: "makeup"
    },

    {
        image: "./image/makeup breshes.jpg",
        name: "makeup brushes",
        price: 550,
        category: "makeup"
    }

];


let container = document.getElementById("content");

for (let i = 0; i < items.length; i++) {

    let isWishlisted = wishlist.some(
        w => w.name === items[i].name && w.price === items[i].price
    );

    container.innerHTML += `
    <div class="card"
         style="text-align:center;cursor:pointer;"
         onclick="showDetails(${i})">

        <img src="${items[i].image}"
             style="height:180px;width:100%;border-radius:10px;">

        <h2>${items[i].name}</h2>
        <h3>₹${items[i].price}</h3>
        <p>${items[i].category}</p>

        <div class="wishlist-icon">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"
               id="wish${i}"
               onclick="event.stopPropagation();addToWishlist(${i})"></i>
        </div>

        <div>
            <i class="fa-solid fa-star" id="star${i}-1"
               onclick="event.stopPropagation();show(${i},1)"></i>

            <i class="fa-solid fa-star" id="star${i}-2"
               onclick="event.stopPropagation();show(${i},2)"></i>

            <i class="fa-solid fa-star" id="star${i}-3"
               onclick="event.stopPropagation();show(${i},3)"></i>

            <i class="fa-solid fa-star" id="star${i}-4"
               onclick="event.stopPropagation();show(${i},4)"></i>

            <i class="fa-solid fa-star" id="star${i}-5"
               onclick="event.stopPropagation();show(${i},5)"></i>
        </div>

        <p id="result${i}">0/5</p>

        <button onclick="event.stopPropagation();buy(${i})">
            BUY
        </button>

        <button onclick="event.stopPropagation();addToCart(${i})">
            Add to Cart
        </button>

    </div>
    `;
}
document.getElementById("search")
.addEventListener("keyup", searchProducts);

function showDetails(index){

    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(items[index])
    );

    window.location.href = "productdetails.html";
}

function toggleUserMenu(event){
    event.stopPropagation();
    document.getElementById("userMenu")
            .classList.toggle("show");
}

function goProfile(){
    window.location.href = "profile.html";
}

function goOrders(){
    window.location.href = "orders.html";
}

function logout(){
    alert("Logged Out Successfully");
    window.location.href = "login.html";
}

document.addEventListener("click", function(event){

    let menu = document.getElementById("userMenu");
    let userIcon = document.querySelector(".fa-user");

    if(
        menu &&
        userIcon &&
        !menu.contains(event.target) &&
        !userIcon.contains(event.target)
    ){
        menu.classList.remove("show");
    }
});