const spinner = document.getElementById('spinner');
const searchBox= document.getElementById('search-box'); 

// spinner
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        spinner.style.display = "block";
    } else {
        spinner.style.display = "none";
    }
};

// search phone
const searchPhones =()=>{
    spinner.style.display="block";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchBox.value}`;
    fetch(url)
    .then(res => res.json())
    .then(data => allPhones(data.data))

}
// all phones
function allPhones(data) {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent ="";
    if(data.length === 0){
        const errorMsg = document.getElementById('error');
        errorMsg.style.display="flex";
        spinner.style.display = "none";
        document.getElementById('device').innerText=searchBox.value;
        }
    else{
        for(phone of data){
            const div = document.createElement('div');            
            div.classList.add("card");
            div.innerHTML = `
            <img src="${phone.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h4 class="card-title">Device : ${phone.phone_name}</h4>
                   <h5 class="card-title">Brand : ${phone.brand}</h5>
                   <button onclick="details('${phone.slug}')" class="btn btn-success">Details</button>
                 </div>
            `;
             phoneContainer.appendChild(div);
             spinner.style.display = "none";
        document.getElementById('error').style.display="none";

    }
}
}