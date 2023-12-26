let tAmount = document.getElementById('total-amount');
let uAmount = document.getElementById('user-amount');
const checkAmountBtn = document.getElementById('check-amount');
const totalAmount = document.getElementById('total-amount-button');
const productTitle = document.getElementById('product-title');
const errorMsg = document.getElementById('buget-error');
const productTitleError = document.getElementById('product-title-error');
const productCostError = document.getElementById('product-cost-error');
const amount = document.getElementById("amount");
const eValue = document.getElementById('expenditure-value');
const bValue = document.getElementById('balance-amount');
const list = document.getElementById('list');

let tempAmt = 0;

// set budget part

totalAmount.addEventListener("click", () => {
    tempAmt = parseFloat(tAmount.value);

    if (isNaN(tempAmt) || tempAmt <= 0) {
        errorMsg.classList.remove("hide");
    } else {
        errorMsg.classList.add("hide");

        amount.innerText = tempAmt;

        bValue.innerText = tempAmt - eValue.innerText;

        tAmount.value = "";
    }
});

// function to enable & disable edit & del btn

const disableBtn = (bool) => {
    let editBtn = document.getElementsByClassName("edit");
    
    Array.from(editBtn).forEach((element) => {
        element.disabled = bool;
    });
};

// function to modify list elements

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBal = bValue.innerText;
    let currentExp = eValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;

    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        uAmount.value = parentAmount;
        disableBtn(true);
    }

    bValue.innerText = parseInt(currentBal) + parseInt(parentAmount);
    eValue.innerText = parseInt(currentExp) - parseInt(parentAmount);

    parentDiv.remove();
};

// function to create list

const listCreator = (expenseName, expenseValue) => {
    // sublist creator
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p>
                                <p class="amount">${expenseValue}</p>`;
    // edit btn 
    let editBtn = document.createElement("button");
    editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");

    editBtn.style.fontSize = "1.2em";
    editBtn.addEventListener("click", () => {
        modifyElement(editBtn, true);
    });

    // del btn
    let deletebtn = document.createElement("button");
    deletebtn.classList.add("fa-solid", "fa-trash-can", "delete");

    deletebtn.style.fontSize = "1.2em";
    deletebtn.addEventListener("click", () => {
        modifyElement(deletebtn);
    });

    sublistContent.appendChild(editBtn);
    sublistContent.appendChild(deletebtn);
    document.getElementById("list").appendChild(sublistContent);
};

// function to add expenditure

checkAmountBtn.addEventListener("click", () => {

    if (!uAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }

    disableBtn(false);

    let expenditure = parseInt(uAmount.value);

    let sum = parseInt(eValue.innerText) + expenditure;
    eValue.innerText = sum;

    const totalBal = tempAmt - sum;
    bValue.innerText = totalBal;

    listCreator(productTitle.value, uAmount.value);

    productTitle.value = "";
    uAmount.value = "";

});