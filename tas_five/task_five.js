const num = document.querySelector('.input_one');
const lim = document.querySelector('.input_two');
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');


function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const res = JSON.parse(xhr.response);
            if (callback) {
                callback(res);
            }
        }
    };

    xhr.onerror = function () {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

function displayResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
        cards = cards + cardBlock;
    });

    result.innerHTML = cards;
}

const rS = JSON.parse(localStorage.getItem('user'));
let urlStor = `https://picsum.photos/v2/list?page=${rS.n}&limit=${rS.l}`;        useRequest(urlStor, displayResult);

btn.addEventListener("click", () => {
    result.innerHTML = " ";
    let flagNum = isNaN(num.value);
    let flagLim = isNaN(lim.value);
    let n = 0;
    let l = 0;

    if (flagNum) {
        n++;
    } else if (num.value < 1 || num.value > 10) {
        n++;
    } 
    if (flagLim) {
        l++;
    } else if (lim.value < 1 || lim.value > 10) {
        l++;
    } 
    if (n != 0 && l != 0) {
        result.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    } else if (n !== 0) {
        result.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    } else if (l !== 0) {
        result.innerHTML = "Лимит вне диапазона от 1 до 10";
    } else {    
        let url = `https://picsum.photos/v2/list?page=${num.value}&limit=${lim.value}`;
        useRequest(url, displayResult);
    }
    localStorage.clear();
    const storage = {
        n: num.value,
        l: lim.value
    }
    localStorage.setItem('user', JSON.stringify(storage));
})