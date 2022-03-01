const errorHandling = text => {
    spinnerToggler('none');
    document.getElementById('search-result').textContent = '';
    const h2 = document.createElement('h2');
    h2.innerText = text;
    document.getElementById('search-result').appendChild(h2);
    document.getElementById('meal-details').textContent = '';
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
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);

    }
}
const displaySearchResult = (meals) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals == null) {
        infoToggler('block');
        errorHandling('not found');
        spinnerToggler('none');
    }
    else {
        meals.forEach(meal => {
            console.log(meal);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})"  class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
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
const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0]);
}
const displayMealDetail = meal => {
    const mealDetail = document.getElementById('meal-details');
    mealDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealDetail.appendChild(div);
}