$(document).ready(applyClickHandlers);

var inputs = [];
var lastInput = '';
var base;
var lastOperation;
var lastInputType;
var successiveOps = false;

function inputNumber(val) {
	if (lastInputType === 'equal') {
		reset();
	} else if (lastInputType === 'operator') {
		inputs.push(lastInput);
		lastInput = '';
	}
	lastInputType = 'number';
	if (val !== '.' || lastInput.indexOf('.') === -1) {
		lastInput += val;
	}
	base = lastInput;
	$('.display').val(lastInput);
}

function reset() {
	inputs = [];
	lastInput = '';
	successiveOps = false;
	base = null;
	lastOperation = null;
	lastInputType = undefined;
}

function inputOperator(operator) {
	if (lastInputType === undefined) {
		$('.display').val(0);
		return;
	}
	if (lastInput === '.') {
		$('.display').val('Error');
		$('.operator').removeClass('highlighted');
		reset();
		return;
	}
	if (lastInputType !== 'operator') {
		inputs.push(lastInput);
		if (successiveOps) {
			calcAndDisplay();
			var result = $('.display').val();
			inputs = [result];
			// if (lastInputType === 'equal') {
			// 	base = result;
			// }
			base = result;
		}
	}
	lastInputType = 'operator';
	lastInput = lastOperation = operator;
	successiveOps = true;
}

function calcAndDisplay() {
	inputs[0] *= 10;
	inputs[2] *= 10;
	var statement = inputs.join('');
	var result = eval(statement);
	result = result/10;
	if (result == Infinity) result = "Error";
	$('.display').val(result);
	reset();
}

function inputEqual() {
	if (lastInputType === undefined) {
		$('.display').val(0);
		return;
	}
	if (!successiveOps) {
		return;
	}
	inputs.push(lastInput);
	if (lastInputType === 'operator') {
		inputs.push(base);
	} else if (lastInputType === 'equal') {
		if (lastOperation) {
			inputs.push(lastOperation, base);
		}
	}
	if (inputs.length === 3) {
		lastInputType = 'equal';
		calcAndDisplay();
		inputs = [];
		lastInput = $('.display').val();
		successiveOps = true;
	}	
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
		$('.display').val(0);
		reset();
	});

	$('.number, .equal').on('mousedown', function() {
		$(this).addClass('pressedA');
	});

	$('.number, .equal').on('mouseup', function() {
		$(this).removeClass('pressedA');
	});

	$('.half-button').on('mousedown', function() {
		$(this).addClass('pressedB');
	});

	$('.half-button').on('mouseup', function() {
		$(this).removeClass('pressedB');
	});	


	// for debugging
	$('button').on('click', function() {
		$('.inputs').text(inputs);
		$('.lastInput').text(lastInput);
		$('.base').text(base);
		$('.lastOperation').text(lastOperation);
		$('.lastInputType').text(lastInputType);
		$('.successiveOps').text(successiveOps);
	});
	//Remember to add functionality for clear entry 
}

