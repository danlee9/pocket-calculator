$(document).ready(applyClickHandlers);

var inputs = [];
var currentInput = '';
var base;
var lastOperation;
var type;
var successiveOps = false;

function inputNumber(val) {
	if (type === 'equal') {
		reset();
	} else if (type === 'operator') {
		inputs.push(currentInput);
		currentInput = '';
	}
	type = 'number';
	if (val !== '.' || currentInput.indexOf('.') === -1) {
		currentInput += val;
	}
	base = currentInput;
	$('.display').val(currentInput);
}

function reset() {
	inputs = [];
	currentInput = '';
	successiveOps = false;
	base = null;
	lastOperation = null;
	type = undefined;
}

function inputOperator(operator) {
	if (type === undefined) {
		return;
	}
	if (type !== 'operator') {
		inputs.push(currentInput);
		if (successiveOps) {
			calcAndDisplay();
			var result = $('.display').val();
			inputs = [result];
			if (type === 'equal') {
				base = result;
			}
		}
	}
	type = 'operator';
	currentInput = lastOperation = operator;
	successiveOps = true;
}

function calcAndDisplay() {
	var statement = inputs.join('');
	var result = eval(statement);
	if (result == Infinity) result = "Error";
	$('.display').val(result);
}

function inputEqual() {
	if (type === undefined) {
		return;
	}
	inputs.push(currentInput);
	if (type === 'operator') {
		inputs.push(base);
	} else if (type === 'equal') {
		inputs.push(lastOperation, base);
	}
	type = 'equal';
	calcAndDisplay();
	inputs = [];
	currentInput = $('.display').val();
	successiveOps = true;
}

function applyClickHandlers() {
	$('.number').on('click', function() {
		$('.operator').removeClass('highlighted');
		inputNumber($(this).text());
	});

	$('.operator').on('click', function() {
		$('.operator').removeClass('highlighted');
		$(this).addClass('highlighted');
		inputOperator($(this).text());
	});

	$('.equal').on('click', function() {
		$('.operator').removeClass('highlighted');
		inputEqual();
	});

	$('.clear-all').on('click', function() {
		$('.operator').removeClass('highlighted');
		$('.display').val('');
		reset();
	});

	//Remember to add functionality for clear entry 
}

