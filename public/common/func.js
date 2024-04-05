const { compare } = require("bcrypt");

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//
$(document).ready(function () {
    $("#deleteButton").click(function () {
        alert('Deleted!');
    });
});
//PASSWORD VALIDATION
$(document).ready(function () {
    $('#password1').on('input', function () {
        console.log('Input detected');
    });

    const submitButton = $('#editPasswordForm button[type="submit"]');
    console.log("Waiting for Password...")
    function validatePasswords() {
        const password1 = $('#password1').val();
        const password2 = $('#password2').val();

        $('#password-error').text('');

        if (password1 === '') {
            $('#password-error').text('Please enter a password.').show();
            return false;
        } else if (password2 === '') {
            $('#password-error').text('Please confirm your password.').show();
            return false;
        } else if (password1 !== password2) {
            $('#password-error').text('Passwords don\'t match!').show();
            return false;
        } else if (password1.length < 8) {
            $('#password-error').text('Password character minimum of 8!').show();
            return false;
        }
        else {
            $('#password-error').text('').hide();
        }

        console.log('Passwords valid!')
        return true;
    }

    submitButton.prop('disabled', true);

    //$('#password1').keyup(validatePasswords);
    $('#password1').on('input', validatePasswords);

    //$('#password2').on('input', validatePasswords);

    $('#password2').on('input', function () {
        if (validatePasswords()) {
            submitButton.prop('disabled', false);
        } else {
            submitButton.prop('disabled', true);
        }
    });
});


$('#editPasswordForm').submit(function (event) {
    if (!validatePasswords()) {
        event.preventDefault();
    }
});

// CHECKING VALID INPUTS
$(document).ready(function () {
    $('#form-create').submit(function (event) {

        const submit = $('#form-create .btn[type="submit"]');

        function validateInputs() {
            const id_num = $('#id_num').val();
            const dlsu_email = $('#dlsu_email').val();
            const password = $('#PW').val();
            const confirm_password = $('#CPW').val();
            let errorCounter = 0;

            if (!/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
                setErrorFor($('#PW'), 'Password must contain at least one capital letter and at least one special character');
                errorCounter++;
                return false;
            } else if (id_num.length !== 8) {
                setErrorFor($('#id_num'), 'Invalid Input. ID Number must be 8 digits.');
                errorCounter++;
                return false;
            } else if (!dlsu_email.endsWith('@dlsu.edu.ph')) {
                setErrorFor($('#dlsu_email'), 'Not a valid email');
                errorCounter++;
                return false;
            } else if (password !== confirm_password) {
                setErrorFor($('#CPW'), 'Passwords do not match!');
                errorCounter++;
                return false;
            } else {
                setSuccessFor($('#PW'));
                setSuccessFor($('#id_num'));
                setSuccessFor($('#dlsu_email'));
                setSuccessFor($('#CPW'));

                console.log('inputs valid!');
                if (errorCounter == 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        submit.prop('disabled', true);
        if (validateInputs()) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    });
});

// Check passwords for Delete Account Student
$(document).ready(function () {
    const deleteBtn = $('#deletePasswordS button[type="submit"]');

    function comparePW() {
        const PW = $('#PW').val();
        const CPW = $('#CPW').val();

        if (PW !== CPW) {
            setErrorFor($('#CPW'), 'Passwords do not match!');
            return false;
        } else {
            setSuccessFor($('#PW'));
            return true;
        }
    }

    deleteBtn.prop('disabled', true);
    if (comparePW()) {
        deleteBtn.prop('disabled', false);
    }
});

// Check passwords for Delete Account Tech