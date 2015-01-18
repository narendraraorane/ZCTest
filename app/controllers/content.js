var args = arguments[0] || {};

(function() {

	var Service = require("service");

	var srvObj = new Service("REST", {
		type : "GET",
		url : Alloy.CFG.serverConfig.baseUrl + "/api/Exam/Content",
	}, {
		onSuccess : function(e, xhr) {
			var resObj = JSON.parse(e.responseText);
			Ti.API.debug('resObj ==> ' + resObj + " " + resObj.length);
			if (resObj instanceof Array) {
				for(var i=0, len = resObj.length; i < len; i++) {
					var tab = Alloy.createController("tabs", {resObj : resObj[i], index: i+1}).getView();
					$.content.addTab(tab);
				}
			} else {
				var tab = Alloy.createController("tabs").getView();
				$.content.addTab(tab);			
			}
			$.content.open();
		},
		onError : function(e) {
			var tab = Alloy.createController("tabs").getView();
			$.content.addTab(tab);
			$.content.open();			
			return;
		}
	}); 
})();
