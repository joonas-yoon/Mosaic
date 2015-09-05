Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {title: 1, submitted: -1}});
  }
});

Template.postItem.helpers({
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
});
