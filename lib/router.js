Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'preloader',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
	}
});

Router.route('/', {
	template: 'postsList'
});

Router.route('/posts', {
//	template: 'postsList'
	name: 'postsList', 
	data: {
		posts: function(){ return Posts.find(); }
	}
});

Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id); },
	waitOn: function() {
		return Meteor.subscribe('comments', this.params._id);
	}
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
	if (! Meteor.user()) {
		this.render('accessDenied');
		if (Meteor.loggingIn()) {
			this.render('preloaderBar');
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
