/*
 * This is wrraper class for web service call.
 * @api public
 * @param {String} type
 * Tyoe of service e.g. REST, SOAP etc
 * @param {Object} reqObj
 * Request Object.
 * {
			type: "POST",
			url: Alloy.CFG.serverConfig.baseUrl + "/api/Exam/Login",
			inpParam: {
				"UserName": "sample string 1",
				"PassWord": "sample string 2"
			}
	}
 * @param {Object} resObjCallbk
 * Response Object.
 * {
			onSuccess : function(e, xhr) {
				Ti.API.debug(e.responseText);
			},
			onError: function(e) {
				Ti.API.debug(e.error);
			}
		}
 */
function Service(type, reqObj, resObjCallbk) {
	if(type === "REST") {
		var xhr = Ti.Network.createHTTPClient({
			timeout: 300 * 1000,
			onload: function(e) {
				if(e.success){
					resObjCallbk.onSuccess(this, e);
				}
			},
			onError: function(e) {
				resObjCallbk.onError(e);
			}
		});
		Ti.API.debug("Type ==> " + reqObj.type + " Url ==> " + reqObj.url);
		xhr.open(reqObj.type, reqObj.url);
		if(reqObj.type === "POST" && reqObj.inpParam) {
			Ti.API.debug('reqObj.inpParam ==> ' + JSON.stringify(reqObj.inpParam));
			xhr.send(reqObj.inpParam);
		} else {
			xhr.send();
		}
	}
}

module.exports = Service;