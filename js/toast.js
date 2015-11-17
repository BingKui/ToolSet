;
var AIToastTip = function(options) {
	this.init(options);
}
AIToastTip.prototype = {
	init: function(options) {
		var _ = this;
		_.opts = $.extend({}, {
			message: '',
			timeout: 2000,
			top:200,
			type: 'success' //success,error,info,question,warn,warn-little
		}, options);
		var _toast = $("<div>").addClass("ui-tip-toast").appendTo($("body"));
		var _con = $("<div>").addClass("ui-toast-centent").appendTo(_toast);
		$("<span>").addClass("span-" + _.opts.type).appendTo(_con);
		$("<p>").html(_.opts.message).appendTo(_con);
		var _wid = _toast.width()+42;
		_toast.css("margin-left", -_wid / 2 + "px");
		_toast.css("margin-top", _.opts.top + "px");
		_toast.hide();
		_.opts.tip = _toast;
	},
	setPosition: function(x) {
		this.opts.tip.css({
			"margin-top": x
		});
	},
	setContent:function(str){
		this.opts.tip.find("p").html(str);
		var _wid = this.opts.tip.width()+42;
		this.opts.tip.css("margin-left", -_wid / 2 + "px");
	},
	open:function(){
		var _ = this;
		_.opts.tip.fadeIn();
		setTimeout(function(){
			_.opts.tip.fadeOut();
		},_.opts.timeout);
	}
}