Posts = new Mongo.Collection('posts');

Posts.allow({
	update: function (userId, doc) {
		return ownsDocument(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocument(userId, doc);
	}
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.content;
  }
});

Meteor.methods({
	postInsert: function(postAttributes) {
		check(this.userId, String);
		check(postAttributes, {
			title: String,
			content: String,
		});

		var errors = validatePost(postAttributes);
		if (errors.title || errors.content)
			throw new Meteor.Error('invalid-post', "You must set a title and content for your post");

	
		if(Meteor.isServer) {
			// wait for 3 seconds
			Meteor._sleepForMs(3000);
		} else {
			postAttributes.title += " (waits...)";
		}

		var postWithSameLink = Posts.findOne({title: postAttributes.title});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var	post = _.extend(postAttributes, {
			userId: user._id, 
			author: user.username, 
			submitted: new Date(),
			commentsCount: 0,
			pending: Meteor.isServer==false
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
});

validatePost = function (post) {
	var errors = {};
	if (!post.title)
		errors.title = "Please fill in a headline";
	if (!post.content)
		errors.content =  "Please fill in a content";
	return errors;
}

