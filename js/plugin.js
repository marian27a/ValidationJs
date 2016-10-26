
function ValidateForm(settings) {
	this.settings = settings;

	if (this.settings.newRegExp) {
		this.addRegExp(this.settings.newRegExp);
	}
}
ValidateForm.prototype.init = function() {
	var self = this;
	this.submit = document.querySelectorAll('input.send-form');
	this.actionUi(self);
};
ValidateForm.prototype.regExp =  {
	name: /[a-zа-я]/gi,
};
ValidateForm.prototype.addRegExp = function(obj){
	for(var key in obj){
		this.regExp[key] = obj[key];
	}
}
ValidateForm.prototype.actionUi = function(self){
	for(var i = 0, max = this.submit.length; i < max; i++){
		this.submit[i].onclick = function(event){
			event.preventDefault();
			self.validForm(this,self);
		}
	}
}
ValidateForm.prototype.validForm = function(curentSubmit, self){
	var submit = curentSubmit;
	self.form = submit.closest('form');
	var checkForm = true;
	for(var i = 0, max = self.form.length; i < max; i++){
		if (self.form[i].matches('input[type="text"]')) {
			var inputName = self.form[i].name;
			if (inputName == 'name') {
				if (self.regExp[inputName].test(self.form[i].value)) {
					self.form[i].classList.add('success');
					self.form[i].classList.remove('wrong');
				} else{
					self.form[i].classList.add('wrong');
					self.form[i].classList.remove('success');
					checkForm = false;
				}
			}
		}
	}
	if (checkForm) {
		self.sendForm(self.form);
	} else{
		$('#modal2').openModal();
	}

}
ValidateForm.prototype.sendForm = function (form) {
	var xhr = new XMLHttpRequest();
	var thisForm = $(form).serialize();
	xhr.open('post', 'sendmail.php', true);
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 && xhr.status == 200 ){
			$('#modal1').openModal();
		}
	}
	xhr.send(thisForm);
}
var valid = new ValidateForm({
	newRegExp: {
		phone: /[0-9]/g,
	}
})
window.onload = valid.init.call(valid);
