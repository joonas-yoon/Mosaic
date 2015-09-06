Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId});
  },
  notificationPostTitle: function() {
    return Posts.findOne({_id: this.postId}).title;
  }
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});

Template.notifications.rendered = function() {
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false,
      gutter: 10
    }
  );
  $('.notifi-btn').leanModal();
};

