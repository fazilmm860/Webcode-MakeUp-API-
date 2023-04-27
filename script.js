
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const productContainer = document.getElementById("product-container");

const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";

async function getProducts(searchTerm) {
    try {
        const response = await fetch(`${API_URL}?brand=${searchTerm}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function displayProducts(products) {
    productContainer.innerHTML = "";
    if (products.length === 0) {
        productContainer.textContent = "No products found";
    }
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        const productImg = document.createElement("img");
        productImg.src = product.image_link;
        productImg.alt = product.name;
        productDiv.appendChild(productImg);
        const productTitle = document.createElement("h2");
        productTitle.textContent = `${product.brand} - ${product.name}`;
        productDiv.appendChild(productTitle);
        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price}$`;
        productDiv.appendChild(productPrice);
        const productLink = document.createElement("a");
        productLink.href = product.product_link;
        productLink.textContent = "View product";
        productDiv.appendChild(productLink);
        const productDesc = document.createElement("p");
        productDesc.textContent = product.description;
        productDiv.appendChild(productDesc);
        productContainer.appendChild(productDiv);
    });
}

searchBtn.addEventListener("click", async () => {
    const searchTerm = searchInput.value;
    const products = await getProducts(searchTerm);
    displayProducts(products);
});

searchInput.addEventListener("keyup", async (event) => {
    if (event.keyCode === 13) {
        const searchTerm = searchInput.value;
        const products = await getProducts(searchTerm);
        displayProducts(products);
    }
});
