Template.header.helpers({
	isNotHomeRoute: function(){
		return Router.current().route.getName(this) != "home";
	}
});

Template.header.rendered = function() {
	$('.button-collapse').sideNav({
      menuWidth: 280, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
}
