Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'preloader',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});

Router.route('/', {
	name: 'home'
});

Router.route('/post/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id); },
	waitOn: function() {
		return [
			Meteor.subscribe('singlePost', this.params._id),
			Meteor.subscribe('comments', this.params._id)
		];
	}
});

Router.route('/post/:_id/edit', {
	name: 'postEdit',
	data: function() { return Posts.findOne(this.params._id); },
	waitOn: function() {
		return Meteor.subscribe('singlePost', this.params._id);
	}
});

Router.route('/submit', {name: 'postSubmit'});

Router.route('/notifications', {name: 'notificationPage'});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 4, 
	postsLimit: function() { 
		return parseInt(this.params.postsLimit) || this.increment; 
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.postsLimit()};
	},
	subscriptions: function() {
		this.postsSub = Meteor.subscribe('posts', this.findOptions());
	},
	posts: function() {
		return Posts.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.posts().count() === this.postsLimit();
		var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
		return {
			posts: this.posts(),
			ready: this.postsSub.ready,
			nextPath: hasMore ? nextPath : null
		};
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
