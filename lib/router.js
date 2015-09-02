Router.configure({
	loadingTemplate: 'preloader',
	layoutTemplate: 'layout',
	waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function() {
	this.route('/', {
	
	});
	this.route('postsList', {
		path: '/posts'
	});
});
