import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector(' textarea'),
  input: document.querySelector(' input'),
};


refs.form.addEventListener('input', throttle(onInputValue, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onInputValue(e) {
  const formsData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formsData));
}

function dataForms() {
    const stringifiedData = localStorage.getItem(STORAGE_KEY);
    
    
  try {
    const formsKey = JSON.parse(stringifiedData) || '';
    if (formsKey) {
      refs.input.value = formsKey.email;
      refs.textarea.value = formsKey.message;
    }
  } catch (error) {
    console.log('error');
  }
}
completionForm();

function onFormSubmit(event) {
  event.preventDefault();
  console.log(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}
