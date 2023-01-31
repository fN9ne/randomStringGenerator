const fields = document.querySelectorAll('input[type=text],input[type=password]');
const buttons = document.querySelectorAll('.button');
const emailFields = document.querySelectorAll('.field__email');
const usernameFields = document.querySelectorAll('.field__username');
const passwordFields = document.querySelectorAll('.field__password');
const select = document.querySelectorAll('.select');
const toggle = document.querySelectorAll('.toggle');

/*

ВАЛИДАЦИЯ

*/
/*
КРИТЕРИИ ВАЛИДАЦИИ:
Почта в формате: название@домен.домен
Имя пользователя: длина от 5 до 20 включительно
Пароль: длина от 8 до 30 включительно
Select: обязательно должен быть выбран элемент
*/

const validateRules = {
	username: {
		minLength: 5,
		maxLength: 20,
	},
	password: {
		minLength: 8,
		maxLength: 30,
	}
}

const isValidate = true;

if (isValidate) {
	/* Валидация email-полей */
	if (emailFields.length > 0) {
		emailFields.forEach(input => {
			input.addEventListener('input', (event) => {
				const regex = /\w+@\w+\.\w{2}/;
				validation(input, event.target.value, regex);
			});
		});
	};
	/* Валидация username-полей */
	if (usernameFields.length > 0) {
		usernameFields.forEach(input => {
			input.addEventListener('input', (event) => {
				const regex = new RegExp(`^.{${validateRules.username.minLength},${validateRules.username.maxLength}}$`);
				validation(input, event.target.value, regex);
			});
		});
	};
	/* Валидация password-полей */
	if (passwordFields.length > 0) {
		passwordFields.forEach(input => {
			input.addEventListener('input', (event) => {
				const regex = new RegExp(`^.{${validateRules.password.minLength},${validateRules.password.maxLength}}$`);
				validation(input, event.target.value, regex);
			});
		});
	};
	/* Функция валидации select'ов */
	function selectValidate(select) {
		select.forEach(selectItem => {
			const parentSelect = selectItem.closest('.select');
			const items = parentSelect.querySelectorAll('.select__item');
			if (selectItem.value == '') {
				parentSelect.classList.add('select_invalid');
			} else {
				parentSelect.classList.remove('select_invalid');
			}
			items.forEach(item => {
				item.addEventListener('click', () => {
					parentSelect.classList.remove('select_invalid');
				});
			});
		});
	};
	/* Применение функции валидации select'ов ↓↓↓↓↓↓↓ */
	/* document.forms.form.addEventListener('submit', (event) => {
		event.preventDefault();
		selectValidate(form.select);
	}); */

	/* Функция валидации */
	function validation(field, value, regex) {
		if (!regex.test(value) && value.length != 0) {
			field.classList.add('field_invalid');
		} else {
			field.classList.remove('field_invalid');
		};
	};
}

/*

ОСТАЛЬНЫЕ ОБРАБОТКИ ЭЛЕМЕНТОВ

*/

/* Toggle */
if (toggle.length > 0) {
	toggle.forEach(item => {
		const input = item.querySelector('input');
		item.addEventListener('click', () => {
			if (!item.classList.contains('toggle_active')) {
				item.classList.add('toggle_active');
				input.value = 'on';
			} else {
				item.classList.remove('toggle_active');
				input.value = 'off';
			};
		});
	});
};

/* Ripple-эффект для кнопок */
if (buttons.length > 0) {
	buttons.forEach(btn => {
		btn.addEventListener('click', (event) => {
			let x = event.pageX - event.target.closest('.button').offsetLeft;
			let y = event.pageY - event.target.closest('.button').offsetTop;

			const ripple = document.createElement('div');

			ripple.style.left = x + 'px';
			ripple.style.top = y + 'px';

			btn.appendChild(ripple);

			setTimeout(() => {
				ripple.remove();
			}, 500);
		});
	});
}

/*
Добавление класса к полю, если в нём хотя бы 1 символ

Целью этого является изменение цвета иконки инпута, как
раз таки символизирующего о том, что поле заполнено
*/
if (fields.length > 0) {
	fields.forEach(item => {
		item.addEventListener('input', (event) => {
			const input = event.target;
			const field = input.closest('.field');

			if (input.value.length > 0) {
				field.classList.add('field_filled');
			} else {
				field.classList.remove('field_filled');
			}
		});
	});
}

/* Переключение режима просмотра пароля */
if (passwordFields.length > 0) {
	passwordFields.forEach(item => {
		const viewModeButton = item.querySelector('.field__view-mode');

		viewModeButton.addEventListener('click', (event) => {
			const button = event.target.closest('.field__view-mode');
			const input = event.target.closest('.field__password').querySelector('input');

			if (!button.classList.contains('field__view-mode_show')) {
				button.classList.add('field__view-mode_show');
				input.setAttribute('type', 'text');
			} else {
				button.classList.remove('field__view-mode_show');
				input.setAttribute('type', 'password');
			}
		});
	});
}

/* Обработка выпадающих списков (селектов) */
if (select.length > 0) {
	select.forEach(item => {
		const header = item.querySelector('.select__header');
		const body = item.querySelector('.select__body');
		const items = Array.from(body.children);
		const input = item.querySelector('input');
		const current = item.querySelector('.select__current');

		header.addEventListener('click', () => {
			if (item.classList.contains('select_active')) {
				item.classList.remove('select_active');
			} else {
				item.classList.add('select_active');
			}
		});
		items.forEach(option => {
			option.addEventListener('click', () => {
				item.classList.remove('select_active');
				current.innerText = option.innerText;
				input.value = option.getAttribute('value');
			});
		});
	});
	document.addEventListener('click', (event) => {
		if (!event.target.closest('.select')) {
			select.forEach(item => {
				item.classList.remove('select_active');
			});
		}
	});
}