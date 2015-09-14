Template.loginBtn.rendered = function(){
	$('.modal-trigger').leanModal({	
      in_duration: 300, // Transition in duration
      out_duration: 200 // Transition out duration
	});
};

Template.loginModal.created = function(){
	this.regMode = new ReactiveVar(false);
};

Template.loginModal.helpers({
	regMode: function(){
		return Template.instance().regMode.get();
	}
});

Template.loginModal.events({
	'click .regToggle': function(evt, template){
		evt.preventDefault();
		var mod = template.regMode.get();
		template.regMode.set(!mod);
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


