let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close")
let body = document.querySelector("body")
let productsCompHTML = document.querySelector(".container")
let listCart = document.querySelector(".listcart")
let iconCartSpan = document.querySelector(".cart1")

let productsComp = []
let cart = []

iconCart.addEventListener("click", () => {
    body.classList.add("showcart")
})

closeCart.addEventListener("click", () => {
    body.classList.remove("showcart")
})



// FETCHING DATA USING MAP


// fetch(json)
//     .then((r) => { return r.json() })
//     .then((data) => {
//         // console.log(data);
//         data.map((product) => {
//             const { id, name, image, price } = product;

//             productsComp.innerHTML += `
//             <div class="card">
// <img src=${image}>
// <div class="txt1">
//     <h3>${name}</h3>
//     <p>${price}</p>
//     <div class="btn1">
//         <button class="button">Buy now</button>
//         <button class="button addCart">Add to Cart</button>
//     </div>
// </div>
//             </div>
//             `
//         })
//     })

const addDatatoHTML = () => {
    productsCompHTML.innerHTML = "";
    if (productsComp.length > 0) {
        productsComp.forEach(product => {
            let newProduct = document.createElement('div')
            newProduct.dataset.id = product.id;
            newProduct.classList.add('card')
            newProduct.innerHTML = `
            
                  <img src=${product.image}>
                <div class="txt1">
                    <h3>${product.name}</h3>
                    <p>Rs. ${product.price}</p>
                </div>
                <button class="button">Buy now</button>
                <button class="button addCart">Add to Cart</button>
               
            `
            productsCompHTML.appendChild(newProduct)
        })
    }
}

productsCompHTML.addEventListener('click', (e) => {
    let positionClick = e.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addtoCart(product_id)
    }
})

const addtoCart = (product_id) => {
    let positionCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }]
    }
    else if (positionCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }
    else {
        cart[positionCart].quantity = cart[positionCart].quantity + 1;
    }
    console.log(cart);
    addCartToHTML()
    addCartToMemory()
}

const addCartToMemory = () => {
    localStorage.setItem('cart_1', JSON.stringify(cart))
}

const addCartToHTML = () => {
    listCart.innerHTML = "";
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(cart_1 => {
            let newCart = document.createElement('div')
            newCart.dataset.id = cart_1.product_id;
            totalQuantity = totalQuantity + cart_1.quantity;
            let positionProduct = productsComp.findIndex((value) => value.id == cart_1.product_id)
            let info = productsComp[positionProduct]
            newCart.classList.add('item')
            newCart.innerHTML = `
            
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalprice">
               Rs. ${info.price * cart_1.quantity}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cart_1.quantity}</span>
                <span class="plus">></span>
            </div>
               
            `
            listCart.appendChild(newCart)
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCart.addEventListener("click", (e) => {
    let positionClick = e.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type='minus';
        if(positionClick.classList.contains('plus')){
            type='plus'
        }
        console.log(product_id);
        changeQuantity(product_id,type)
    }
})

const changeQuantity=(product_id,type)=>{
    let positionItemInCart = cart.findIndex((value)=> value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity +1;
                break;
        
            default:
                let valuChange = cart[positionItemInCart].quantity-1;
                if(valuChange>0){
                    cart[positionItemInCart].quantity = valuChange;
                }
                else{
                    cart.splice(positionItemInCart,1)
                }
                break;
        }
    }
    addCartToMemory()
    addCartToHTML()
}

const initApp = () => {
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            productsComp = data;
            console.log(productsComp);
            addDatatoHTML()

            //get cart from memory

            if (localStorage.getItem('cart_1')) {
                cart = JSON.parse(localStorage.getItem('cart_1'));
                addCartToHTML();
            }
        })
}
initApp();