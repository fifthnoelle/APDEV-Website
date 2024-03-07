$(document).ready(function(){
    let clicked = "";
    for(let i = 1; i < 37; i++) {
        $("#A"+i).click(function(){
            if(clicked != "") {
                $(clicked).css("background-color", "#0A502E");
                $(clicked).css("color", "#F6EEF2");
                clicked = String("#A" + i);
            }
                clicked = String("#A" + i);
                $("#A"+i).css("background-color", "#d4e8d3");
                $("#A"+i).css("color", "#0A502E");

        });
    }
});