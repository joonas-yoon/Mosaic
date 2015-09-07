if (Posts.find().count() < 10) {

  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    createdAt : new Date(),
    services : {
      password : { bcrypt : "\$2a\$10\$GENCwS2IQxujGBFoT1FShux2lrM7ZIivtzC4ZvXY9QYqF8qujMdP2" },
      resume : { loginTokens : [ ] }
    },
    username: "Tom Coleman"
  });
  var sachaId = Meteor.users.insert({
    createdAt : new Date(),
    services : {
      password : { bcrypt : "\$2a\$10\$GENCwS2IQxujGBFoT1FShux2lrM7ZIivtzC4ZvXY9QYqF8qujMdP2" },
      resume : { loginTokens : [ ] }
    },
    username: "Sacha Greif"
  });

  var tom = Meteor.users.findOne(tomId);
  var sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.username,
    content: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2
  });

  Comments.insert({
    postId: telescopeId,
    userId: tom._id,
    author: tom.username,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.username,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });

  Posts.insert({
    title: 'Meteor',
    userId: tom._id,
    author: tom.username,
    content: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0
  });

  for(var i=0; i < 12; ++i){
  Posts.insert({
    title: 'Post #'+i,
    userId: tom._id,
    author: tom.username,
    content: '## Test for paging '+ i,
    submitted: new Date(now - i * 3600 * 1000),
    commentsCount: 0
  });
  }

}
