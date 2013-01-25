'use strict';

describe('datepicker', function () {
		var scope, $sandbox, $compile, $timeout;

	beforeEach(module('$strap.directives'));

	beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
		scope = $rootScope;
		$compile = _$compile_;
		$timeout = _$timeout_;

		$sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
		scope.model = {};
	}));

	afterEach(function() {
		$sandbox.remove();
		scope.$destroy();
		$('.datepicker').remove();
	});

	var templates = {
		'default': '<input type="text" ng-model="model.date" data-date-format="yyyy/mm/dd" bs-datepicker>'
	};

	function compileDirective(template) {
		template = template ? templates[template] : templates['default'];
		template = $(template).appendTo($sandbox);
		return $compile(template)(scope);
	}

	// Tests

	it('should add "data-toggle" attr for you', function () {
		var elm = compileDirective();
		expect(elm.attr('data-toggle') === 'datepicker').toBe(true);
	});

	it('should correctly call $.fn.datepicker', function () {
		var spy = spyOn($.fn, 'datepicker');
		var elm = compileDirective();
		expect(spy).toHaveBeenCalled();
	});

	it('should show/hide the datepicker', function() {
		var elm = compileDirective();
		elm.datepicker('show');
		expect(elm.data('datepicker').picker.is(':visible')).toBe(true);
		elm.datepicker('hide');
		expect(elm.data('datepicker').picker.is(':visible')).toBe(false);
	});

	it('should show the datepicker on click', function() {
		var elm = compileDirective();
		elm.trigger('click');
		expect(elm.data('datepicker').picker.is(':visible')).toBe(true);
	});

	it('should show the datepicker on focus', function(/*done*/) {
		var elm = compileDirective();
		elm.trigger('focusin');
		expect(elm.data('datepicker').picker.is(':visible')).toBe(true);
		elm.trigger('focusout');
		/*setTimeout(function() {
			expect(elm.data('datepicker').picker.is(':visible')).toBe(false);
			dump(elm.data('datepicker').picker.get(0).outerHTML);
			done();
		}, 200);*/
	});

	it('should correctly update both input value and bound model', function() {
		var elm = compileDirective();
		elm.trigger('focusin');
		$("body > .datepicker").find('td.active').trigger('click');
		elm.trigger('focusout');
		expect(elm.val() !== '').toBe(true);
		expect(scope.model.date).toBe(elm.val());
	});

});
