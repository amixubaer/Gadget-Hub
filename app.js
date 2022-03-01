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
const allPhones = data => {
//slice for getting maximum 20 phone
    const sliceData = data.slice(0,20);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent ="";
    if(data.length === 0){
        const errorMsg = document.getElementById('error');
        errorMsg.style.display="flex";
        spinner.style.display = "none";
        document.getElementById('device').innerText=searchBox.value;
        }
    else{
        for(phone of sliceData){
            const div = document.createElement('div');            
            div.innerHTML = `
            <img src="${phone.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h4 class="card-title">Device : ${phone.phone_name}</h4>
                   <h5 class="card-title">Brand : ${phone.brand}</h5>
                   <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-success">Details</button>
                 </div>
            `;
             phoneContainer.appendChild(div);
             spinner.style.display = "none";
        document.getElementById('error').style.display="none";

    }
}
}
// Phone details load
const loadPhoneDetail = slug => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => phoneDetails(data.data))
}

// phone details show
const phoneDetails = (data) => {

    document.getElementById('phone-detail-container').style.display = "block";
    const phoneDetailsViewer = document.getElementById('phonedetail')
    let phoneData = data;
    let mainFeatures = data.mainFeatures;
    let others = data.others;
    if(data.others == undefined){
        data.others = " - ";
    }
    phoneDetailsViewer.innerHTML = `
        
    <div class="card fulldetail-card" style="width: 90%; margin: 0 auto; ">
        <div>
        <button onclick="closeOverlay()" class="close-btn btn-danger">❌</button>
        <img src="${phoneData.image}" class="card-img-top ms-3" alt="">
        </div>
        <div class="card-body">
            <h5 class="card-title">Name : ${phoneData.name}</h5>
            <p class="card-text"><b>Brand : </b>${phoneData.brand}</p>
            <p class="card-text"><b>ReleaseDate : </b>${phoneData.releaseDate ? phoneData.releaseDate : 'Comming Soon'}</p>
            <p class="card-text"><b>Main Features </b></p>
            <p class="card-text"><b>DisplaySize : </b>${mainFeatures.displaySize}</p>
            <p class="card-text"><b>ChipSet : </b>${mainFeatures.chipSet}</p>
            <p class="card-text"><b>Storage : </b>${mainFeatures.storage}</p>
            <p class="card-text"><b>Memory : </b>${mainFeatures.memory}</p>
            <p class="card-text"><b>Sensors : </b>${mainFeatures.sensors}</p>
            <p class="card-text"><b>Others </b></p>
           <p class="card-text"><b>WLAN : </b>${phoneData.others.WLAN ? phoneData.others.WLAN : '-'}</p>
           <p class="card-text"><b>Bluetooth : </b>${phoneData.others.Bluetooth ? phoneData.others.Bluetooth : '-'}</p>
           <p class="card-text"><b>GPS : </b>${phoneData.others.GPS ? phoneData.others.GPS : '-'}</p>
           <p class="card-text"><b>NFC : </b>${phoneData.others.NFC ? phoneData.others.NFC : '-'}</p>
           <p class="card-text"><b>Radio : </b>${phoneData.others.Radio ? phoneData.others.Radio : '-'}</p>
           <p class="card-text"><b>USB : </b>${phoneData.others.USB ? phoneData.others.USB : '-'}</p>
            </div>
    </div>
    `;}

const closeOverlay = () => {
    document.getElementById('phone-detail-container').style.display = "none";
}