/*
 * Copyright 2012 enix
 * enix@foxmail.com
 * Date: 2012-7-31
 */
function Class(init, attributes) {
	var indicator = arguments.callee, that = this;

	function factory(i, a) {
		a || (a = {});
		a.toString() === '[object Object]' ? a : {};
		return [

			this.init = typeof(i) === 'function' ? i : function () {
			},
			this.attrs = a

		];
	}

	return function () {
		var that = this,
			indicator = arguments.callee,
			slice = [].slice,
			args = slice.call(arguments, 0),
			ins = new factory(init, attributes),
			pb,
			i;
		//还没有妥善解决参数问题 所以创建实例时必须使用new关键字
		//if (!(this instanceof indicator)) {
		//	return that = new indicator(args);
		//}
		ins[0].apply(this, arguments);
		pb = indicator.prototype;
		pb.constructor = indicator;
		for (i in ins[1]) {
			if (ins[1].hasOwnProperty(i) && !pb[i]) {
				pb[i] = function () {
					var attr = ins[1][i];
					if (typeof attr === 'function') {
						return function () {
							return attr.apply && attr.apply(that, slice.call(arguments, 0));
						}
					} else {
						return attr;
					}
				}();
			}
		}
		pb._get_ || (

			pb._get_ = function (key) {
				var attr = pb[key]
				return attr ? attr : -1;
			}

		);
		pb._set_ || (

			pb._set_ = function (key, value) {
				pb[key] || (pb[key] = value);
			}

		);
		return that;
	}
}


