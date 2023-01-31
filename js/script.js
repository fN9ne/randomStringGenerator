document.addEventListener('DOMContentLoaded', () => {
	const lib = ['0123456789', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'];
	const checkboxElements = document.querySelectorAll('.checkbox input');
	const alert = document.querySelector('.generator__alert');
	const resultField = document.querySelector('.field_result input');
	const lengthField = document.querySelector('.generator__length input');

	lengthField.addEventListener('input', event => {
		const value = event.target.value;

		if (isDigit(value)) {
			if (parseInt(value) > 100) {
				event.target.value = 100;
			}
			if (parseInt(value) < 1) {
				event.target.value = 1;
			}
		}
	});

	function isDigit(string) {
		return /^\d+$/.test(string);
	}

	const errors = {
		checkboxes: 'At least one set of characters must be selected!',
		inputLength: 'Incorrect string length!',
	}

	let allowedSymbols = [false, false, false];

	const generatorForm = document.forms.generator;

	generatorForm.addEventListener('submit', (event) => {
		event.preventDefault();

		let sample = result = '';

		const checkboxes = event.target.checkbox;

		for (let i = 0; i < checkboxes.length; i++) {
			allowedSymbols[i] = checkboxes[i].checked;
			if (checkboxes[i].checked) {
				sample += lib[i];
			}
		}

		if (lengthField.value && /^\S/.test(lengthField.value) && /^\d+$/.test(lengthField.value)) {
			for (let i = 0; i < parseInt(lengthField.value); i++) result += getRandomCharacter(sample);
			resultField.value = result;
			alert.classList.add('generator__alert_hidden');
		} else {
			alert.textContent = errors.inputLength;
			alert.classList.remove('generator__alert_hidden');
		}
	});

	checkboxElements.forEach(checkbox => {
		checkbox.addEventListener('click', event => {
			const checkboxName = checkbox.getAttribute('name');
			const checkboxes = checkbox.closest('form').querySelectorAll(`input[name="${checkboxName}"]`);

			let noOneNoChecked = false;

			for (let i = 0; i < checkboxes.length; i++) {
				if (checkboxes[i].checked) {
					noOneNoChecked = true;
					break;
				} else {
					noOneNoChecked = false;
				}
			}

			if (!noOneNoChecked) {
				event.preventDefault();
				alert.textContent = errors.checkboxes;
				alert.classList.remove('generator__alert_hidden')
			} else {
				alert.classList.add('generator__alert_hidden')
			}
		});
	});

	function getRandomCharacter(sample) {
		return sample[Math.floor(Math.random() * sample.length)];
	}

	document.querySelector('.copy').addEventListener('click', () => {
		window.navigator.clipboard.writeText(resultField.value);
	});

});