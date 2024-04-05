//Global Variables
let chosen_seat = "";

//Helper Functions
function checkLab() {
    let laboratory = document.getElementById("laboratory").value;
    if (laboratory == "") {
        return false;
    }
    return true;
}

function checkDate() {
    let date = document.getElementById("date").value;
    if (date == "") {
        return false;
    }
    return true;
}

function checkTime() {
    let time = document.getElementById("time").value;
    if (time == "") {
        return false;
    }
    return true;
}

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

// BOOKING RESERVING
$(document).ready(function () {
    for (let i = 1; i < 37; i++) {
        $("#A" + i.toString().padStart(2, '0')).click(function () {
            let element_color = $(this).css("background-color");
            if (element_color === "rgb(128, 128, 128)") { //Invalid == Reserved Seat
                alert("Seat has already been reserved. :)")
            }
            else { //Valid
                if (chosen_seat != "") {
                    $("#" + chosen_seat).css("background-color", "#0A502E");
                    $("#" + chosen_seat).css("color", "#F6EEF2");
                }
                chosen_seat = String("A" + i.toString().padStart(2, '0'));
                $("#seat_num").val(chosen_seat);
                $(this).css("background-color", "#d4e8d3");
                $(this).css("color", "#0A502E");
            }
        });
    }

    $("#seat_num").click(function () {
        alert("Please use the table on the right to select an available seat!");
    });

    // Event listener for time select
    $("#laboratory").change(function () {
        if (checkTime()) {
            let selectedTime = $("#time").val();
            let selectedDate = $("#date").val();
            let selectedLab = $("#laboratory").val();
            for (let u = 1; u < 37; u++) {
                if ($("#A" + u.toString().padStart(2, '0')).css("background-color") === "rgb(128, 128, 128)") {
                    $("#A" + u.toString().padStart(2, '0')).css("background-color", "#0A502E");
                }
            }
            $.post('load_seats',
                { lab: String(selectedLab), date: String(selectedDate), time: String(selectedTime) },
                function (data, status) {
                    if (status === 'success') {
                        alert("Successful response received:");
                        data.reservations.forEach(function (reservation) {
                            let seat = reservation.seat_num;
                            $("#" + seat).css("background-color", "grey");
                            $("#" + seat).css("color", "#F6EEF2");
                        });
                    } else {
                        console.error("Error:", status);
                    }
                });
        }
    })
    $("#date").change(function () {
        if (checkTime()) {
            let selectedTime = $("#time").val();
            let selectedDate = $("#date").val();
            let selectedLab = $("#laboratory").val();
            for (let u = 1; u < 37; u++) {
                if ($("#A" + u.toString().padStart(2, '0')).css("background-color") === "rgb(128, 128, 128)") {
                    $("#A" + u.toString().padStart(2, '0')).css("background-color", "#0A502E");
                }
            }
            $.post('load_seats',
                { lab: String(selectedLab), date: String(selectedDate), time: String(selectedTime) },
                function (data, status) {
                    if (status === 'success') {
                        alert("Successful response received:");
                        data.reservations.forEach(function (reservation) {
                            let seat = reservation.seat_num;
                            $("#" + seat).css("background-color", "grey");
                            $("#" + seat).css("color", "#F6EEF2");
                        });
                    } else {
                        console.error("Error:", status);
                    }
                });
        }
    })
    $("#time").change(function () {
        if (!checkLab()) {
            alert("Please select a Laboratory!")
            $("#time").val("");
        }
        else if (!checkDate()) {
            alert("Please select a date!");
            $("#time").val("");
        } else { //VALID
            let selectedTime = $(this).val();
            let selectedDate = $("#date").val();
            let selectedLab = $("#laboratory").val();
            for (let u = 1; u < 37; u++) {
                if ($("#A" + u.toString().padStart(2, '0')).css("background-color") === "rgb(128, 128, 128)") {
                    $("#A" + u.toString().padStart(2, '0')).css("background-color", "#0A502E");
                }
            }
            $.post('load_seats',
                { lab: String(selectedLab), date: String(selectedDate), time: String(selectedTime) },
                function (data, status) {
                    if (status === 'success') {
                        alert("Successful response received:");
                        data.reservations.forEach(function (reservation) {
                            let seat = reservation.seat_num;
                            $("#" + seat).css("background-color", "grey");
                            $("#" + seat).css("color", "#F6EEF2");
                        });
                    } else {
                        console.error("Error:", status);
                    }
                });
        }
    });
});

//FILTERING SCHEDULES
$(document).ready(function () {
    $("#filterReservations").click(function () {
        if (!checkLab()) {
            alert("Please select a Laboratory!");
        }
        else if (!checkDate()) {
            alert("Please select a Date!");
        }
        else if (!checkTime()) {
            alert("Please select a TimeSlot!");
        }
        else {
            let selectedTime = $("#time").val();
            let selectedDate = $("#date").val();
            let selectedLab = $("#laboratory").val();
            alert("ok!" + selectedTime + selectedLab + selectedDate);
            $.post('filterReservations',
                { lab: String(selectedLab), date: String(selectedDate), time: String(selectedTime) },
                function (data, status) {
                    if (status === 'success') {
                        data.reservations.forEach(function (reservation) {
                            let seat = reservation.seat_num;
                            $("#" + seat).css("background-color", "grey");
                            $("#" + seat).css("color", "#F6EEF2");
                        });
                    } else {
                        console.error("Error:", status);
                    }
                });
        }
    });
});

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
    $(document).ready(function() {
        $('#form-create').submit(function(event) {
            event.preventDefault();

            const id_num = $('#id_num').val();
            const dlsu_email = $('#dlsu_email').val();
            const password = $('#PW').val();
            const confirm_password = $('#CPW').val();
            let validInputs = 0;
    
            if (!/[A-Z]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
                setErrorFor($('#PW'), 'Password must contain at least one capital letter and at least one special character');
            } else {
                setSuccessFor($('#PW'));
                validInputs++;
            }
    
            if (id_num.length !== 8) {
                setErrorFor($('#id_num'), 'Invalid Input. ID Number must be 8 digits.');
            } else {
                setSuccessFor($('#id_num'));
                validInputs++;
            }
    
            if (!dlsu_email.endsWith('@dlsu.edu.ph')) {
                setErrorFor($('#dlsu_email'), 'Not a valid email');
            } else {
                setSuccessFor($('#dlsu_email'));
                validInputs++;
            }
    
            if (password !== confirm_password) {
                setErrorFor($('#CPW'), 'Passwords do not match!');
            } else {
                setSuccessFor($('#CPW'));
                validInputs++;
            }
    
            if (validInputs === 4) {
                this.submit();
            }
        });
    });
    

    $(document).ready(function() {
        $('#form-create').submit(function(event) {
            event.preventDefault();
    
            const formData = new FormData(this);
    
            fetch('/studentRegister', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                alert('Registration successful');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });