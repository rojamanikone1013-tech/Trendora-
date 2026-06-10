let product =
JSON.parse(localStorage.getItem("selectedProduct"));

let details =
document.getElementById("details");

details.innerHTML = `
    <img src="${product.image}">
    <h2>${product.name}</h2>
    <h3>₹${product.price}</h3>
    <p>Category: ${product.category}</p>

    <button class="back-btn" onclick="history.back()">
        Back
    </button>
`;

function showDetails(index){

    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(items[index])
    );

    window.location.href = "product-details.html";
}