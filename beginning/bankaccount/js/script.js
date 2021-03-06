/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

var bankAccount = function (ownername) {
    "use strict";
    // PRIVATE VARIABLES AND FUNCTIONS
    var owner = ownername, balance = 0, getBalance, getOwnerName, withdrawal, deposit, displayMessage;
    displayMessage = function (message) {
       $("display").innerHTML = message;
    };
    
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {     
        getBalance: function () {
            return balance;
        },
        getOwnerName: function () {
            return owner;
        },
        withdrawal: function (withdrawalAmount) {
           var owner = this.getOwnerName();
           if (withdrawalAmount > balance) {            
               window.alert(owner + "'s account balance is " + balance + ". This is the maximum amount you can withdrawal.");
           } else {
               balance -= withdrawalAmount;
               displayMessage(owner + "'s account balance is " + this.getBalance());
               
           }       
        },
        deposit: function (depositAmount) {
           balance += depositAmount;
           displayMessage(this.getOwnerName() + "'s account balance is " + this.getBalance());
        }     
    };
};

window.addEventListener("load", function () {
    "use strict";
    var bankAcct;
    
    $("name").addEventListener("click", function(){
        var name = prompt("Please provide the name to create an account.");
        bankAcct = bankAccount(name);
        
    });
    
    $("deposit").addEventListener("click", function(){
         var deposit = parseInt(prompt("Please tell us how much do you want to deposit"), 10);

         while(deposit < 0 || !deposit || isNaN(deposit) || !deposit) {
             deposit  = parseInt(prompt("Please provide a positive number to deposit"), 10);
         }
         bankAcct.deposit(deposit);
        
    });
    
    $("withdrawal").addEventListener("click", function(){
        var withdrawal = parseInt(prompt("Please tell us how much do you want to withdrawal"), 10);
        while(withdrawal < 0 || !withdrawal || isNaN(withdrawal) || !withdrawal) {
             withdrawal  = parseInt(prompt("Please provide a positive number to withdrawal"), 10);
        }
        bankAcct.withdrawal(withdrawal);
        
    });
   
});

