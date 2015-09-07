Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'preloader',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return [Meteor.subscribe('notifications'), Meteor.subscribe('posts')];
	}
});

Router.route('/', {
	name: 'home'
});

Router.route('/post/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id); },
	waitOn: function() {
		return Meteor.subscribe('comments', this.params._id);
	}
});

Router.route('/post/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5, 
	postsLimit: function() { 
		return parseInt(this.params.postsLimit) || this.increment; 
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.postsLimit()};
	},
	waitOn: function() {
//		return Meteor.subscribe('posts', this.findOptions());
	},
	data: function() {
		return {posts: Posts.find({}, this.findOptions())};
	}
});

Router.route('/posts/:postsLimit?', {
	name: 'postsList',
	template: 'postsList'
});

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
