//Global Variables
let chosen_seat = "";

//Helper Functions
function checkLab() {
    let laboratory = document.getElementById("lab").value;
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


$(document).ready(function () {
    for (let i = 1; i < 37; i++) {
        $("#A" + i.toString().padStart(2, '0')).click(function () {
            let element_color = $(this).css("background-color");
            if (element_color === "rgb(128, 128, 128)") { //Invalid == Reserved Seat
                alert("Seat has already been reserved. :)")
            }
            else { //Valid
                if (chosen_seat != "") {
                    $(chosen_seat).css("background-color", "#0A502E");
                    $(chosen_seat).css("color", "#F6EEF2");
                    chosen_seat = String("#A" + i.toString().padStart(2, '0'));
                }
                chosen_seat = String("#A" + i.toString().padStart(2, '0'));
                $(this).css("background-color", "#d4e8d3");
                $(this).css("color", "#0A502E");
            }


        });
    }

    // Event listener for time select
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
            let selectedLab = $("#lab").val();
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
