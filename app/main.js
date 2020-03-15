$(document).ready(function () {
    on_start();
});

function input_search() {
    var val = $("#search-bar").val();
    if (val == ""){
        on_start();
    }
    else {
        search_college(val)
        console.log(val);
    }
}