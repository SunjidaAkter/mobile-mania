const errorHandling = text => {
    spinnerToggler('none');
    document.getElementById('search-result').textContent = '';
    const h2 = document.createElement('h2');
    h2.innerText = text;
    document.getElementById('search-result').appendChild(h2);
    document.getElementById('phone-details').textContent = '';
}

const spinnerToggler = display => {
    document.getElementById('spinner').style.display = display;
}
const infoToggler = display => {
    document.getElementById('search-result').style.display = display;
}
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    searchField.value = '';
    spinnerToggler('block');
    // errorHandling('');
    infoToggler('none');
    if (searchText == '') {
        infoToggler('block');
        errorHandling('please enter valid input');
        spinnerToggler('none');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.data.slice(0, 20));

    }
}
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    console.log(phones);
    if (phones.length == 0) {
        errorHandling('not found');
        infoToggler('block');
        spinnerToggler('none');
    }
    else {
        phones.forEach(phone => {
            console.log(phone);
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
                    <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-success">Success</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
        spinnerToggler('none');
        infoToggler('inline-flex');
        // errorHandling('');
    }
}
const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}
const displayPhoneDetail = phone => {
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <div class="d-flex flex-wrap  ">
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
                    
                </div>
            </div>
    `;
    phoneDetail.appendChild(div);
}