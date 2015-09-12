/*
Accounts.onCreateUser(function(options, user){
    var newEmail = user.emails[0].address;
    console.log(newEmail);
    var emailAlreadyExist = Meteor.users.find({"emails.address": newEmail}, {limit: 1}).count() > 0;
    console.log(emailAlreadyExist + ' exitence');
    if(emailAlreadyExist === true) {
        throw new Meteor.Error(403, "email already registered");
    }
    else {
        profile = options.profile;
        profile.nameOfArray = [];
        user.profile = profile;
        return user;
    }
});
*/

