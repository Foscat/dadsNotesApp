let currentNotes = [];

function generateNoteCard(note) {
  const wrapper = $("<div class='noteCard card card-body'></div>");
  const title = $(`<h3 class='noteTitle card-title'>${note.title}</h3>`);
  const description = $(
    `<p class="noteDescription card-text">${note.content}</p>`
  );
  wrapper.append(title);
  wrapper.append($("<hr>"));
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
    url: "/api/web",
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      console.log("Get web notes", res);
      currentNotes = res;
      fillNotesSection(res);
    },
  });
}

async function postWebNote() {
  let formData = {};
  formData["title"] = $("#noteTitle").val();
  formData["content"] = $("#noteContent").val();
  console.log("Post web note data", formData);
  console.log("Current data", currentNotes);
  $.ajax({
    url: "/api/web",
    type: "POST",
    data: { formData, currentNotes },
    success: (res) => {
      console.log("Post web note response", res);
      $("#noteTitle").val("");
      $("#noteContent").val("");
    },
  });
}

function showLinuxNotes() {
  $.ajax({
    url: "/api/linux",
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      console.log("Get linux notes", res);
      currentNotes = res;
      fillNotesSection(res);
    },
  });
}

function showPythonNotes() {
  $.ajax({
    url: "/api/python",
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      console.log("Get python notes", res);
      currentNotes = res;
      fillNotesSection(res);
    },
  });
}

function showRaspberryPiNotes() {
  $.ajax({
    url: "/api/raspberryPi",
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      console.log("Get raspberry Pi notes", res);
      currentNotes = res;
      fillNotesSection(res);
    },
  });
}

function showComputersNotes() {
  $.ajax({
    url: "/api/computers",
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      console.log("Get computers notes", res);
      currentNotes = res;
      fillNotesSection(res);
    },
  });
}

// On load get web notes by default
showWebNotes();

// Click funtions for titles of section to show that sections notes
$("#webDesign").on("click", showWebNotes);
$("#linux").on("click", showLinuxNotes);
$("#python").on("click", showPythonNotes);
$("#raspberryPi").on("click", showRaspberryPiNotes);
$("#computers").on("click", showComputersNotes);

// Click functions for the make note form
$("#createNoteBtn").on("click", postWebNote);
