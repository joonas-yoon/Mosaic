// Local (client-only) collection
Errors = new Mongo.Collection(null);

throwError = function(message) {
	Errors.insert({message: message});
	while(Errors.find().count() > 0){
		var e = Errors.findOne();
		Materialize.toast(e.message, 4000, 'pink accent-4');
		Errors.remove(e._id);
	}
};
