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
    return errors.title || errors.url;
  }
});

Meteor.methods({
	postInsert: function(postAttributes) {
		check(this.userId, String);
		check(postAttributes, {
			title: String,
			url: String,
		});

		var errors = validatePost(postAttributes);
		if (errors.title || errors.url)
			throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

	
		if(Meteor.isServer) {
			// wait for 5 seconds
			Meteor._sleepForMs(5000);
		} else {
			postAttributes.title += " (waits...)";
		}

		var postWithSameLink = Posts.findOne({url: postAttributes.url});
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
	if (!post.url)
		errors.url =  "Please fill in a URL";
	return errors;
}

