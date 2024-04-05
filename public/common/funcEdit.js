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