const inputWidth = document.querySelector('.input_one');
const inputHeight = document.querySelector('.input_two');
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');


async function getResponse() {
    let response = await fetch(`https://picsum.photos/${inputWidth.value}/${inputHeight.value}`)
    let content = await response.url;
    const img = `
    <img
    src="${content}"
    class="image"
    />
    `;
    result.innerHTML = img;
}

btn.addEventListener("click", async () => {
    result.innerHTML = " ";
    let flagWidth = isNaN(inputWidth.value);
    let flagHeight = isNaN(inputHeight.value);
    if (flagWidth) {
        result.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
    } else if (flagHeight) {
        result.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
    } else if (inputWidth.value < 100 || inputWidth.value > 300) {
        result.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
    } else if (inputHeight.value < 100 || inputHeight.value > 300) {
        result.innerHTML = "Одно из чисел вне диапазона от 100 до 300";
    } else {
        getResponse()
    }
})