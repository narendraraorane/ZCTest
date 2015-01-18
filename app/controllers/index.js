function login() {
	var usrName = $.txtUserName.getValue().trim();//"zcuser";
	var password = $.txtPassword.getValue().trim();//

	if(usrName === "") {
		Alloy.Globals.addClass($, $.lblMsg, "userNmValMsg");
		$.txtUserName.focus();
		return;
	} else if(password === ""){
		Alloy.Globals.addClass($, $.lblMsg, "passValMsg");
		$.txtPassword.focus();
		return;
	} else {
		var Service = require("service");
		var srvObj = new Service("REST", {
			type: "POST",
			url: Alloy.CFG.serverConfig.baseUrl + "/api/Exam/Login",
			inpParam: {
				"UserName": usrName,
				"PassWord": password
			}
		}, {
			onSuccess : function(e, xhr) {
				var resObj = JSON.parse(e.responseText);
				Ti.API.debug('resObj ==> ' + resObj.Message);
				if(resObj.Message === "Success") {
					usrName, password, Service, srvObj = null;
					var ctlr = Alloy.createController("content", {"Id": resObj.Id});
				} else if(resObj.Message === "Fail") {
					$.txtUserName.setValue("");
					$.txtUserName.focus();
					$.txtPassword.setValue("");
					$.lblMsg.setText("Incorrect Login Credentials");
					return;
				}
			},
			onError: function(e) {
				Alloy.Globals.addClass($, $.lblMsg, "serverErrMsg");
				usrName, password, Service, srvObj = null;
				return;
			}
		});
	}
}

function nextTxt() {
	$.txtPassword.focus();
}

$.index.open();
