Template.postPageView.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	submittedText: function() {
		return this.submitted.toString();
	}
});

Template.postPageComments.helpers({
	comments: function() {
		return Comments.find({postId: this._id});
	}
});
