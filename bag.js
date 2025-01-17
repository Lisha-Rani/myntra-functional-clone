const CONVENIENCE_FEE=99;
let bagItemObject;
onLoad();
function onLoad(){
    loadBagItemObject();
    displayBagItems();
    displayBagSummary();
}


function displayBagSummary(){
    let bagSummaryElement=document.querySelector('.bag-summary');

    let totalItems=bagItemObject.length;
    let totalMRP=0;
    let totalDiscount = 0;
    let finalpayment=0;
    
    
    bagItemObject.forEach(bagItem=>{
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price-bagItem.current_price;

    });
    
    
    finalpayment=totalMRP-totalDiscount+CONVENIENCE_FEE;
    if(bagItemObject.length==0)
        bagSummaryElement.innerHTML='';
    else{
    bagSummaryElement.innerHTML=`
    <div class="price-details">PRICE DETAILS (${totalItems} item)</div>
                <div class="total-mrp">
                    <span class="mrp">TOTAL MRP</span>
                    <span class="mrp-value">RS ${totalMRP} </span>
                </div>
                <div class="discount-mrp">
                    <span class="discount-on-mrp">Discount on MRP</span>
                    <span class="mrp-discount-value">-RS ${totalDiscount} </span>
                </div>
                <div class="convenience-fee">
                    <span class="fee">Convenience Fee</span>
                    <span class="fee-amount">RS ${CONVENIENCE_FEE}</span>
                </div>
                <hr>
                <div class="total">
                    <span class="total-amount">Total Amount</span>
                    <span class="total-amount-value">RS ${finalpayment} </span>
                </div>
                <div class="place-order">
                    <button class="place-order-button">PLACE ORDER</button>
                </div>`;}
            }
             

function loadBagItemObject(){
     bagItemObject=bagItems.map(itemId=>{
       for(let i=0;i<items.length;i++){
        if(itemId==items[i].id)
            return items[i];
       }
     })
}

function displayBagItems(){
    let containerElement=document.querySelector('.product_container');
    let innerHTML='';
    bagItemObject.forEach(bagItem=>{
        innerHTML+=generateHtml(bagItem);
    });
    containerElement.innerHTML=innerHTML;
}

function deleteItem(itemId){
   bagItems= bagItems.filter(bagitemid => bagitemid !=itemId);
   localStorage.setItem('bagItems',JSON.stringify(bagItems));
   loadBagItemObject();
   displayBagItem();
   displayBagItems();
   displayBagSummary();
}

function generateHtml(items){
    return `<div class="bag-item-container">
    <div class="product_image">
    
    <img src="${items.image}" class="product-image"></div>
            <div class="description">
                <div class="company-name">${items.company}</div>
            <div class="item-name">${items.item_name}</div>
            <div class="price">
                <span class="item-price">Rs ${items.current_price}</span>
                <span class="actual-price">Rs ${items.original_price}</span>
                <span class="discount">(${items.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
                <span class="return-period-days">${items.return} days</span>
                return available
            </div>
             <div class="delivery-period">
             Delivered by
                <span class="delivery-period-days">${items.dilivery_on}</span>
                
            </div>
            </div>
            
            <div class="delete" onclick="deleteItem(${items.id})">✖</div>
            </div>`;
}
