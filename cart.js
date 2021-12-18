let data = JSON.parse(localStorage.getItem("cartItems"));

var cartItem = localStorage.setItem("cartItem", JSON.stringify(data));

var showCartaItem = JSON.parse(localStorage.getItem("cartItem"));

displayItem(showCartaItem);

// import logo from './logo/logo.js'
// document.querySelector(#mainlogo).innerHTML=logo()

function togglemenu() {
  document.getElementById("sideBar").classList.toggle("active");
}

function letsChat() {
  document.getElementById("letsChat").classList.toggle("active");
}

//   var cartItem = JSON.parse(localStorage.getItem("BBcartItems"));
//   displayItem(cartItem);
//   console.log(cartItem.length);

function displayItem(showCartaItem) {
  document.querySelector("#displayItem").innerHTML = "";

  showCartaItem.forEach(function (item, index) {
    let img = document.createElement("img");
    img.setAttribute("src", item.imgPrime);
    img.setAttribute("class", "itemImg");

    let h1 = document.createElement("h1");
    h1.textContent = item.name;
    h1.setAttribute("class", "name");

    let h2 = document.createElement("h2");
    h2.textContent = "₹" + item.oriPrice;
    h2.setAttribute("class", "originalPri");

    let h3 = document.createElement("h2");
    h3.textContent = " ₹" + item.curPrice;
    h3.setAttribute("class", "discountPri");

    let divPush = document.createElement("div");
    divPush.setAttribute("class", "divPush");

    let hr = document.createElement("hr");
    hr.setAttribute("class", "itemhr");

    let logo1 = document.createElement("img");
    logo1.setAttribute(
      "src",
      "https://tse3.mm.bing.net/th?id=OIP._2jeUMPAHmeCOTFxDHXu7gHaHa&pid=Api&P=0&w=300&h=300"
    );
    logo1.setAttribute("class", "logo2");

    let logo2 = document.createElement("img");
    logo2.setAttribute(
      "src",
      "https://tse4.mm.bing.net/th?id=OIP.Yi7bOkqscRvsZxr6fknCiwHaHa&pid=Api&P=0&w=300&h=300"
    );
    logo2.setAttribute("class", "logo2");

    logo2.addEventListener('click', function(){
      remove(item, index);
    });

    function remove(item, index){
     
    showCartaItem.forEach((el) => {
      if(el.name == item.name){
        showCartaItem.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(showCartaItem));
        alert("Item Removed From Your Cart");
        window.location.reload();
      }
    })
    }

    let lDiv = document.createElement("div");

    let mDiv = document.createElement("div");
    mDiv.setAttribute("id", "mDiv");

    let priceLine = document.createElement("div");
    priceLine.setAttribute("id", "priceLine");

    let rDiv = document.createElement("div");

    let quantity = document.createElement("select");
    let quantityopt = document.createElement("option");
    quantityopt.innerText = "Quantity";
    quantity.append(quantityopt);
    quantity.setAttribute("id", "itemQuantityOpt");
    for (let i = 1; i <= 5; i++) {
      let quantityNo = document.createElement("option");
      quantityNo.innerText = [i];
      quantity.append(quantityNo);

      quantity.addEventListener('change', update);
    }

     function update(){
         let count = 0;
         if(count == 0){

        item.quantity = quantity.value;
        console.log(item.quantity);
        localStorage.setItem("cartItems", JSON.stringify(showCartaItem));
        console.log(item.quantity);
        alert(`The Quantity is updated to ${item.quantity}`)
        window.location.reload();
        count++;
         }
      }

    priceLine.append(h3, h2);
    lDiv.append(img);
    mDiv.append(h1, priceLine, quantity, hr);
    rDiv.append(logo1, logo2);

    divPush.append(lDiv, mDiv, rDiv);

    document.getElementById("displayItem").append(divPush);
  });
}

// ================  total calculate fumction ========

var total = showCartaItem.reduce(function (startingValue, currentValue) {
  return startingValue + Number(currentValue.oriPrice * currentValue.quantity);
}, 0);

var actual = showCartaItem.reduce(function (startingValue, currentValue) {
  return startingValue + Number(currentValue.curPrice * currentValue.quantity);
}, 0);
localStorage.setItem("totalHPAmount", JSON.stringify(total));

document.querySelector(
  "#cartCount"
).innerHTML = `<h3 id="totalDisplayDiv">My Cart (${showCartaItem.length} items)</h3>  `;

document.querySelector("#totalMRP").innerHTML = ` ₹${total} `;

//   ================finalPay =================

var finalPay = showCartaItem.reduce(function (a, b) {
  return a + Number(b.curPrice * b.quantity);
}, 0);
localStorage.setItem("finalPay", JSON.stringify(finalPay));

document.querySelector("#finalPay").innerHTML = `₹${finalPay}`;

document.querySelector("#payButton").innerHTML =
  "Proceed to Pay: " + `  ₹${actual}`;

//   let proceedToPay = document.getElementById('payButton');
//  proceedToPay.onclick = function(){
//    window.location.href = "/Address.html";
//  }

// =================  total Dis  ============

var discount = total - actual;
localStorage.setItem("discount", JSON.stringify(discount));

document.querySelector("#tatalDis").innerHTML = ` ₹${discount}`;





function couponClicked(){
  document.querySelector("#afterApplyCoupon").innerHTML = ` <img
  
        
           <img 
           src="https://img10.hkrtcdn.com/react/static/media/cart/perct.svg"
           alt=""
         />
         <p>MDC Applied</p>
         <span>REMOVE</span>
           
          
         `
}

function setColor(e, btn, color) {
  var target = e.target,
      count = +target.dataset.count;
  
   target.style.backgroundColor = count === 1 ? "#7FFF00" : '#FFFFFF';
   target.dataset.count = count === 1 ? 0 : 1;
}

// For payment part

let prices = {
  total:total,
  payable: finalPay,
  discount:discount
}

localStorage.setItem("priceAmounts", JSON.stringify(prices));







// console.log("discount:" ,discount)

// var sum = 0;
// var totalQty = 0;

// sum = 0;
// totalQty = 0;
// cartItem.forEach((item) => {
//       sum += Number(item.qty) * Number(item.price);
//       totalQty += Number(item.length);
//       console.log(totalQty)
//     });

//     calculateTotal(sum, totalQty);

//     function calculateTotal(sum, totalQty) {
//         // cartCount.innerText = "Subtotal (" + totalQty + " item):" + " ₹ " + sum;

// }



// Coupon discount



let btn = document.getElementById('button');

let mid = 0;
let giveDiscount = () => {
  let coupon = document.getElementById('coupon').value;
   
   if(mid == 0 && coupon == "masai30"){

  let total = finalPay;

  total = total - (0.3 *  total);

  alert("Coupon Applied Successfully");

  document.querySelector("#finalPay").innerHTML = `₹${total}`;

  mid++;
  console.log(total);
   }else if(mid > 0 && coupon == "masai30"){
     alert("Coupon Already Applied");
   }
   else{
     alert("Invalid Coupon Code");
   }

}

btn.addEventListener('click', giveDiscount);


// 
document.getElementById('Mlogo').onclick = function(){
  window.location.href = "index.html";
}