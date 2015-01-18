var args = arguments[0];

if(args) {
	(OS_IOS) ? $.tabs.setTitle("Tab " + args.index) : $.tabs.setTitle(args.resObj.Header);
	$.win.setTitle(args.resObj.Header);
	$.lblContent.setText(args.resObj.Body);
}
