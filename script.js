const inputSlider = document.querySelector("[data-inputSlider]");
const dataLength = document.querySelector("[data-length]");

let passwordLength = 10;
handleSlider();

function handleSlider(){
    inputSlider.value = passwordLength;
    dataLength.innerText = passwordLength;

    //color only selected part of input Slider
    inputSlider.style.backgroundSize = (passwordLength*100/20) + "% 100%"
}

function getRandomInteger(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
}

function getRandomNo(){
    return getRandomInteger(0, 9);
}

function getRandomUppercase(){
    return String.fromCharCode(getRandomInteger(65, 91));
}

function getRandomLowercase(){
    return String.fromCharCode(getRandomInteger(97, 123));
}

let symbols = "~`!@#$%^&*()_+-=/;:',.\<>|";

function getRandomSymbols(){
    let RndIdx = getRandomInteger(0, symbols.length);
    return symbols.charAt(RndIdx);
}

const indicator = document.querySelector("[data-indicator]");
setIndicator("#ccc");

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbol = document.querySelector("#symbols");


function calcStrength(){
    let isUpper = false;
    let isLower = false;
    let isNumber = false;
    let isSymbol = false;

    if(uppercase.checked) isUpper = true;
    if(lowercase.checked) isLower = true;
    if(numbers.checked) isNumber = true;
    if(symbol.checked) isSymbol = true;

    if(isUpper && isLower && (isNumber || isSymbol) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((isUpper || isLower) && (isNumber || isSymbol) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    else setIndicator("#f00");
}

const copyMsg = document.querySelector("[display-copyMsg]");
const displayPassword = document.querySelector("[data-password]");

async function copyBtn(){

    try{
        await navigator.clipboard.writeText(displayPassword.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

const copy = document.querySelector(".copy-container");

copy.addEventListener('click', copyBtn);

const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let checkCount = 1;

allCheckBox.forEach(element => {
    element.addEventListener('change', countCheckedBoxes);
});

function countCheckedBoxes(){
    checkCount = 0;

    allCheckBox.forEach((e) => {
        if(e.checked) checkCount++;
    })
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

function shufflePassword(str){

    for(let i=str.length-1; i>=0; i--){
        const j = Math.floor(Math.random()*(i+1));

        const temp = str[i];
        str[i] = str[j];
        str[j] = temp;
    }
    
    let ans = "";
    str.forEach((e) => {
        ans += e;
    })

    return ans;
}

const generateBtn = document.querySelector(".generatebutton");

generateBtn.addEventListener('click', () => {

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    let str = "";    
    let array = [];

    if(uppercase.checked) {
        str += getRandomUppercase();
        array.push(getRandomUppercase);
    }
    if(lowercase.checked) {
        str += getRandomLowercase();
        array.push(getRandomLowercase);
    }
    if(numbers.checked) {
        str += getRandomNo();
        array.push(getRandomNo);
    }
    if(symbol.checked) {
        str += getRandomSymbols();
        array.push(getRandomSymbols);
    }

    let size = str.length;
    for(let i=0; i<passwordLength-size; i++){
        let idx = getRandomInteger(0, array.length);
        let k = array[idx]();
        str += k;
    }

    str = shufflePassword(Array.from(str));
    displayPassword.value = str;
    calcStrength();
})
