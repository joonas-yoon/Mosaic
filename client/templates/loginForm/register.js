Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var emailVar = event.target.registerEmail.value;
    var passwordVar = event.target.registerPassword.value;
    console.log("Form submitted.");
  }
});

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailVar = event.target.loginEmail.value;
    var passwordVar = event.target.loginPassword.value;
    console.log("Form submitted.");
  }
});


