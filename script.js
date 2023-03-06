let form = document.getElementById('form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let formControl = document.querySelector('.form-control');

function showError(element, message){
    let formControl = element.parentElement;
    formControl.className = ('form-control error');
    formControl.querySelector('small').innerText = message; 
}
function showSuccess(element){
    let formControl = element.parentElement;
    formControl.className = ('form-control correct'); 
}

function checkEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email.value).toLowerCase())){
            showSuccess(email)
        }
        else{
            showError(email, 'Check the email')
        };
    }
function checkInputLength(input, min , max){
    if(input.value.length < min){
        showError(input, `Length must be grater then ${min}`)
        return false
    }
    else if(input.value.length > max){
        showError(input, `Length must be less ${max}`)
        return false
    }
    else{
        showSuccess(input)
        return true
    }
} 

function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password doesnt match')
    }
    else if(input1.value == input2.value && checkInputLength(input2, 6, 20) == false){
        showError(input2, 'Check the length of password')
    }
    else{
        showSuccess(input2)
    }
}

    //Меняем элементу первую букву 
function changeFirstChar(input){
    return input.charAt(0).toUpperCase() + input.slice(1);
}

// ------Чтобы не писать много условий для каждого эл-та создали функцию checkRequired
function checkRequired(inputArr){
    // forEach присоединяется к массиву и выполняет различные действия перебирая его элементы 
    inputArr.forEach(function (element) {
        console.log(element.id)
        if(element.id == 'password2' && element.value.trim() == ''){
            showError(element, `Password is required`)
        }
        else if(element.id == 'username' && element.value.trim() !== ''){
            checkInputLength(element, 3, 10)
        }
        else if(element.id == 'password' && element.value.trim() !== ''){
            checkInputLength(element, 6, 20)
        }
        else if(element.id == 'email' && element.value.trim() !== ''){
            checkEmail(element)
        }
        else if(element.id == 'password2' && element.value.trim() !== ''){
            checkPasswordMatch(password, password2);
        }
        else if(element.value.trim() == ''){
            showError(element, `${changeFirstChar(element.id)} is required`);  
        }
        else{
            showSuccess(element)
        }
    });
}

form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(formControl.classList);
    
    //Чтобы не писать для каждого эл-нта проверяющую функцию нужно передать его в виде массива
    checkRequired([username, email, password, password2]);
    
    // checkInputLength(username, 3, 10);
    // checkInputLength(password, 6, 15);
    // checkEmail(email)
    // checkPasswordMatch(password, password2)
    // Вынос блока кода для проверки символов в введенных строках создаем функции 

    // function isValidatePass(password){
    //     const re =  /^(?=.*\d)[a-zA-Z0-9]{8,}$/
    //     return re.test(password)
    // }

    // if(username.value == ''){
    //   showError(username, 'Required username');  
    // }
    // else{
    //     showSuccess(username);
    // }

    // if(email.value == ''){
    //   showError(email, 'Required email');  
    // }
    // else if(!isValidateEmail(email.value)){
    //     showError(email, "Check the adress")   
    // }
    // else {
    //     showSuccess(email)
    // }
        
    // if(password.value == ''){
    //     showError(password, 'Required password');
    // }
    // else if(!isValidatePass(password.value)){
    //     showError(password, 'password must have contain 8 characters from 0-9 and a-z and at least one digit')
    // }
    // else{
    //     showSuccess(password)
    // }

    // if(password2.value == ''){
    //     showError(password2, 'Confirm password');
    // }
    // else if (!(password.value == password2.value)){
    //     showError(password2, 'Passwords are diferent');
    // }
    // else{
    //     showSuccess(password2)
    // }
})
