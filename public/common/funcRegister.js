// CHECKING VALID INPUTS - student
$(document).ready(function () {
    $('#form-create').submit(function (event) {

        const submit = $('#form-createS .btn[type="submit"]');

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

// CHECKING VALID INPUTS - tech
$(document).ready(function () {
    $('#form-create').submit(function (event) {

        const submit = $('#form-createT .btn[type="submit"]');

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