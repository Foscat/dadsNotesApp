
function generateNoteCard(note) {
	const wrapper = $("<div class='noteCard card card-body'></div>");
	const title = $(`<h3 class='noteTitle card-title'>${note.title}</h3>`);
	const description = $(`<p class="noteDescription card-text">${note.content}</p>`);
	wrapper.append(title);
	wrapper.append($("<hr>"))
	wrapper.append(description);
	
	return wrapper;
}

function fillNotesSection(currentNotes) {
	$("#currentNotesSection").empty();
	currentNotes.map((note, index) => {
		const generatedNote = generateNoteCard(note);
		$("#currentNotesSection").append(generatedNote);
	});
}

function showWebNotes() {
	$.ajax({
		url:"/api/web",
		contentType: "application/json",
		dataType: "json",
		success: res => {
			console.log("Get web notes",res);
			fillNotesSection(res);
		}
	})
}

function showLinuxNotes() {
	$.ajax({
		url:"/api/linux",
		contentType: "application/json",
		dataType: "json",
		success: res => {
			console.log("Get linux notes",res);
			fillNotesSection(res);
		}
	})
}

function showPythonNotes() {
	$.ajax({
		url:"/api/python",
		contentType: "application/json",
		dataType: "json",
		success: res => {
			console.log("Get python notes",res);
			fillNotesSection(res);
		}
	})
}

function showRaspberryPiNotes() {
	$.ajax({
		url:"/api/raspberryPi",
		contentType: "application/json",
		dataType: "json",
		success: res => {
			console.log("Get raspberry Pi notes",res);
			fillNotesSection(res);
		}
	})
}

function showComputersNotes() {
	$.ajax({
		url:"/api/computers",
		contentType: "application/json",
		dataType: "json",
		success: res => {
			console.log("Get computers notes",res);
			fillNotesSection(res);
		}
	})
}

// On load get web notes by default
showWebNotes();

$("#webDesign").on("click", showWebNotes);
$("#linux").on("click", showLinuxNotes);
$("#python").on("click", showPythonNotes);
$("#raspberryPi").on("click", showRaspberryPiNotes);
$("#computers").on("click", showComputersNotes);