let plainTextArea = document.querySelector("form textArea.plainText");
let convert = document.querySelector("form .convert");
let encryptionMethods = document.querySelector("form .encryptionMethods");
let cipherTextArea = document.querySelector("form textArea.cipherText");
let copy = document.querySelector(".copy");


function strToArr(str){
    len = str.length;
    let arr = [];
    for (let i = 0; i < len; i++) {
        let char = str[i];
        arr.push(char);
    }
    return arr;
}

function genArrRandom(arrLen,max){
    let newArr = [];
    for (let i = 0; i < arrLen; i++) {
        el = Math.round(Math.random()*max);
        newArr.push(el);
    }
    return newArr;
}

function reGenerArr(arr){
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = 0;
        let found = true;
        while (found) {
            randomIndex = Math.floor(Math.random()*arr.length);
            found = false;
            newArr.forEach((el)=>{
                if (el == arr[randomIndex]) {
                    found = true;
                }
            });
        }
        console.log(randomIndex);
        newArr.push(arr[randomIndex]);
    }
    return newArr
}

function divedidArr(arr,n=1){
    let count = 0;
    newArr = new Array();
    const len = arr.length;
    for (let i = 0; i < len; i+=n) { //i=0
        newArr.push([]);
        for (let j = 0; j < n; j++) { //j = 1
            const element = arr[i+j];//strarr[1]
            newArr[count].push(element); 
        }
        count++;
    }
    return newArr;
}

function productArr(arr1,arr2){
    const len1=arr1.length;
    const len2=arr2.length;
    let newArr = new Array();
    for (let i = 0; i < len1; i++) {
        let prod=0;
        for (let j = 0; j < len2; j++) {
            const el1 = arr1[i][j];
            const el2 = arr2[j];
            prod += el1*el2;
        }
        newArr.push(prod);
    }
    return newArr;
}

function copyToClipboard(el){
    if (el.value != "") {
        navigator.clipboard.writeText(el.value);
    }
}
function shiftAndAddToStr(str,char,indexS){
    const len = str.length;
    str+=" ";
    let strA = strToArr(str);
    let valS = strA[indexS];
    let valNext = 0;
    strA[indexS]=char; 
    for (let i=indexS;i<len;i++){
        valNext = strA[i+1];
        strA[i+1]=valS;
        valS=valNext;
    }
    const newStr = strA.join("");
    return newStr;
}

// encryption methods

function caesarCipher(plainText){
    let cipherText = "";
    plainText.forEach(el => {
        let C = 0;
        let key = 5;
        if (el == " ") {
            cipherText += el;
            return;
        }
        else {
            let charcater = el.toLowerCase();
            let charNum = charcater.charCodeAt(0)-97;
            C = (charNum + key)%26;// C = (p + K) % 26
            cipherText += String.fromCharCode(C+65);
            return;
        }
    });
    return cipherText;
}

function multiplicativeCipher(plainText){
    let cipherText = "";
    let key = 3;
    plainText.forEach(el => {
        let C = 0;
        if (el == " ") {
            cipherText += el;
            return;
        }
        else {
            let charcater = el.toLowerCase();
            let charNum = charcater.charCodeAt(0)-97;
            C = (charNum * key)%26;// C = (p + K) % 26
            cipherText += String.fromCharCode(C+65);
            return;
        }
    });    
    return cipherText;
}

function affineCiper(plainText){
    const keyA = 7;
    const keyB = 10;
    let cipherText = "";
    plainText.forEach(el => {
        if (el == " ") {
            cipherText += el;
            return;
        }
        else {
            let charcater = el.toLowerCase();
            let charNum = charcater.charCodeAt(0)-97;
            C = (charNum * keyA+keyB)%26;// C = (p + K) % 26
            cipherText += String.fromCharCode(C+65);
        }
    });
    return cipherText;
}

function hillCipher(plainText){
    let Carr = [];
    let key = [[3,1],[6,5]];
    const lenText = plainText.length;
    const lenK = key.length;
    //chek if plain text length % key length == 0
    let z = lenText%lenK;
    if (z!=0) {
        let e=lenK-z;
        for (let i = 0; i < e; i++) {
            plainText.push("x");
        }
    }
    // chars => numbers alphabits
    strToArr(plainText).forEach(el => {
        let charcater = el.toLowerCase();
        if (charcater != " ") {            
            let charNum = charcater.charCodeAt(0)-97;
            Carr.push(charNum);
        }else{
            Carr.push(0);
        }
    });
    let newArr = divedidArr(Carr,2);
    let cipherText = "";
    // product Array
    let prodArr = new Array();
    for (let i = 0; i < newArr.length; i++) {
        const element = newArr[i];
        prodArr.push(productArr(key,newArr[i]));
    }
    //mode 26 and numbers => chars alphabits
    for (let i = 0; i < prodArr.length; i++) {
        for (let j = 0; j < prodArr[i].length; j++) {
            const el = prodArr[i][j];
            prodArr[i][j]=el%26;
            cipherText += String.fromCharCode(prodArr[i][j]+65);
        }
    }
    return cipherText;
}

