const parenturl = "https://www.matthewwen.com/apiexposchool";

function change_str(result) {
	var str = result.split(/[ -]+/);
	var total = "";
	for (var j = 0; j < str.length; j++) {
		var substart = 0;
		if (str[j] != "of") {
			substart = 1
			total = total + str[j].charAt(0).toUpperCase();
		}
		total = total + str[j].substring(substart);

		if (total.length < result.length) {
			total = total + result[total.length]
		}
	}
	return total;
}

function post_data(id, msg, href, b){
    var obj = {"collegeid": parseInt(id),"msg": msg, "href": href, "online": b};
	console.log(obj);
	$.ajax({
		type: 'POST',
		header: {
			"Content-Type": "application/json"
		},
        data: JSON.stringify({"collegeid": parseInt(id),"msg": msg, "href": href, "online": b}),
		url: parenturl + "/addhref",
		success: function(result) {
			console.log(result);
		}
	});
}

function search_college(search) {
	$.ajax({
        type: 'GET',
		url: parenturl + "/search?query=" + search,
		success: function (result) {
            update_main_view(result);
		}
	});
}

function update_main_view(result) {
	$("#school-list").html("<tr><th>School Name</th><th width='100px'>Online</th></td>"); 
	for (var i = 0; i < result.length; i++) {
		var total = change_str(result[i].name);
		$("#school-list").append("<tr class='clickable-row' data-href='" + "school.html?collegeid=" + result[i].id +
			"'><td>" + total + "</td><td width='10%' class='"  + (result[i].online ? "mini_td_online":"mini_td_offline") 
			+ "'>" + (result[i].online ? "Yes" : "No") + "</td></tr>");
	}

	$(".clickable-row").click(function () {
		console.log("lick row");
		window.location = $(this).data("href");
	});
}

function on_start() {
    $.ajax({
        type: 'GET',
        url: parenturl + "/college",
        success: function (result) {
            update_main_view(result);
        }
    });
}
