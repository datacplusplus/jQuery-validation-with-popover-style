/*
* this validation file it is need to add more validation method as required
* the validation methods just example
*/

//store interval time for each popover message in case it is required to reset 
var timer={};

//This function will show popover message
function messageBox(field,message){
	$(field).popover({
		trigger: 'manual',
		placement: 'bottom',
	});
	$(field).attr('data-content',message);
	$(field).popover("show");

	//reset previous interval 
	clearInterval(timer[$(field).attr('id')]);

	//set new one
 	timer[$(field).attr('id')] =window.setInterval(function()
	{
		$(field).popover("hide");
	}, 8000);  
}

//initial jquery validation and check which element has error to set valid or invalid class
$("#form").validate({
	showErrors: function() {
		if (this.settings.highlight) {
			for (var i = 0; this.errorList[i]; ++i) {
				this.settings.highlight.call(this, this.errorList[i].element,
					this.settings.errorClass, this.settings.validClass);
			}
		}
		if (this.settings.unhighlight) {
			for (var i = 0, elements = this.validElements(); elements[i]; ++i) {
				this.settings.unhighlight.call(this, elements[i],
					this.settings.errorClass, this.settings.validClass);
			}
		}
	},
	rules,
	focusInvalid: false,
	validClass: "valided",
	errorClass: "invalided",
	ignore: '.no-validation',
	onblur:true,
	onkeyup :false,
	onclick : false,       
});

//hidden popover message in case click on element
$('#form').find(':input').each(function(){
	$( this ).click(function(event) {
		$(this).popover("hide");
	});
});


//create nonEmpty validation (cant call required because it is already exist)
jQuery.validator.addMethod('nonEmpty', function(value, element) {
	if(isEmpty(document.getElementById(element.id))){
		messageBox(element,"هذا الحقل مطلوب");
		return false;
	}
	return true;
});

//overried email validation (already exist)
$.validator.methods.email = function(value, element, param) {
	if (checkemail(document.getElementById(element.id))) {
		return true;
	}
	messageBox(element,"يجب ادخال البريد الالكتروني بالصيغة الصحيحة");
	return false;
}

jQuery.validator.addMethod("Arabic", function(value, element){
	if (CheckArabicword(document.getElementById(element.id))) {
		return true;
	}
	element.value = "";
	messageBox(element,"يجب ادخال حروف عربية");
	return false;
},'');

jQuery.validator.addMethod("English", function(value, element){
	if (CheckEnglishword(document.getElementById(element.id))) {
		return true;
	}
	element.value = "";
	messageBox(element,"يجب ادخال حروف الانكلزية");
	return false;
},'');


//custom function to check different things

//check if element empty
function isEmpty(element){
	if(element && element.value && element.value.length>0){
		return false;
	}
	return true;

}


//check email syntax
function checkemail(field) {
	if(isEmpty(field)){
		return true;
	}
	var email = field.value;
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email)) {
		return true;
	} 
	return false;
}

// prevent any not arabic character
function CheckArabicOnly(field,event) {
	var c = event.key;
	if (!isArabic(c) && c != ' ' && (event.keyCode != 8 && event.keyCode != 9)) {
		messageBox(field,"يسمح بادخال الحروف العربية فقط في هذا الحقل");
		event.preventDefault();
	}
}

// check if character is arabic or not
function isArabic(c) {
	if (c >= 'ا' && c <= 'ي' || (c == 'ء' || c == 'ؤ' || c == 'ئ' || c == 'أ'))
		return true;
	return false;
}


// prevent any not english character
function CheckEnglishOnly(field,event) {
	var c = event.key;
	if (!isEnglish(c) && c != ' ' && c != '-' && (event.keyCode != 8 && event.keyCode != 9)) {
		messageBox(field,"يسمح بادخال الحروف الانكلزية و الرمز '-' فقط في هذا الحقل");
		event.preventDefault();

	}
}


// check if character is english or not
function isEnglish(c) {
	if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'))
		return true;
	return false;
}


//check if word is arabic or not
function CheckArabicword(field) {
	if(isEmpty(field)){
		return true;
	}
	var string = field.value;
	for (i = 0; i < string.length; i++) {
		var c = string.charAt(i);
		if (!isArabic(c) && c != ' ') {
			return false;
		}
	}
	return true;
}

//check if word is english or not
function CheckEnglishword(field) {
	if(isEmpty(field)){
		return true;
	}
	var string = field.value;
	for (i = 0; i < string.length; i++) {
		var c = string.charAt(i);
		if (!isEnglish(c) && c != ' ' && c != '-') {
			return false;
		}
	}
	return true;
}