function vigenereCiper(plainText){
    let key = "deceptive";
    let cipherText = "";
    const lenK = key.length;
    const lenP = plainText.length;
    let keyNum = [];
    let charNum = [];
    
    //key to number 
    strToArr(key).forEach(el=>{
        let charcater = el.toLowerCase();
        keyNum.push((charcater.charCodeAt(0)-97)%26);
    });
    //repate key on the plain text
    let diff = lenP - lenK;
    for (let i = 0; i < diff; i++) {
        const el = keyNum[i];
        keyNum.push(el);
    }
    //plain text chars to numbers
    strToArr(plainText).forEach(el=>{
        let charcater = el.toLowerCase();
        charNum.push((charcater.charCodeAt(0)-97)%26);
    });
    //find cipher text c= (p+k) % 26
    for (let i = 0; i < lenP; i++) {
        let P = charNum[i];
        if (plainText[i]!=" ") {
            let K = keyNum[i];
            let C = (P+K)%26;        
            cipherText += String.fromCharCode(C+65);
        }else{
            cipherText += " ";
        }
    }
    return cipherText;
}



function playFairCipher(plainText) {
    const key = "encrypt";
    const lenK = key.length; 
    let lenP = plainText.length;
    let cipherText = "";
    //function to check the char contain if no pass as output
    function getChar(len,arr){
        let arrF = arr.flat();
        let countA = 97;
        let char = "";
        for (let i = 0; i < len; i++) {//i=0
            for (let j = 0; j < arr.length; j++) {//j=0
                if (String.fromCharCode(countA)=="j"){
                    j--;
                }
                else if(!(arrF.includes(String.fromCharCode(countA)))){
                    //i+j=
                    char = String.fromCharCode(countA);
                    return char;
                }
                countA++;
            }
        }
    }
    // generate the array
    let arr = new Array();
    let count = 0;
    
    for (let i = 0; i < 5; i++) {
        arr.push([]);
        let el = 0;
        for (let j = 0; j < 5; j++) {
            if (lenK>count) {
                el = key[count];
                arr[i].push(el);
                count++;
            }else{
                el = getChar(5,arr);
                arr[i].push(el);
            }
        }
    }
    //divedidArr
    let z = lenP%2;
    if (z!=0) {
        plainText+="x";
    }
    let newArr = divedidArr(strToArr(plainText),2);
    //in plain text if a pair is a repeated letter, insert filler 'X' 
    let countIndex = 0;
    newArr.forEach((el1,index1)=>{
        if (el1[0]==el1[1]) {
            plainText=shiftAndAddToStr(plainText,"x",countIndex);
        }
        countIndex+=2;
});
    console.log(plainText);
    //chek if plain text length is even
    z = lenP%2;
    if (z!=0) {
        plainText+="x";
    }
    //divedidArr
    newArr = divedidArr(plainText,2);

    return cipherText;
}

function one_TimeCipher(plainText) {
    const arrNumsRandom = genArrRandom(plainText.length,25);
    console.log(arrNumsRandom);
    const key = [];
    arrNumsRandom.forEach((el1,index1)=>{
        lettersEn.forEach((el2,index2) => {
            if (el1 == index2) {
                key.push(el2);
            }
        });
    });
    return key;
}
// ******************************************

convert.addEventListener("click",e => {
    cipherTextArea.value = "";
    let texArr = strToArr(plainTextArea.value);
    let ct = "";
    if (encryptionMethods.value == "Caesar") {
        ct = caesarCipher(texArr);
        cipherTextArea.value = ct;
    }
    else if (encryptionMethods.value == "Mltiplicative") {
        ct = multiplicativeCipher(texArr);
        cipherTextArea.value = ct;
    }
    else if (encryptionMethods.value == "Hill") {
        ct = hillCipher(texArr);
        cipherTextArea.value = ct;
    }
    else if (encryptionMethods.value == "Affine"){
        ct = affineCiper(texArr);
        cipherTextArea.value = ct;
    }
    else if (encryptionMethods.value == "Vigenere"){
        ct = vigenereCiper(texArr);
        cipherTextArea.value = ct;
    }
    else if (encryptionMethods.value == "playFair"){
        ct = playFairCipher(texArr);
        cipherTextArea.value = ct;
    }
    else if (encryptionMethods.value == "One_Time"){
        ct = one_TimeCipher(texArr);
        cipherTextArea.value = ct;
    }
});


copy.addEventListener("click",e=>{
    copyToClipboard(cipherTextArea);
});