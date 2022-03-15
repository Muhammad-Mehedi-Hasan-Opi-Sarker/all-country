// tigger enter with search button 
let go = document.getElementById("btn");
let txt = document.getElementById("input");

txt.addEventListener("keypress", function (event) {
    // event.preventDefault();
    if (event.keyCode == 13)
        go.click();
});
// work here 
const loadData = () => {
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('here').innerHTML = '';
    const error = document.getElementById('error');
    const input = document.getElementById('input');
    if (input.value == " ") {
        error.innerText = "No found data";
    }
    else {
        const url = `https://restcountries.com/v3.1/name/{${input.value}}`;
        fetch(url).then(res => res.json()).then(data => {
            if (data == "") {
                document.getElementById('spinner').style.display = 'none'
            }
            else {
                showCountry(data)
                document.getElementById('spinner').style.display = 'none';
            }
        })

    }
    // console.log(input.value)
    input.value = "";

}
const showCountry = data => {
    // console.log(data);
    const here = document.getElementById('here');
    data.map(newData => {
        let countryName
        for (let key in newData.currencies) {
            if (newData.currencies.hasOwnProperty(key)) {
                countryName = newData.currencies[key]
            }
        }
        // console.log(newData.currencies.INR.name);
        const div = document.createElement('div');
        div.classList.add('col-sm-12');
        div.classList.add('col-lg-4');
        div.classList.add('p-3');
        div.innerHTML = `
        <h4>${newData.name.common}</h4>
        <img src="${newData.flags.png}">
        <p>Official Name : ${newData.name.official}</p>
        <p> ${newData.independent ? "Idependent" : "Subordinate"}</p>
        <p>Capital : ${newData.capital}</p>
        <p>Region : ${newData.region}</p>
        <p>Subregion : ${newData.subregion}</p>
        <p>Population : ${newData.population}</p>
     
        <p>Currencies : ${countryName.name}</p>
        <p>Languages : ${JSON.stringify(Object.keys(newData.languages).map(key => newData.languages[key]))}</p>
       
        
        `;
        here.appendChild(div);

    })
    // / <h4>${newData.name.nativeName.ben.common}</h4>
}



