$(".psucampus_25livespudembed").ready(function(){
if ($('.psucampus_25livespudembed').length > 0) {
  var spudScriptUrl = "https://25livepub.collegenet.com/scripts/spuds.js";
  $.getScript(spudScriptUrl).done(function(){

	// Only do this for "News Style"
	$(".psucampus_25livespudembed[spudtype=newsstyle]").each(function(){
	  var spudId = $(this).attr("spudid");
	  var uniqueId = $(".twentyFiveliveModal", this).data("uniqueid");
	  var APIurl = "//25livepub.collegenet.com/calendars/" + spudId + ".json?unique=" + Math.random();
	  $.getJSON(APIurl, function( response ) {
		var arrEventId = [];
		$.each(response, function(rowNum, rowData) {
		  arrEventId.push(rowData.eventID);
		  var startDate = new Date(rowData.startDateTime);
		  var endDate = new Date(rowData.endDateTime);
		  $(".psucampus_25livespudembed[spudid='" + spudId + "'][spudtype=newsstyle]").append('\
			<div id="25live-eventid-' + rowData.eventID + '" class="eventItem" style="background-color: transparent !important;">\
			  <div class="calendar-icon-container">\
				<div class="calendar-icon">\
				  <div class="month">' + startDate.toLocaleDateString("en-EN", { month: "short" }) + '</div>\
				  <div class="day">' + startDate.toLocaleDateString("en-EN", { day: "numeric" }) + '</div>\
				  <div class="day-of-week">' +
					startDate.toLocaleDateString("en-EN", { weekday: "short" }) +
				  '</div>\
				</div>\
			  </div>\
			  <div class="content teaser-content">\
				<h2 class="node-title"><a href="?trumbaEmbed=view%3Devent%26eventid%3D' + rowData.eventID + '&#anchor_twentyFiveliveModal_' + spudId + '" onclick="location.reload()">' + rowData.title + '</a></h2>\
				<div>' + 
				  startDate.toLocaleDateString("en-EN", { weekday: "short" })                                 + ', ' + 
				  startDate.toLocaleDateString("en-EN", { month: "short" })                                   + ' ' + 
				  startDate.toLocaleDateString("en-EN", { day: "numeric" })                                   + ', ' + 
				  startDate.toLocaleTimeString("en-EN", { hour: "numeric", minute: "numeric", hour12: true }).toLowerCase().replace("am","a.m.").replace("pm","p.m.") + ' to ' + 
				  endDate.toLocaleTimeString("en-EN", { hour: "numeric", minute: "numeric", hour12: true }).toLowerCase().replace("am","a.m.").replace("pm","p.m.")   + ' \
				</div>\
			  </div>\
			</div>\
		  '); //end of append()
		}); // end of each()
	  
		if ( getEventIdFromQueryString() != null && arrEventId.includes(getEventIdFromQueryString()) ) {
		  $("#twentyFiveliveModal_" + uniqueId ).addClass("turnOnDetails");
		  $("#spud_" + spudId + "_details_" + uniqueId).addClass("turnOnDetails");
		  $Trumba.addSpud({
			webName: spudId,
			spudType : "main",
			spudId : "spud_" + spudId + "_details_" + uniqueId,
			url : { template : "month" },
		  });
		}
	  }); // end of getJSON
	}); // end of "psucampus_25livespudembed".once.each
  }); // end of "getScript.done()"
} // end of IF statement that "psucampus_25livespudembed" exists
}); // end psucampus_25livespudembed.ready

// Get ALL 25live modal
var modal = $(".twentyFiveliveModal");

// When the user clicks on <span> (x), close the modal
$(".twentyFiveliveModal .close").on("click", function() {
modal.css("display", "none");
});

// When the user clicks anywhere outside of the modal, close it
modal.on("click", function(event) {
if ($(event.target).hasClass("twentyFiveliveModal")) {
  modal.css("display", "none");
}
});

/*
* Gets 25Live Event ID from the query string to display as a SPUD
*/
function getEventIdFromQueryString() {
var urlParams = new URLSearchParams(window.location.search);
var param = urlParams.get("trumbaEmbed");
if (param != null) {
  var vars = param.split("&");
  for (var i = 0; i < vars.length; i++) {
	  var pair = vars[i].split("=");
	  if (decodeURIComponent(pair[0]) == "eventid") {
		  return parseInt(decodeURIComponent(pair[1]));
	  }
  } 
}
return null; 
}
