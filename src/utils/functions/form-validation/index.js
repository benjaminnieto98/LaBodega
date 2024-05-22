const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
const surnameRegex = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
const documentRegex = /^[0-9]{8,15}$/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const phoneRegex = /^[0-9]{7,15}$/;
const addressRegex = /^[a-zA-ZÀ-ÿ0-9\s.,-]{4,80}$/;
const postalCodeRegex = /^[0-9]{3,10}$/;

export const validateInput = ({ type, value }) => {
    let hasError = false;
    let error = '';
    const formatValue = value.trim();

    switch (type) {
        case 'name':
            if (formatValue === "") {
                hasError = true;
                error = 'Necesitamos tu nombre';
            } else if (!nameRegex.test(formatValue)) {
                hasError = true;
                error = 'El nombre es invalido';
            } else {
                hasError = false;
                error = '';
            }
            break;
        // case 'surname':
        //     if (formatValue === "") {
        //         hasError = true;
        //         error = 'Surname is required';
        //     } else if (!surnameRegex.test(formatValue)) {
        //         hasError = true;
        //         error = 'Surname is invalid';
        //     } else {
        //         hasError = false;
        //         error = '';
        //     }
        //     break;
        // case 'document':
        //     if (formatValue === "") {
        //         hasError = true;
        //         error = 'Document is required';
        //     } else if (!documentRegex.test(formatValue)) {
        //         hasError = true;
        //         error = 'Document is invalid';
        //     } else {
        //         hasError = false;
        //         error = '';
        //     }
        //     break;
        case 'email':
            if (formatValue === "") {
                hasError = true;
                error = 'Necesitamos tu email';
            } else if (!emailRegex.test(formatValue)) {
                hasError = true;
                error = 'El email es invalido';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'phone':
            if (formatValue === "") {
                hasError = true;
                error = 'Necesitamos tu telefono';
            } else if (!phoneRegex.test(formatValue)) {
                hasError = true;
                error = 'El telefono es invalido';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'address':
            if (formatValue === "") {
                hasError = true;
                error = 'Necesitamos tu dirección';
            } else if (!addressRegex.test(formatValue)) {
                hasError = true;
                error = 'La dirección es invalida';
            } else {
                hasError = false;
                error = '';
            }
            break;
        // case 'postalCode':
        //     if (formatValue === "") {
        //         hasError = true;
        //         error = 'Postal Code is required';
        //     } else if (!postalCodeRegex.test(formatValue)) {
        //         hasError = true;
        //         error = 'Postal Code is invalid';
        //     } else {
        //         hasError = false;
        //         error = '';
        //     }
        //     break;
        default:
            hasError = false;
            error = '';
            break;
    }

    return { hasError, error }
}