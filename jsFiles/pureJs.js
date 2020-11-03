    
    const carticon = document.querySelector('.mainCart .navIcon');
    const productsDOM = document.querySelector('.shopByCategory .items');
    const userName = document.querySelector('a.userName');
    const clearCartBtn = document.querySelector('.clearCart');
    const cartContent = document.querySelector('.cartContent');
    let Islogged = localStorage.getItem('isLogged');

    // Cart 
    let cart = [];
    // buttons
    let buttonsDOM = [];
    // Items
    let allItemsDom = [];
    /********************************/
    
    // getting the products 
    class Products {
        async getProducts(){  
            try{
                let result = await fetch("itemData.txt");
                let data = await result.json();
                let products = data;
                products.map(item => {
                    const title = item.title;
                    const imgSrc = item.imgSrc;
                    const price = item.price;
                    return {title, imgSrc, price};
                })
                return products;
            }catch{
                console.log(error);
            }
            
            /*var xhr = new XMLHttpRequest();
            var xhr2 = new XMLHttpRequest();
            xhr.open('get', 'itemData.txt');
            xhr2.open('get', 'itemData2.txt');
            xhr.send();
            xhr2.send();
            
            ////ajax first call
            $.ajax({
                     url:"itemData.txt",
                     method:"get",
                     success:function(res){
                        var res = xhr.responseText;
                        res = JSON.parse(xhr.responseText);
                        var mainSection = $('.shopByCategory .items');
                        for (var i = 0; i < 8; i++) {

                                var content = `<div class="col-6 col-md-3 p-2">
                          <span class="position-absolute pl-1 pt-1" data-i=index${i}>
                              <a class="text-light"><p class="title">${res[i].title}</p></a>
                          </span>
                          <span class="love position-absolute p-0 m-0" style="bottom:40px;" data-i=index${i}>
                              <i class="far fa-heart pl-2 pr-1"></i>
                              <span class="pr-2" data-i=index${i}>Add to cart </span>
                          </span>

                          <img class="img-fluid" src=${res[i].imgSrc}>
                       </div>`;

                            mainSection.append(content);
                         }
                     },
                     error:function(erro){
                         console.log(erro)
                     }
            })
            ////ajax second call
            $.ajax({
                     url:"itemData2.txt",
                     method:"get",
                     success:function(res){
                        var res2 = xhr2.responseText;
                        res2 = JSON.parse(xhr2.responseText);
                        var mainSection2 = $('.itemsSingleFlower');
                        for (var i = 0; i < 8; i++) {

                            var content = `<div class="parent1 col-6 col-md-3 p-0 pb-3" data-i=index${i}>
                            <span class="love position-absolute p-0 m-0" style="bottom:140px;" data-i=index${i}>
                              <i class="far fa-heart pl-2 pr-1"></i>
                              <span class="pr-2" data-i=index${i}>Add to cart </span>
                          </span>
                           <img class="img-fluid" src="${res2[i].imgSrc}">
                           <div class="col-12 p-0 text-center">
                              <div class="review">
                                    ${res2[i].review}
                               </div>
                               <p class="m-0">${res2[i].numberOfReviews} Reviews</p>
                               <p class="itemTitls m-0">${res2[i].title}</p>
                               <p class="itemPrice m-0">${res2[i].price}<span class="oldItemPrice"> ${res2[i].oldPrice}</span></p>
                           </div>
                       </div>`;
                            mainSection2.append(content);
                         }
                     },
                     error:function(erro){
                         console.log(erro)
                     }
            })
            ///////////////////////
        }*/
            
    }
}

    
    // display items 
    class Ui {
        displayProducts(products){
            let res = '';
            products.forEach(product => {
                res += `<div class="item col-6 col-md-3 p-2" data-id =${product.id}>
                          <span class="position-absolute pl-2 pt-2">
                              <a class="text-light"><p class="title mb-0">${product.title}</p></a>
                              <p class="price text-light">${product.price}$</p>
                          </span>
                          <button class="btn love position-absolute p-0 m-0 pr-2 pl-1" data-id =${product.id} style="bottom:40px;">
                              <i class="far fa-heart p-0"></i> Add to cart</button>
                          <img class="img-fluid" src=${product.imgSrc}>
                       </div>`
            });
            const productsDOM = document.querySelector('.shopByCategory .items');
            productsDOM.innerHTML = res; 
        }
        getBagBtns(){
            const btns = Array.from(document.querySelectorAll('.love'));
            const allItems = Array.from(document.querySelectorAll('.item'));
            buttonsDOM = btns;
            allItemsDom = allItems;
            allItems.forEach(item => {
               item.addEventListener('click', (e)=>{
                   if(e.target.innerText != 'Already in cart' && Islogged == 'true') {
                        let id = item.dataset.id;
                        window.open(`item.html?${id}`, '_self');   
                   }
               })
            });
            btns.forEach(btn => {
                let id = btn.dataset.id;
                let inCart = cart.find(item => {
                    item.id === id;
                });
                if(inCart){
                    btn.innerText = 'Already in cart';
                    btn.disabled = true;
                }
                btn.addEventListener('click', (e)=>{
                    if(Islogged == 'true'){
                        e.target.innerText = "Already in cart";
                        e.target.disabled = true;
                        // get product from products 
                        let cartItem = {...Storage.getProduct(id), amount: 1};
                        // add product to the cart
                        cart.push(cartItem); //cart = [...cart, cartItem];
                        // save cart to local storage
                        Storage.saveCart(cart);
                        // set cart values 
                        this.setCartValues(cart);
                        // display cart item 
                        this.addCartItem(cartItem);
                        // show the cart 
                        this.showCart();   
                    } else{
                        alert('you have to login first');
                    }
                });
            });
        }
        getAllItems(){
            const allItems = document.querySelectorAll(".shopByCategory  .items .item");
            
            allItems.forEach( item => {
                item.addEventListener('mouseover', ()=> {
                    item.children[1].style.opacity = 1;
                });
                item.addEventListener('mouseout', ()=> {
                    if(item.children[1].innerText == " Add to cart")
                    item.children[1].style.opacity = 0;
                });
            });
            
                
        }
        setCartValues(cart){
            let tempTotal = 0;
            let itemsTotal = 0;
            const cartTotal = document.querySelector('.cartTotal');
            const cartItems = document.querySelector('.cartItems');
            cart.map(item => {
                tempTotal += item.price * item.amount;
                itemsTotal += item.amount;
            });
            cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
            cartItems.innerText = itemsTotal;
        }
        addCartItem(item){
            const div = document.createElement('div');
            div.classList.add('cartItem');
            div.innerHTML += `<div class="col-12 row mb-2">
                            <img class="img-fluid col-5 d-none d-sm-block" src="${item.imgSrc}" alt="product" />
                            <div class="col-6 col-sm-5">
                                <h4>${item.title}</h4>
                                <h5>$${item.price}</h5>
                                <a class="removeItem" data-id=${item.id} style="cursor:pointer; color:#d53974;">Remove Item</a>
                            </div>
                            <div class="col-1 offset-4 offset-sm-0">
                                <i class="fas fa-plus-square" data-id=${item.id}></i>
                                <p class="itemAmount pt-2" style="font-size: 20px;">${item.amount}</p>
                                <i class="fas fa-minus-square" data-id=${item.id}></i>
                            </div>
                        </div>`;
             
             cartContent.appendChild(div);
        }
        
        showCart(){
            if(Islogged == 'true'){
                 const cartOverlay = document.querySelector('.cartOverlay');
                cartOverlay.classList.add('transparentBcg');
                const cartDOM = document.querySelector('.cart'); 
                cartDOM.classList.add('showCart');   
            } else{
                alert('You have to log in first');
            }
        }
        setupApp(){
            cart = Storage.getCart();
            this.setCartValues(cart);
            this.populateCart(cart);
            const cartBtn = document.querySelector('.mainCart');
            const closeCartBtn = document.querySelector('.closeCart'); 
            cartBtn.addEventListener('click',this.showCart);
            closeCartBtn.addEventListener('click',this.hideCart);
        }
        populateCart(cart){
            cart.forEach(item => {
                this.addCartItem(item)
            })
        }
        hideCart(){
            const cartOverlay = document.querySelector('.cartOverlay');
            cartOverlay.classList.remove('transparentBcg');
            const cartDOM = document.querySelector('.cart'); 
            cartDOM.classList.remove('showCart');
        }
        cartLogic(){
            clearCartBtn.addEventListener('click', ()=>{
                this.clearCart();
            });
            // cart functionality 
            cartContent.addEventListener('click', e => {
                if(e.target.classList.contains("removeItem")){
                    let removeItem = e.target;
                    let removeItemId = removeItem.dataset.id;
                    removeItem.parentElement.parentElement.parentElement.remove();
                    this.removeItem(removeItemId);
                } else if(e.target.classList.contains("fa-plus-square")){
                    let addAmount = e.target;
                    let id = addAmount.dataset.id;
                    let item = cart.find(item => item.id === id);
                    item.amount++;
                    addAmount.nextElementSibling.innerText++;
                    this.setCartValues(cart);
                    Storage.saveCart(cart);
                }else if(e.target.classList.contains("fa-minus-square")){
                    let addAmount = e.target;
                    let id = addAmount.dataset.id;
                    let item = cart.find(item => item.id === id);
                    item.amount--;
                    e.target.previousElementSibling.innerText--;
                    this.setCartValues(cart);
                    if(item.amount < 1){
                        cartContent.removeChild(addAmount.parentElement.parentElement.parentElement);
                        this.removeItem(id);
                        this.hideCart();
                        this.getSingleBtn(id).style.opacity = 0;
                    }
                    Storage.saveCart(cart);
                }
            })
        }
        
        clearCart(){
            let cartItems = cart.map(item => item.id);
            const btns = document.querySelectorAll('.shopByCategory .items .item button');
            cartItems.forEach(id => this.removeItem(id));
            while(cartContent.children.length >0){
                cartContent.removeChild(cartContent.children[0])
            }
            this.hideCart();
            btns.forEach(btn =>btn.style.opacity = 0);
        }
        removeItem(id){
            cart = cart.filter(item => item.id !== id);
            this.setCartValues(cart);
            Storage.saveCart(cart);
            let btn = this.getSingleBtn(id);
            btn.disabled = false;
            btn.innerHTML = `<i class="far fa-heart p-0"></i> Add to cart</button>`;
        }
        getSingleBtn(id) {
            return buttonsDOM.find(button => button.dataset.id === id);
        }
        
    }
    
    //local storage 
    class Storage {
        static saveProduct(products){
            localStorage.setItem("products", JSON.stringify(products));
        }
        static getProduct(id){
            let products = JSON.parse(localStorage.getItem("products"));
            return products.find(product => product.id === id);
        }
        static saveCart(cart){
            localStorage.setItem('cart', JSON.stringify(cart)); 
        }
        static getCart(){
            return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
        }
    }
    
    function getUserName(userName){
        let Url = window.location.href;
        if(Islogged == 'true'){
            var tmp = Url.substr ( Url.indexOf ( '?' ) + 1 );
            userName.innerText = tmp;
        } else{
            userName.innerHTML = `<a href='login.html'>logIn </a>`;
        }
    }
    document.addEventListener("DOMContentLoaded", function(){
        const ui = new Ui();
        const products = new Products();
        // setup app
        ui.setupApp();
        // get all products 
        products.getProducts().then(products => {
            ui.displayProducts(products)
        // save to local storage
        Storage.saveProduct(products);
        }).then(()=>{
            ui.getBagBtns();
            ui.cartLogic();
            ui.getAllItems();
        });
        if(userName != null)getUserName(userName);
        
    })