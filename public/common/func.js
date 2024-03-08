$(document).ready(function(){
    let clicked = "";
    for(let i = 1; i < 37; i++) {
        $("#A"+i.toString().padStart(2, '0')).click(function(){
            if(clicked != "") {
                $(clicked).css("background-color", "#0A502E");
                $(clicked).css("color", "#F6EEF2");
                clicked = String("#A"+i.toString().padStart(2, '0'));
            }
                clicked = String("#A"+i.toString().padStart(2, '0'));
                $(this).css("background-color", "#d4e8d3");
                $(this).css("color", "#0A502E");

        });
    }
});