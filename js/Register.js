window.onload = function(){
    const regForm = document.querySelector('form');
    const fName = document.querySelector('#firstName');
    const firstNameMark = document.querySelector('#firstNameMark');
    const lName = document.querySelector('#lastName');
    const lastNameMark = document.querySelector('#lastNameMark');
    const email = document.querySelector('#email');
    const emailMark = document.querySelector('#emailMark');
    const emailLabel = document.querySelector('#emailLabel');
    const password = document.querySelector('#password');
    const passwordMark = document.querySelector('#passwordMark');
    const cPassword = document.querySelector('#cPassword');
    const cPasswordMark = document.querySelector('#cPasswordMark');
    const reg = document.querySelector('button');
    
    let users = [];
    class user{
        constructor(_fName, _lName, _email, _password){
            this.fName = _fName;
            this.lName = _lName;
            this.email = _email;
            this.password = _password;
        }
    }
    
function getInfo(btn){
    btn.addEventListener('click', (e)=>{
        users = Storage.getUsers();
        e.preventDefault();
        
        let user1 = new user(fName.value, lName.value, email.value, password.value);
        
        if(email.value.length == 0 || fName.value.length == 0 || lName.value.length == 0 || password.value.length == 0){
           validatAll();
        } else if(!userCheck(user1,users) && ValidateEmail(email) && CheckNames(fName,firstNameMark) && CheckNames(lName,lastNameMark) && CheckPassword(password) && CheckcPassword(password, cPassword)){
            users.push(user1);
            Storage.saveUser(users);
            email.value = "";
            fName.value ="";
            lName.value = "";
            password.value = "";
            cPassword.value = "";
            window.open('login.html','_self');
        } else if(userCheck(user1,users)){
            emailLabel.innerHTML = '<sapn style="color: red">*Try another Email it\'s already registered</span>';
            email.value ="";
            email.focus();
            password.value = "";
            cPassword.value = "";
        }
       
    })
}
    
/****** Start Of Form Validation ****/

    formValuesChecker(fName, lName, email, password, cPassword);
    
    function formValuesChecker(fVal, lVal, eVal, pVal, cpVal){
        email.addEventListener('blur', ()=>{
            ValidateEmail(email);
        })
        fVal.addEventListener('blur', ()=>{
            CheckNames(fVal,firstNameMark);
        })
        lVal.addEventListener('blur', ()=>{
            CheckNames(lVal,lastNameMark);
        })
        pVal.addEventListener('blur', ()=>{
            CheckPassword(pVal);
        })
        cpVal.addEventListener('blur', ()=>{
            CheckcPassword(pVal, cpVal);
        })
    }
    
    function validatAll(){
        ValidateEmail(email);
        CheckNames(fName,firstNameMark);
        CheckNames(lName,lastNameMark);
        CheckPassword(password);
        CheckcPassword(password, cPassword);
    }
    
    function ValidateEmail(mail) {
         if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail.value)) {
             mail.style = "border: 1px solid #ced4da;";
             emailMark.style="display: none";
             return true;
          } else{
             mail.style = "border: 1px solid red";
             emailMark.style="display:";
             return false;
          }
    }
    function CheckNames(inputtxt, mark) { 
        if(inputtxt.value.length != 0) { 
            inputtxt.style = "border: 1px solid #ced4da;";
            mark.style="display: none";
            return true;
        } else { 
            inputtxt.style = "border: 1px solid red";
            mark.style="display:";
            return false;
        }
    }
    
    function CheckPassword(inputtxt) { 
        var passw=  /^[A-Za-z]\w{7,14}$/;
        if(inputtxt.value.match(passw)) { 
            inputtxt.style = "border: 1px solid #ced4da;";
            passwordMark.style="display: none";
            return true;
        } else { 
            inputtxt.style = "border: 1px solid red";
            passwordMark.style="display:";
            return false;
        }
    }
    
    function CheckcPassword(pass, cPass) { 
        if(cPass.value !==  pass.value){
            cPass.style = "border: 1px solid red";
            cPasswordMark.style="display:";
            return false;
        } else {
            cPass.style = "border: 1px solid #ced4da";
            cPasswordMark.style="display: none";
            return true;
        }
    }
    
    /****** End Of Form Validation ****/
    /****** Start of Validate of is the user existed before*****/
    function userCheck(newUser, arr){
        let checker = 0;
        let ret;
        for(let i=0; i < arr.length; i++){
            (newUser.email === arr[i].email)? checker++ : checker;
        }
        (checker > 0) ? ret = true : ret = false;
        
        return ret;
    }
    /****** End of Validate of is the user existed before*****/

    getInfo(reg);
    /**********local storage ************/
     class Storage {
        static saveUser(users){
            localStorage.setItem(`users`, JSON.stringify(users));
        }
        static getUsers(){
            return localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
        }
    }
    
}