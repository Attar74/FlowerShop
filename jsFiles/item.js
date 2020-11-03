let Url = window.location.href;
let itemDom = document.querySelector('.currentItem');
let id = parseInt(function getItemId(U){
    return U.substr ( Url.indexOf ( '?' ) + 1 )
}(Url));

function getItem(id){
    let products = JSON.parse(localStorage.getItem("products"));
    products.forEach(item => {
        item.id = parseInt(item.id);
    })
    return products.find(item => item.id === id);
}



function displayItem(item){
    
    itemDom.innerHTML += `<div class="imgContainer col-12 col-md-4 p-5 p-md-2 p-lg-2 bg-light">
               <img class="img-fluid rounded" src=${item.imgSrc}>
           </div>
           <div class="info text-center m-auto col-12 col-md-6 row">
                   <p class="titleItem  p-0 pt-3 col-8">FLORIST SELECTION</p>
                   <p class="priceItem  p-0 pt-3 col-4 align-self-center">${item.price}$</p>
                   <button class="btn nextBtn love mt-3 col-12" data-id =${item.id}><i class="far fa-heart p-0"></i> Add to cart</button>
                   <span class="col-12 bg-light mt-2 text-left">
                       <p>PRODUCT DESCRIPTION</p>
                       
                       <p>
                         Beautiful sweet blooms of Lilies,Roses, and Carnation Sprays. Hand wrapped to perfection. Perfect for all occasions.
                       </p>
                       <span>
                       Blooms:
                           <ul>
                               <li>Lilies</li>
                               <li>Shocking Pink Roses</li>
                               <li>Light Pink Carnation Spray</li>
                           </ul>
                            Best Suited For
                       </span>
                       <p>Birthday, Friendship, Romance, Congrats, Love, Apology, Anniversary,  Thank You,</p>
                       <p>Includes:
                        Free Message Card
                        Free Delivery</p>
                        <p>Delivery
                        Same Day Delivery is available if order is placed before 2:00 pm on delivery day

                        Morning and Evening Slot available

                        Available all across the Philippines</p>
                   </span>
           </div>`;
    
    
}







document.addEventListener("DOMContentLoaded", function(){
        let item = getItem(id);
        displayItem(item);
})