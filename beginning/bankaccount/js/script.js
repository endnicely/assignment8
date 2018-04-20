/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

var bankAccount = function () {
    "use strict";
    // PRIVATE VARIABLES AND FUNCTIONS
    var owner, balance = 0, getBalance, getOwnerName, withdrawal, deposit, displayMessage;
    displayMessage = function (message) {
       $("display").innerHTML = message;
    };
    
    getBalance = function () {
        return balance;
    };
    
    getOwnerName = function () {
        return owner;
    };
    
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        createAccount: function (ownerName) {
            owner = ownerName;
            displayMessage(owner + "'s bank account has been created successfully");
            return this;
        },
        
//        getBalance: function () {
//            return balance;
//        },
//        getOwnerName: function () {
//            return owner;
//        },
        withdrawal: function (withdrawalAmount) {
           if (withdrawalAmount > balance) {            
               window.alert("Your account balance is " + balance + ". This is the maximum amount you can withdrawal.");
           } else {
               balance -= withdrawalAmount;
               displayMessage(getOwnerName() + "'s account balance is " + getBalance());
               
           }
           //return this;
           
           
        },
        deposit: function (depositAmount) {
           balance += depositAmount;
           displayMessage(getOwnerName() + "'s account balance is " + getBalance());
           //return this;
        }
      
       
    };
};

window.addEventListener("load", function () {
    "use strict";
     var bankAcct = bankAccount();
    
    $("name").addEventListener("click", function(){
        var name = prompt("Please provide the name to create an account.");
        bankAcct = bankAcct.createAccount(name);
        
    });
    
    $("deposit").addEventListener("click", function(){
         var deposit = parseInt(prompt("Please tell us how much do you want to deposit"), 10);

         while(deposit < 0 || !deposit || isNaN(deposit) || !deposit) {
             deposit  = parseInt(prompt("Please provide a positive number to deposit"), 10);
         }
         bankAcct.deposit(deposit);
         //slideshow.setSpeed(promptSpeed).startSlideShow();
        
    });
    
    $("withdrawal").addEventListener("click", function(){
        var withdrawal = parseInt(prompt("Please tell us how much do you want to withdrawal"), 10);
        while(withdrawal < 0 || !withdrawal || isNaN(withdrawal) || !withdrawal) {
             withdrawal  = parseInt(prompt("Please provide a positive number to withdrawal"), 10);
        }
        bankAcct.withdrawal(withdrawal);
        
    });
   
});

