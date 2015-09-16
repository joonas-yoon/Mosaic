Template.loginForm.created = function(){
	this.regMode = new ReactiveVar(false);
};

Template.loginForm.helpers({
	regMode: function(){
		return Template.instance().regMode.get();
	}
});

Template.loginForm.events({
	'click .regToggle': function(evt, template){
		evt.preventDefault();
		var mod = template.regMode.get();
		template.regMode.set(!mod);
	}
});

Template.loginBtn.events({
	'click .modal-opener': function(){
		$('#login.modal').openModal();
	}
});

Template.loginBtn.helpers({
	btnText: function(){
		if(!!Meteor.userId()) return Meteor.user().emails[0].address;
		return "Sign in";
	}
});

Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var emailVar = event.target.registerEmail.value;
    var passwordVar = event.target.registerPassword.value;
    var passwordVar2 = event.target.registerPassword2.value;

	if(passwordVar !== passwordVar2)
		return throwError("See your password for verify");

    Accounts.createUser({
      email: emailVar,
      password: passwordVar
    }, function(error) {
        if (error) {
            throwError(error.reason);
        } else {
            Router.go('/');
        }
    });
  }
});

Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var emailVar = event.target.loginEmail.value;
    var passwordVar = event.target.loginPassword.value;
    Meteor.loginWithPassword(emailVar, passwordVar, function(err){
      if(err)
        throwError("Sorry, Failed Login. Please check your account again.");
      else
        $('#login').closeModal();
    });
  }
});


