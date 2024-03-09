function checkAvailability(date, timeslot, seat) {
    // 1.) iterate through reservations database under same date and timeslot
    // 2.) if same seat id then return reserved/unavailable
    // learn more about queries for mongoDB
}

$(document).ready(function () {
    let clicked = "";
    for (let i = 1; i < 37; i++) {
        $("#A" + i.toString().padStart(2, '0')).click(function () {
            if (clicked != "") {
                $(clicked).css("background-color", "#0A502E");
                $(clicked).css("color", "#F6EEF2");
                clicked = String("#A" + i.toString().padStart(2, '0'));
            }
            clicked = String("#A" + i.toString().padStart(2, '0'));
            $(this).css("background-color", "#d4e8d3");
            $(this).css("color", "#0A502E");

        });
    }

    $("#date").change(function () {
        let selectedDate = $(this).val();

        // Call a function or perform actions based on the selected date
    });

    // Event listener for time select
    $("#time").change(function () {
        if ($("#date").val() === "") {
            // No option is selected in the dropdown menu
            $("#time").val("");
            console.log("Please select a date first");
        } else if ($("#lab").val() === "") {
            // No option is selected in the dropdown menu
            $("#time").val("");
            console.log("Please select a laboratory first");
        } else {
            let selectedTime = $(this).val();
            let selectedDate = $("#date").val();
            let selectedLab = $("#lab").val();
            $.post('load_seats',
                {lab: String(selectedLab), date: String(selectedDate), time: String(selectedTime) },
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

/* document.getElementById("date").onchange = function() {myFunction()};

function myFunction() {
    var x = document.getElementById("date");
    alert(x.value);
} */