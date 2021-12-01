async function getData() {
    const URL = "https://61435a41c5b553001717cf2f.mockapi.io/api/challenge/jobs";

    await fetch(URL)
    .then(res => {
        if (res.status >= 400) {
            throw new Error("Bad response from server");
        }
        return res.json();
    })
    .then(data => {       
        console.log(data);
        addElements(data);        
        document.body.classList.add("loaded");
    })
    .catch(err => {
        console.error(err);
    });
}

getData();

function addElements(items) {
    const targetContainer = document.querySelector(".container");
    
    items.forEach(elem => {            
        let newElem = createElement(elem);
        targetContainer.appendChild(newElem);
    });    
}

function createElement(elem) {    
    let newElem = document.createElement("div");
    newElem.classList.add("item");
    
    for (item in elem) {
        if (item == "id") {
            newElem.setAttribute("id", elem[item]);
        } else {
            let newElemItem = document.createElement("p");
            newElemItem.classList.add(item);
            newElemItem.innerHTML = elem[item];
            newElem.appendChild(newElemItem);
        }        
    }

    let button = document.createElement("button");
    button.classList.add("item-cta");
    button.innerText = "Apply";
    button.addEventListener("click", () => {
        console.log("Click");
        initAlert(elem["job"]);
    })
    newElem.appendChild(button);

    return newElem;
}

function initAlert(value) {
    alert(value);
}