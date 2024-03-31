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

$(document).ready(function () {
    for (let i = 1; i < 37; i++) {
        $("#A" + i.toString().padStart(2, '0')).click(function () {
            let selectedTime = $("#time").val();
            let selectedDate = $("#date").val();
            let selectedLab = $("#laboratory").val();  
            let selectedSeat = String("A" + i.toString().padStart(2, '0'));
            let element_color = $(this).css("background-color");

            if (element_color === "rgb(128, 128, 128)") { //Reserved Seat
                $.post('load_reservationInfo',
                { lab: String(selectedLab), date: String(selectedDate), time: String(selectedTime), seat: String(selectedSeat)},
                function (data, status) {
                    if (status === 'success') {
                        const information = "<h3>Reservation Details </h3><hr><br><h5>Reserved by: " + data.reservations.user + "</h5><br><h5> Laboratory: " + data.reservations.computer_lab + "</h5><br><h5>Date: " + data.reservations.date + "</h5><br><h5>Time: "  + data.reservations.time_slot + "</h5><br><h5>Seat: " + data.reservations.seat_num + "</h3>";
                        $("#reserveInfo").html(information);
                    } else {
                        console.error("Error:", status);
                    }
                });
            }
            else { //Available
                const information = "<h3>Reservation Details </h3><hr><br><h5>Available</h5>";
                $("#reserveInfo").html(information);

            }
        });
    }

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
                        $("#reserveInfo").html("<h3>Reservation Details </h3><hr>");
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
                        $("#reserveInfo").html("<h3>Reservation Details </h3><hr>");
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
            $("#reserveInfo").html("<h3>Reservation Details </h3><hr>");
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