;
(function($) {
	$.fn.step = function(options) {
		return new Step(this, options);
	}
	var Step = function(element, options) {
		var _ = this;
		_.el = $(element);
		_.opts = null;
		_.init(options);
	}
	Step.prototype = {
		stepNum: 1, //默认是在第一步
		init: function(options) {
			var _ = this;
			_.opts = $.extend({}, {
				width: 750,//宽度
				height: 28,//高度
				data: ''//步骤集合
			}, options);
			//创建元素
			_.creatElement(_.opts.data,_.opts.width,_.opts.height);
			//刷新显示效果
			_.refushStep(_.stepNum);
		},
		creatElement: function(obj, wid, height) {
			var _ = this;
			var len = obj.length;
			var el_wid = (wid - (len - 1) * height) / len;
			//定义外部div,存放步骤元素
			var _step = $("<div></div>").attr("id","step-ul").appendTo(_.el);
			_step.css("height", height);
			for (var i = 1; i < len+1; i++) {
				//根据步骤长度生成相应的步骤数，并填充相应步骤的显示值
				$("<div></div>").addClass("step-ul-li").addClass("step-"+i).html(obj[i-1].name).appendTo(_step);
				if (i < len) {
					$("<div></div>").addClass("ui-active").appendTo(_step);
				}
			}
			$(".step-ul-li").css({
				"width": el_wid
			});
			$(".ui-active").css({
				"border-width": height/2
			});
		},
		refushStep: function(num) {
			//获取所有的显示步骤的div，得到一个集合
			var o = $("#step-ul").find(".step-ul-li");
			//遍历集合，已经过的添加pass，正在的添加active，没有过的不做操作
			for (var i = 1; i <= o.length; i++) {
				if (i < num) {
					//添加已经过了属性
					$(".step-"+i).removeClass("active");
					$(".step-"+i).addClass("pass");
					if (num > 1) {
						$(".step-"+i).prev().attr("class","ui-active ui-active-after-out");
						$(".step-"+i).next().removeClass("ui-active-befor");
					} else {
						$(".step-"+i).next().removeClass("ui-active-befor");
					}
				}
				if (i == num) {
					//添加正在操作属性
					$(".step-"+num).addClass("active");
					//判断添加前后的箭头
					if (num > 1) {
						$(".step-"+num).prev().attr("class","ui-active ui-active-after");
						$(".step-"+num).next().addClass("ui-active-befor");
					} else {
						$(".step-"+num).next().attr("class","ui-active ui-active-befor");
					}
				}
				if(i > num){
					//添加正在操作属性
					$(".step-"+i).removeClass("active").removeClass("pass");
					//判断添加前后的箭头
					if (num > 1) {
						$(".step-"+i).prev().removeClass("ui-active-after");
						$(".step-"+i).next().removeClass("ui-active-befor");
					} else {
						$(".step-"+i).next().removeClass("ui-active-befor");
					}
				}
			}
		},
		nextStep: function() {
			var len = $("#step-ul").find(".step-ul-li").length;
			if(this.stepNum < len){
				this.stepNum++;
			}
			this.refushStep(this.stepNum);
		},
		prevStep: function() {
			if(this.stepNum>1){
				this.stepNum--;
			}
			this.refushStep(this.stepNum);
		},
		getStep:function(){
			return this.stepNum;
		}
	}
})(jQuery)