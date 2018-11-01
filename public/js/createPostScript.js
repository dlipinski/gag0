const setNone = (inputId) => {
    let input = document.getElementById(inputId);
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.parentElement.childNodes.forEach( (el) => {
        if (el.classList.contains('invalid-feedback')) {
            el.remove();
        }
    });
}
const setInvalid = (inputId, errors) => {
    setNone(inputId);
    let input = document.getElementById(inputId);
    input.classList.add('is-invalid');
    errors.forEach( (error) => {
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('invalid-feedback');
        errorDiv.innerHTML = error
        if (input.nextSibling){
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        } else {
            input.parentElement.appendChild(errorDiv);
        }
    });
}
const setValid = (inputId) => {
    setNone(inputId);
    let input = document.getElementById(inputId);
    input.classList.add('is-valid');
}
const validateTitle = () => {
    let title = document.getElementById('title').value.trim();
    let valid = false;
    if (title.trim()==='') {
        setInvalid('title', ["Title cannot be empty"]);
    } else if (title.length<3 || title.length>80){
        setInvalid('title', ["Title length should be between 3 and 80 "]);
    } else {
        setValid('title');
        valid = true;
    }
    return valid;
}
const validateImage = () => {
    let file = document.getElementById('image').files[0];
    let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    let valid = false;
    if (!file) {
        setInvalid('image', ["Choose image"]);
    } else if (file.size>10000000) {
        setInvalid('image', ["File too large"]);
    } else if (validImageTypes.indexOf(file.type) === -1) {
        setInvalid('image', ["Unsupported file type"]);
    } else {
        if (FileReader) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('imagePreview').src = fr.result;
            }
            fr.readAsDataURL(file);
        }
        setValid('image');
        document.getElementById('imageName').innerHTML = file.name;
        valid = true;
    }
    return valid;
}
const initPage = () => {
    let titleInput = document.getElementById('title');
    let imageInput = document.getElementById('image');
    let createForm = document.getElementById('createForm');
    titleInput.addEventListener('focus', () => {
        setNone('title');
    });
    titleInput.addEventListener('focusout', () => {
        validateTitle();
    });
    imageInput.addEventListener('change', () => {
        validateImage();
        validateTitle();
    });
    createForm.addEventListener('submit', () => {
        let imageValid = validateImage();
        let titleValid = validateTitle();
        if(! (imageValid && titleValid) ) {
            event.preventDefault();
        } 
    });
}
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        initPage();
    }
});