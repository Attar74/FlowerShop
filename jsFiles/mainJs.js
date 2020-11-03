$(function(){
    //Variables
    const cartBtn = document.querySelector('.mainCart'); 
    const carticon = document.querySelector('.mainCart .navIcon');
    const closeCartBtn = document.querySelector('.closeCart'); 
    const cartDOM = document.querySelector('.cart'); 
    const cartOverlay = document.querySelector('.cartOverlay');
    const clearCartBtn = document.querySelector('.clearCart'); 
    const cartItems = document.querySelector('.cartItems');
    const cartTotal = document.querySelector('.cartTotal');
    const cartContent = document.querySelector('.cartContent');
    const productsDOM = document.querySelector('.productsCenter');
    
    ////////////////////////////
    
    
    /***************************/
    
    
    /*************************/
    
    setTimeout(function(){
        var love = Array.from(document.querySelectorAll('.shopByCategory .items div .love'));
        
        var parent = Array.from(document.querySelectorAll('.shopByCategory .items div'));
        
        var parent1 = Array.from(document.querySelectorAll('.shopByCategory .itemsSingleFlower div.parent1'));
        
        var love1 = Array.from(document.querySelectorAll('.shopByCategory .itemsSingleFlower div.parent1 span.love'));

        for(let i=0; i < 8; i++){
            parent[i].addEventListener('mouseover', function(e){
                love[i].classList.add('sh');
            })
            parent[i].addEventListener('mouseout', function(e){
                love[i].classList.remove('sh');
            })
            parent1[i].addEventListener('mouseover', function(e){
                love1[i].classList.add('sh');
            })
            parent1[i].addEventListener('mouseout', function(e){
                love1[i].classList.remove('sh');
            })
            love[i].addEventListener('click', function(e){
                let title = e.target.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.innerText;
                let src = e.target.parentElement.nextElementSibling.getAttribute('src');
                console.log(title, src);
                let cartItem = document.querySelector('.cartItem');
                
                let contnent = `<div class="col-12 row pb-3">
                            <img class="img-fluid col-5" src=${src} alt="product" />
                            <div class="col-6">
                                <h4>${title}</h4>
                                <h5>XXX</h5>
                                <span class="remove-item">remove</span>
                            </div>
                            <div class="col-1">
                                <i class="fas fa-plus-square"></i>
                                <p class="item-amount pt-2" style="font-size: 20px">0</p>
                                <i class="fas fa-minus-square"></i>
                            </div>
                        </div>`;
                
                
                cartItem.innerHTML += contnent;
            })
            love1[i].addEventListener('click', function(e){
                console.log(e.target);
            })
        }  
    }, 100);
    
    
    carticon.addEventListener('click',showCart);
    closeCartBtn.addEventListener('click',hideCart);
    
    function showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    function hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    
    
    
    
})