window.onload = function(){
    
    const email = document.querySelector('#email');
    
    const emailMark = document.querySelector('#emailMark');
    const emailMark1 = document.querySelector('#emailMark1');
    
    const password = document.querySelector('#password');
    const passwordMark = document.querySelector('#passwordMark');
    const passwordMark1 = document.querySelector('#passwordMark1');
    
    const login = document.querySelector('button');

    let allUsers = [];
    
    let isRegistred = false;
    localStorage.setItem('isLogged', 'false');

   
    
    /*********** Storage ****************/
    class Storage {
        static getCart(){
            return localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
        }
    }
    
    
    allUsers = Storage.getCart();
    
    login.addEventListener('click', (e)=>{
        e.preventDefault();
        
        let user = allUsers.find(item => email.value===item.email);
        try {
            if(user.password === password.value){
            let userName = `${user.fName}`;
            localStorage.setItem('isLogged', 'true');
            window.open(`OnlineShop.html?${userName}`, '_self');
        } else {
            password.style = "border: 1px solid red";
            passwordMark1.style = "display:";
        }
        } catch {
            
    }
        
    })
    
    
    
    formValuesChecker(email, password);
    
    function formValuesChecker(eVal, pVal){
        eVal.addEventListener('keyup', ()=>{
            ValidateEmail(eVal);
            if(ValidateEmail(eVal)){
                if(!isRegistredEmail(eVal)){
                     eVal.style = "border: 1px solid red";
                     emailMark1.style="display:";
                } else{
                     eVal.style = "border: 1px solid #ced4da";
                     emailMark1.style="display: none";
                }
            }
        })
        pVal.addEventListener('blur', ()=>{
            CheckPassword(pVal);
        })
    }
    
    function isRegistredEmail(_email){
        let finded = false;
        allUsers.forEach(item => {
            if(_email.value == item.email){
                finded = true;
            }
        })
        return finded;
    }
    
    function ValidateEmail(_email) { 
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_email.value)) {
             _email.style = "border: 1px solid #ced4da";
             emailMark.style="display: none";
             return true;
          } else{
             _email.style = "border: 1px solid red";
             emailMark.style="display:";
             return false;
          }
    }
    
    
    function CheckPassword(_password) { 
        if(_password.value.length == 0){
            _password.style = "border: 1px solid red";
            passwordMark.style = "display:";
            return true;   
        }
        else{
            _password.style = "border: 1px solid #ced4da";
            passwordMark.style = "display:none";
            return false  
        }   
    }    
}

