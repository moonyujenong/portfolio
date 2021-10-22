;(function ($, win, doc, undefined) {

	'use strict';

	var global = '$plugins';
	var namespace = 'aj.plugins';

	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = createNameSpace(namespace, {
			uiNameSpace: function (identifier, module) {
				return createNameSpace(identifier, module);
			}
		});
	}


	win[global] = win[global].uiNameSpace(namespace, {
		uiAjax: function (opt) {
			return createUiAjax(opt);
		},

		sectionActive: function(opt){
			return mainSectionActive(opt);
		},
	});


	function createNameSpace(identifier, module) {
		var name = identifier.split('.');
		var	w = win,
			p,
			i = 0;
		if (!!identifier) {
			for (i = 0; i < name.length; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}
		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					//throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}


	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		type: 'GET',
		callback: false,
		errorCallback: false
	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiAjax.option, opt),
			$id = $('#' + opt.id),
			callback = opt.callback === undefined ? false : opt.callback,
			errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		$.ajax({
			url: opt.url,
			method: opt.type,
			async: false,
			cache: false,

			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				opt.page ? opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v) : '';
				callback ? callback(v) : '';
			}
		});
	}

	function mainSectionActive(){
		var $section = $('.section'),
			$secOffsetH = $section.map(function(index) {
				return 'sec-'+index + ': '+$(this).offset().top;
			}).get();

		var secActive = function(e){
			var viewScrollTop = $(win).scrollTop();
			console.log('viewScrollTop : '+viewScrollTop)
			// console.log($secOffsetH)

			var isWheel = true;

			var $active = $(".section.active");
			var offSet = -80;
			var delta = 0;
			var event;

			event = e.originalEvent;
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
				if (window.opera) delta = -delta;
			} else if (event.detail) delta = -event.detail / 3;

			var moveTop = null;
			if (delta < 0 && $active.next().length > 0) {
				moveTop = $active.next().offset().top + offSet;
				$("html, body").stop().animate({scrollTop: moveTop}, 500, 'swing', function() { isWheel = false; });
			}
			else if (delta > 0 && $active.prev().length > 0){
				moveTop = $active.prev().offset().top + offSet;
				$("html, body").stop().animate({scrollTop: moveTop}, 500, 'swing', function() { isWheel = false; });
			}
			if ($(".section:last").hasClass('active')){
				if (delta < 0) {
					moveTop = $(document).height() - $(window).height();
					$("html, body").stop().animate({scrollTop: moveTop}, 200, 'swing', function() { isWheel = false; });
				}
			} else if ($("#cfmClFooter").hasClass('active')) {
				if (delta > 0) {
					moveTop = $(".section:last").offset().top + offSet;
					$("html, body").stop().animate({scrollTop: moveTop}, 200, 'swing', function() { isWheel = false; });
				}
			}
			isWheel = true;
		}

		// secActive()
		// $(win).off('scroll.secactive').on('scroll.secactive', function(){
		// 	secActive();
		// });
		$("#wrap").on("mousewheel DOMMouseScroll", function(e){
			e.preventDefault();
			secActive(e);
		});

	}

})(jQuery, window, document);


// notice ticker
;(function (a){
	a.fn.Vnewsticker = function (b){
		var c = {
			speed : 700,
			pause : 4000,
			showItems : 3,
			mousePause : true,
			isPaused : false,
			direction : "left",
			width : 0
		};
		var b = a.extend(c, b);
		moveSlide = function (g, d, e){
			if (e.isPaused) {
				return
			}
			var f = g.children("ul");
			var h = f.children("li:first").clone(true);
			if (e.width > 0) {
				d = f.children("li:first").width()
			}
			f.animate({
				left : "-=" + d + "px"
			},
			e.speed, function (){
				a(this).children("li:first").remove();
				a(this).css("left", "0px")
			});
			h.appendTo(f)
		};
		moveUp = function (g, d, e){
			if (e.isPaused) {
				return
			}
			var f = g.children("ul");
			var h = f.children("li:first").clone(true);
			if (e.height > 0) {
				d = f.children("li:first").height()
			}
			f.animate({
				top : "-=" + d + "px"
			},
			e.speed, function (){
				a(this).children("li:first").remove();
				a(this).css("top", "0px")
			});
			h.appendTo(f)
		};
		moveDown = function (g, d, e){
			if (e.isPaused) {
				return
			}
			var f = g.children("ul");
			var h = f.children("li:last").clone(true);
			if (e.height > 0) {
				d = f.children("li:first").height()
			}
			f.css("top", "-" + d + "px").prepend(h);
			f.animate({
				top : 0
			},
			e.speed, function (){
				a(this).children("li:last").remove()
			});
		};
		return this.each(function (){
			var f = a(this);
			var e = 0;
			var u = f.children("ul");
			var l = u.children("li").length;
			var w = u.children("li").width();
			var ulw = l * w + "px";

			f.css({overflow : "hidden"}).children("ul").css({position : "absolute" });

			if (b.width == 0){
				f.children("ul").children("li").each(function (){
					if (a(this).width() > e) {
						e = a(this).height();
						e2 = a(this).width();
					}
				});
				f.children("ul").children("li").each(function (){
					// a(this).height(e)
				});
				// f.height(e * b.showItems)
			}
			else {
				f.width(b.width)
			}
			var d = setInterval(function (){
				if (b.direction == "left") {
					moveSlide(f, e2, b)
					u.css({width : ulw})
				} else if (b.direction == "up") {
					moveUp(f, e, b)
				}
				else {
					moveDown(f, e, b)
				}
			}, b.pause);
			if (b.mousePause){
				f.bind("mouseenter", function (){
					b.isPaused = true;
				}).bind("mouseleave", function (){
					b.isPaused = false;
				})
			}
		})
	}
})(jQuery);