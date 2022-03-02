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
    document.getElementById('phone-details').textContent = '';
    document.getElementById('phone-details').appendChild(div);
    document.getElementById('search-result').textContent = '';
}


// spinner
const spinnerToggler = display => {
    document.getElementById('spinner').style.display = display;
}
const infoToggler = display => {
    document.getElementById('search-result').style.display = display;
    document.getElementById('phone-details').style.display = display;
}


// searching
const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    searchField.value = '';
    document.getElementById('phone-details').textContent = '';
    spinnerToggler('block');
    infoToggler('none');
    if (searchText == '') {
        infoToggler('block');
        errorHandling('Please Enter Valid Input');
        spinnerToggler('none');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
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
                    <img style="width: 250px;"  src="${phone.image}" class="card-img-top my-2" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Name : ${phone.phone_name}</h5>
                    <h5 class="card-text">Brand : ${phone.brand}</h5>
                    <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-success">EXPLORE</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
        spinnerToggler('none');
        infoToggler('inline-flex');
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
    document.getElementById('search-result').style.display = 'none';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <div class="d-flex flex-column font ">
            <h1 class="card-title text-center my-2">Phone Details</h1>
                <div class="d-flex justify-content-center ">
                    <img style="width: 300px;" src="${phone.image}" class="card-img-top  p-5" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Name: ${phone.name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                    <p class="card-text">Code: ${phone.slug}</p>
                    <p class="card-text">${phone.releaseDate ? phone.releaseDate : 'Released Date is not available'}</p>
                    <hr>
                    <h5>Main Features</h5>
                    <p class="card-text">Chipset: ${phone.mainFeatures?.chipSet ? phone.mainFeatures.chipSet : 'Not Available'}</p>
                    <p class="card-text">Display Size: ${phone.mainFeatures?.displaySize ? phone.mainFeatures.displaySize : 'Not Available'}</p>
                    <p class="card-text">Memory: ${phone.mainFeatures?.memory ? phone.mainFeatures.memory : 'Not Available'}</p>
                    <p class="card-text">Sensors: ${phone.mainFeatures?.sensors ? phone.mainFeatures.sensors : 'Not Available'}</p>
                    <p class="card-text">Storage: ${phone.mainFeatures?.storage ? phone.mainFeatures.storage : 'Not Available'}</p>
                    <hr>
                    <h5>Others Features</h5>
                    <p class="card-text">Bluetooth: ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'Not Available'}</p>
                    <p class="card-text">GPS: ${phone.others?.GPS ? phone.others.GPS : 'Not Available'}</p>
                    <p class="card-text">NFC: ${phone.others?.NFC ? phone.others.NFC : 'Not Available'}</p>
                    <p class="card-text">Radio: ${phone.others?.Radio ? phone.others.Radio : 'Not Available'}</p>
                    <p class="card-text">USB: ${phone.others?.USB ? phone.others.USB : 'Not Available'}</p>
                    <p class="card-text">WLAN: ${phone.others?.WLAN ? phone.others.WLAN : 'Not Available'}</p>
                    <button id="close" type="button" class="btn btn-success">CLOSE</button>
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
        document.getElementById('search-result').style.display = 'inline-flex';
    }
})
