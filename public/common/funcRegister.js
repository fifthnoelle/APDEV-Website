$('#createS').prop('disabled', true);
// CHECKING VALID INPUTS - student
$(document).ready(function () {
    $('#form-createS').submit(function (event) {
        event.preventDefault();

            const id_num = $('#id_num').val();
            const dlsu_email = $('#dlsu_email').val();
            const password = $('#PW').val();
            const confirm_password = $('#CPW').val();
            let errorCounter = 0;

            if (!/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
                alert('Password must contain at least one capital letter and at least one special character');
                errorCounter++;
            } else if (id_num.length !== 8) {
                alert('Invalid Input. ID Number must be 8 digits.');
                errorCounter++;
            } else if (!dlsu_email.endsWith('@dlsu.edu.ph')) {
                alert('Not a valid email');
                errorCounter++;
            } else if (password !== confirm_password) {
                alert('Passwords do not match!');
                errorCounter++;
            } 
            if (errorCounter == 0) {
                // If no errors, submit the form
                this.submit();
            }
    });
});

$('#createT').prop('disabled',true);
// CHECKING VALID INPUTS - tech
$(document).ready(function () {
    $('#form-createT').submit(function (event) {
        event.preventDefault();

            const dlsu_email = $('#dlsu_email').val();
            const password = $('#PW').val();
            const confirm_password = $('#CPW').val();
            let errorCounter = 0;

            if (!/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
                alert('Password must contain at least one capital letter and at least one special character');
                errorCounter++;
            } else if (!dlsu_email.endsWith('@dlsu.edu.ph')) {
                alert('Not a valid email');
                errorCounter++;
            } else if (password !== confirm_password) {
                alert('Passwords do not match!');
                errorCounter++;
            }
            
            if (errorCounter == 0) {
                // If no errors, submit the form
                this.submit();
            }
    });
});