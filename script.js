//Variables
//========================
var magnifyingGlass = document.querySelector('#ma-glass');
var searchbar = document.querySelector('#searchbar');
var instructions = document.querySelector('#instructions');
//Event Listeners
//========================
magnifyingGlass.addEventListener('click', displaySearch);

//Functions
//========================
function displaySearch() {
	searchbar.classList.toggle('hide');
	magnifyingGlass.classList.toggle('hide');
	instructions.innerHTML = "Type a search term and hit 'Enter' to see articles";
}

$(function() {
	$("#search-term").keypress(function(e) {

		if (e.keyCode === 13) {
			
			var searchTerm = $('#search-term').val();
			$('#display').html("");
			getData(searchTerm);
			$('#search-term').val('');
		}
	})
})

//AJAX calls
//========================
function getData(searchTerm){
	
	var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
	$.ajax({
	url: url,
	type: 'GET',
	contentType: "application/json; charset=utf-8",
	async: false,
	dataType: 'json',
	success: function (data, status, jqXHR) {
			for (var i=0; i<data[1].length;i++) {
				$('#display').append("<div class='result'><div><h5><a href=" + data[3][i] + ">" + data[1][i]+ "</h5></a></div>" + "<p>" +data[2][i] + "</p></div>");
			}
		}
	});
}

