const urlParams = new URLSearchParams(window.location.search);
const collegeId = urlParams.get('collegeid');

$(document).ready(function () {
	$.ajax({
        type: 'GET',
		url: parenturl + "/detail?id=" + collegeId,
		success: function (result) {
            console.log(result);
            $("#title").html(change_str(result.name));
            $("#nav-title").html(change_str(result.name));
            $("#online-flag").css("background-color", result.online ? "green": "red");
            $("#online-flag").html(result.online ? "ONLINE": "NOT ONLINE");
            if (result.href.length == 0) {
                $("#href-list").css("display", "none");
                $(".container").append("<h1 class='center_h1'>No References</h1>");
            }
            else {
                $("#href-list").css("visibility", "visible");
                for (var i = 0; i < result.href.length; i++) {
                    $("#href-list").append("<tr class='clickable-row' data-href='" + result.href[i].href + 
                        "'><td>" + result.href[i].msg + "</td></tr>");
                }

                $(".clickable-row").click(function() {
                    window.location = $(this).data("href");
                });
            }
		}
    });

});


$("#ref-flag").click(function() {
    $("#post-screen").css("display", "block");
});

$(".ref-close").click(function() {
    $("#post-screen").css("display", "none");
});

$("#ref-post-online").click(function() {
    post_data_helper(true);
});

$("#ref-post-not-online").click(function() {
    post_data_helper(false);
});

function post_data_helper(b){
    var name = $("#ref-name").val();
    $("#ref-name").val('');
    var link = $("#ref-link").val();
    $("#ref-link").val('');
    post_data(collegeId, name, link, b);
}