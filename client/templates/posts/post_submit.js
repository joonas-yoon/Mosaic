Template.postSubmit.created = function() {
  Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'invalid' : '';
  }
});

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      content: $(e.target).find('[name=content]').val()
    };

    var errors = validatePost(post);
    if (errors.title || errors.content)
      return Session.set('postSubmitErrors', errors);

	Meteor.call('postInsert', post, function(error, result) {
		// display the error to the user and abort
		if (error)
			return throwError(error.reason);

		// show this result but route anyway
		if (result.postExists) {
			return throwError('This title has already been posted');
		}
	});
	Router.go('postsList');
  }
});

Template.postSubmit.rendered = function() {
  $('textarea.materialize-textarea').characterCounter();
}

