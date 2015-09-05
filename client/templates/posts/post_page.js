Template.postPage.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	}
});

Template.postPageComments.helpers({
	comments: function() {
		return Comments.find({postId: this._id});
	}
});
