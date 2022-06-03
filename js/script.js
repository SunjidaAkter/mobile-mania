// error-handling
const errorHandling = text => {
    spinnerToggler('none');
    document.getElementById('search-result').textContent = '';
    const div = document.createElement('div');
    div.classList.add('warning-div');
    const h2 = document.createElement('h2');
    h2.classList.add('warning');
    h2.innerText = text;
    div.appendChild(h2);
    document.getElementById('error-handling').textContent = '';
    document.getElementById('error-handling').appendChild(div);
    // document.body.appendChild(div);
    document.getElementById('search-result').textContent = '';
}


// spinner
const spinnerToggler = display => {
    document.getElementById('spinner').style.display = display;
}
const infoToggler = display => {
    document.getElementById('search-result').style.display = display;
    // document.getElementById('error-handling').style.display = display;
}


// searching
const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    document.getElementById('phone-details').textContent = '';
    spinnerToggler('block');
    infoToggler('none');
    document.getElementById('error-handling').textContent = '';
    if (searchText == '') {
        infoToggler('block');
        errorHandling('Please Enter Valid Input');
        spinnerToggler('none');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText.toLowerCase()}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data.data.slice(0, 20));
        }
        catch (error) {
            console.log(error);
        }

    }
}

// displaying-result
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    // errorHandling('');
    searchResult.textContent = '';
    console.log(phones);
    if (phones.length == 0) {
        errorHandling('No phones found, search again!');
        infoToggler('block');
        spinnerToggler('none');
    }
    else {
        phones.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card ">
                
                <div class="d-flex justify-content-center">
                    <img style="width: 150px;"  src="${phone.image ? phone.image : 'Image not found'}" class="card-img-top my-2" alt="...">
                </div>
                <div class="card-body">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <h5 class="card-title">Name : ${phone.phone_name ? phone.phone_name : 'Not Available'}</h5>
                    <h5 class="card-text">Brand : ${phone.brand ? phone.brand : 'Not Available'}</h5>
                    <a class="link" href="#"><button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">EXPLORE</button></a>
                </div>
                </div>
                `;
            searchResult.appendChild(div);
        });
        spinnerToggler('none');
        infoToggler('inline-flex');
        document.getElementById('error-handling').textContent = '';
    }
}


//loading-detail
const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

// displaying-phoneDetail
const displayPhoneDetail = phone => {
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.textContent = '';
    // document.getElementById('search-result').style.display = 'none';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Product Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
    <div class="d-flex flex-column font ">
                <div class="d-flex justify-content-center ">
                    <img style="width: 300px;" src="${phone.image ? phone.image : 'Image not found'}" class="card-img-top  p-5" alt="...">
                </div>
                <div class="card-body">
                    <h3 class="card-title">Name : ${phone.name ? phone.name : 'Not Available'}</h3>
                    <p class="card-text"><b>Brand :</b> ${phone.brand ? phone.brand : 'Not Available'}</p>
                    <p class="card-text"><b>Code :</b> ${phone.slug}</p>
                    <p class="card-text"><b>Release Date :</b> ${phone.releaseDate ? phone.releaseDate : 'Release Date is not available'}</p>
                    <hr>
                    <h3>Main Features</h3>
                    <p class="card-text"><b>Chipset :</b> ${phone.mainFeatures?.chipSet ? phone.mainFeatures.chipSet : 'Not Available'}</p>
                    <p class="card-text"><b>Display Size :</b> ${phone.mainFeatures?.displaySize ? phone.mainFeatures.displaySize : 'Not Available'}</p>
                    <p class="card-text"><b>Memory :</b> ${phone.mainFeatures?.memory ? phone.mainFeatures.memory : 'Not Available'}</p>
                    <p class="card-text"><b>Sensors :</b> ${phone.mainFeatures?.sensors ? phone.mainFeatures.sensors : 'Not Available'}</p>
                    <p class="card-text"><b>Storage :</b> ${phone.mainFeatures?.storage ? phone.mainFeatures.storage : 'Not Available'}</p>
                    <hr>
                    <h3>Other Features</h3>
                    <p class="card-text"><b>Bluetooth :</b> ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'Not Available'}</p>
                    <p class="card-text"><b>GPS :</b> ${phone.others?.GPS ? phone.others.GPS : 'Not Available'}</p>
                    <p class="card-text"><b>NFC :</b> ${phone.others?.NFC ? phone.others.NFC : 'Not Available'}</p>
                    <p class="card-text"><b>Radio :</b> ${phone.others?.Radio ? phone.others.Radio : 'Not Available'}</p>
                    <p class="card-text"><b>USB :</b> ${phone.others?.USB ? phone.others.USB : 'Not Available'}</p>
                    <p class="card-text"><b>WLAN :</b> ${phone.others?.WLAN ? phone.others.WLAN : 'Not Available'}</p>
                    <a class="link" href="#"><button id="close" type="button" class="btn btn-success">CLOSE</button></a>
                </div>
            </div>
            </div>
    `;
    phoneDetail.appendChild(div);
}
//closing-function
document.addEventListener("click", function (e) {
    if (e.target.id == 'close') {
        const phoneDetail = document.getElementById('phone-details');
        phoneDetail.textContent = '';
    }
})
