Template.postItem.helpers({
	substr: function(str){
		if(str.length < 10) return str;
		return str.substring(0, 10)+"...";
	},
	withPlural: function(n, str){
		return n+' '+str+(n < 2 ? '':'s');
	},
	nLoadUri: function(){
		console.log(Router.current().params.query);
		return Router.current().params.query.nLoad;
	}
});

