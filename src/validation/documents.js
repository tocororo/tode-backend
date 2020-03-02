const Validator = require('validator');
const isEmpty = require('../controllers/isEmpty')

module.exports = function validateDocuments(data) {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.coment = !isEmpty(data.coment) ? data.coment : '';

    if(!Validator.isLength(data.name, {min: 1, max: 60 })){
        errors.name = 'El nombre del documento debe contener entre 1 y 60 caracteres'
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'El campo (nombre del documento) del documento es requerido'
    }
    if(!Validator.isLength(data.coment, {min: 1, max: 30 })){
        errors.coment = 'El comentario del documento debe contener entre 1 y 30 caracteres'
    }
    if (Validator.isEmpty(data.coment)) {
        errors.coment = 'El campo (comentario del documento) del documento es requerido'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
