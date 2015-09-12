Template.home.created = function(){
	this.regMode = new ReactiveVar(false);
};

Template.home.helpers({
	regMode: function(){
		return Template.instance().regMode.get();
	}
});

Template.home.events({
	'click .regToggle': function(evt, template){
		evt.preventDefault();
		var mod = template.regMode.get();
		template.regMode.set(!mod);
		console.log("Here is reg");
	}
});
