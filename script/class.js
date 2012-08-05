/*
 * Copyright 2012 enix
 * enix@foxmail.com
 * Date: 2012-7-31
 */
function Class(init, attributes) {
	var klass = arguments.callee, that = this;

	klass.factory ||(klass.factory=function(i, a) {
		a || (a = {});
		a.toString() === '[object Object]' ? a : {};
		return [
			this.init = typeof(i) === 'function' ? i : function () {
			},
			this.attrs = a
		];
	});

	return function () {
		var that = this,
			indicator = arguments.callee,
			slice = [].slice,
			args = slice.call(arguments, 0),
			ins = new klass.factory(init, attributes),
			pb,
			i;


		/*
		*
		* 下面几行代码用于，不使用new运算符产生类实例
		* 代码不是很优雅但可以保证功能
		*
		* */
		indicator.fake;
 		if (!(that instanceof indicator) && that===window) {
			indicator.fake=true;
			return indicator.apply(new indicator(),args);
		}
		if(indicator.fake===true){
			indicator.fake=false;
			return that;
		}
		//
		ins[0].apply(this, arguments);
		pb = indicator.prototype;
		pb.constructor = indicator;
		for (i in ins[1]) {
			if (ins[1].hasOwnProperty(i) && !pb[i]) {
				pb[i] = function () {
					var attr = ins[1][i];
					if (typeof attr === 'function') {
						return function () {
							return attr.apply && attr.apply(this, slice.call(arguments, 0));
						}
					} else {
						return attr;
					}
				}();
			}
		}
		pb._get_ || (
			pb._get_ = function (key) {
				var attr = this[key]
				return attr ? attr : -1;
			}
			);
		pb._set_ || (
			pb._set_ = function (key, value) {
				this[key] || (this[key] = value);
			}
			);
		return that;
	}
}


