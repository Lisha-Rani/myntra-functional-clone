 let bagItems;
 onLoad();

 function onLoad(){
    bagItemsStr=localStorage.getItem('bagItems');
    bagItems=bagItemsStr ? JSON.parse(bagItemsStr):[];
 displayitemsOnHomePage();
 displayBagItem();
 }

 function addToBag(itemId){
     bagItems.push(itemId);
     localStorage.setItem('bagItems',JSON.stringify(bagItems));
     displayBagItem();
 }

function displayBagItem(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if(bagItems.length>0){
        bagItemCountElement.style.visibility='visible';
    bagItemCountElement.innerText=bagItems.length;
    }
else
bagItemCountElement.style.visibility= 'hidden' ;
}

 function displayitemsOnHomePage(){
 let itemscontainerElement=document.querySelector('.items-container');
if(!itemscontainerElement)
    return;
 let innerHtml='';
items.forEach(item=>{
  innerHtml +=`<div class="item-container">
            <img src="${item.image}" class="item-image" alt="item image">
            <div class="rating">${item.rating.stars}⭐|${item.rating.count}</div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="item-price">Rs ${item.current_price}</span>
                <span class="actual-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
                <button class="add-to-cart" onclick="addToBag(${item.id});">Add to Bag</button>
        </div>`;
})
itemscontainerElement.innerHTML=innerHtml;
 }
