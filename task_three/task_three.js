const input = document.querySelector('.input');
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

btn.addEventListener("click", () => {
    result.innerHTML = " ";
    if (input.value > 10 || input.value < 1) {
        result.innerHTML = "число вне диапазона от 1 до 10";
    } else {
        let url = `https://picsum.photos/v2/list?limit=${input.value}`;
        useRequest(url, displayResult);
    }
});