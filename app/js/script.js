$(document).ready(applyClickHandlers);

// array to hold numbers and operators to be used for calculation
var calculationArr = [];
// represents the last number or operator input to be pressed
var lastInput = '';
// holds a base number to be used for calculator operation repeats or rollovers
var base;
// holds last operation pressed or used
var lastOperation;
// indicates the type of the last pressed input
var lastInputType;
// successiveOps flag to indicate whether an operation button press should also result in a calculation
var successiveOps = false;
// indicates whether a calculation has been made after reset or start of calculator
var firstCalculationMade = false;

function inputNumber(val) {
	if (lastInputType === 'equal') {
		reset();
	} else if (lastInputType === 'operator') {
		calculationArr.push(lastInput);
		lastInput = '';
	}
	lastInputType = 'number';
	if (val !== '.' || lastInput.indexOf('.') === -1) {
		lastInput += val;
	}
	base = lastInput;
	$('.display').val(lastInput);
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
		calculationArr.push(lastInput);
		if (successiveOps) {
			calcAndDisplay();
			var result = $('.display').val();
			calculationArr = [result];
			base = result;
		} else {
			base = lastInput;
		}
	}
	lastInputType = 'operator';
	lastInput = lastOperation = operator;
	successiveOps = true;
}

function calcAndDisplay() {
	calculationArr[0] *= 10;
	calculationArr[2] *= 10;
	var operation = calculationArr[1];
	var statement = calculationArr.join('');
	var result = eval(statement);
	if (operation === '+' || operation === '-') result = result/10;
	else if (operation === '*') result = result/100;
	if (result == Infinity) result = "Error";
	$('.display').val(result);
	reset();
}

function reset() {
	calculationArr = [];
	lastInput = '';
	successiveOps = false;
	base = null;
	lastOperation = null;
	lastInputType = undefined;
	firstCalculationMade = false;
}

function inputEqual() {
	if (lastInputType === undefined) {
		$('.display').val(0);
		return;
	}
	if (calculationArr.length < 1 && !firstCalculationMade) {
		return;
	}
	calculationArr.push(lastInput);
	if (lastInputType === 'operator') {
		calculationArr.push(base);
	} else if (lastInputType === 'equal') {
		if (lastOperation) {
			calculationArr.push(lastOperation, base);
		}
	}
	if (calculationArr.length === 3) {
		var prevBase = base;
		var lastOpSaved = lastOperation;
		calcAndDisplay();
		lastInputType = 'equal';
		base = prevBase;
		lastOperation = lastOpSaved;
		lastInput = $('.display').val();
		firstCalculationMade = true;
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
		$('.calculationArr').text(calculationArr);
		$('.lastInput').text(lastInput);
		$('.base').text(base);
		$('.lastOperation').text(lastOperation);
		$('.lastInputType').text(lastInputType);
		$('.successiveOps').text(successiveOps);
	});
	//Remember to add functionality for clear entry 
}

