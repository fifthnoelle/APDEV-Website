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
    $("#laboratory").change(function() {
        if(checkTime()) {
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