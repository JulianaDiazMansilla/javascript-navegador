let mySpent= [];

let objectFromLocalStorageAsString = localStorage.getItem('savedText');
mySpent = JSON.parse(objectFromLocalStorageAsString);

if (mySpent === null){
  mySpent = [];
}


drawMoneys(mySpent);

drawQuantity(mySpent);

const createSpentFormElement = document.querySelector("#createSpentForm");

createSpentFormElement.addEventListener("submit",  (event) => {
  event.preventDefault();

  const inputElement = document.querySelector("#amountText");
  const textAreaElement = document.querySelector("#conceptText");

  if(isNaN(parseInt(inputElement.value))) {
    quantity = 0;
  }else{
    quantity = parseInt(inputElement.value);
  }

  console.log(quantity);

  mySpent.push({
    quantity: quantity,
    description: textAreaElement.value
})
const mySpentJson = JSON.stringify(mySpent);
localStorage.setItem("savedText", mySpentJson);

  //console.log(mySpent)

  inputElement.value = "";
  textAreaElement.value = "";


  drawMoneys(mySpent);

  drawQuantity(mySpent);

})


function deleteValue(id){
  //console.log(id);
  mySpent.splice(id, 1);
  //console.log(mySpent)

  drawMoneys(mySpent);

  drawQuantity(mySpent);

  const mySpentJson = JSON.stringify(mySpent);
  localStorage.setItem("savedText", mySpentJson);
}


function drawMoneys(moneys) {


  
  const moneyListElements = document.querySelector('.spents-list');
  
  while (moneyListElements.hasChildNodes()) {
    moneyListElements.removeChild(moneyListElements.firstChild);
  }

  moneys.forEach((element,id) => { 
        
    const moneysElement = document.createElement("article");
    
    moneysElement.innerHTML =`
      <div class="spentItemElement"
        <p>${element.description} ${element.quantity}</p>
        <button onclick="deleteValue(${id})">Borrar </button>
      </div>
      `;  
      
  moneyListElements.appendChild(moneysElement);  
  })
  
}


function drawQuantity(moneys) {
  let totalMoney = 0;
  let totalaAddMoney = 0;
  let totalLessMoney = 0;

  const moneyListElements = document.querySelector('.money-list');
  
  while (moneyListElements.hasChildNodes()) {
    moneyListElements.removeChild(moneyListElements.firstChild);
  }

  moneys.forEach((element) => { 
    totalMoney = totalMoney + element.quantity;
    if (element.quantity > 0) {
      totalaAddMoney += element.quantity;
    }
    else{
      totalLessMoney += element.quantity;
    }
    
    


  })
  const moneysElement = document.createElement("article");
  moneysElement.innerHTML =`
    <div id="ActualSpent">
      <p id="displayTotal">TU AHORRO ${totalMoney} €</p>
    </div>

    <div class="ingressspent">
      <div id="AddIngr"> 
          <p id="displayInputs">INGRESOS ${totalaAddMoney} €</p>  
      </div>

      <div id="AddSpent">
          <p id="displaySpends">GASTOS ${totalLessMoney} €</p>
      </div>
    </div>
    `;  
    
  moneyListElements.appendChild(moneysElement);  
}
