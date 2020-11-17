let currentNotes = [];

function generateNoteCard(note) {
  const wrapper = $("<div class='noteCard card card-body'></div>");
  const titleWrapper = $("<div class='noteTitleWrapper card-head'></div>");
  const title = $(`<h3 class='noteTitle card-title'>${note.title}</h3>`);
  const deleteButton = $(
    `<span data-type='${note.type}' data-index='${note.id}' class="deleteNoteBtn">X</span>`
  );
  const editButton = $(
    `<span data-type='${note.type}' data-index='${note.id}' data-toggle="modal" data-target="#editModal" class="editNoteBtn">&#9998;<span>`
  );
  const description = $(
    `<p class="noteDescription card-text">${note.content}</p>`
  );
  titleWrapper.append(title);
  titleWrapper.append(deleteButton);
  titleWrapper.append(editButton);
  wrapper.append(titleWrapper);
  wrapper.append($("<hr>"));
  wrapper.append(description);

  return wrapper;
}

function fillNotesSection(currentNotes, type) {
  $("#currentNotesSection").empty();
  currentNotes.map((note) => {
    note["type"] = type;
    const generatedNote = generateNoteCard(note);
    $("#currentNotesSection").append(generatedNote);
  });
}

function showNotes(notesType) {
  if (notesType === "web") {
    showWebNotes();
  } else if (notesType === "linux") {
    showLinuxNotes();
  } else if (notesType === "python") {
    showPythonNotes();
  } else if (notesType === "computers") {
    showComputersNotes();
  } else if (notesType === "raspberryPi") {
    showRaspberryPiNotes();
  } else {
    showWebNotes();
  }
}

function primeEditForm(id, type) {
  const currentValue = db[`${type}`][id];
  $("#editTitle").val(currentValue.title);
  $("#editContent").val(currentValue.content);
  $("#editTags").val(currentValue.tags);
  $("#submitEditedNoteBtn").data("id", id);
  $("#submitEditedNoteBtn").data("type", type);
}

function postNote(type) {
  let formData = {};
  formData["title"] = $("#noteTitle").val();
  formData["content"] = $("#noteContent").val();
  formData["tags"] = $("#tagsContent").val().split(" ");

  $.ajax({
    url: `/api/${type}`,
    type: "POST",
    data: { formData, currentNotes },
    success: (res) => {
      $("#noteTitle").val("");
      $("#noteContent").val("");
      $("#tagsContent").val("");
      showNotes(type);
    },
  });
}

function editNote(id, type) {
  let formData = { id };
  formData["title"] = $("#editTitle").val();
  formData["content"] = $("#editContent").val();
  formData["tags"] = $("editTags").val();

  $.ajax({
    url: `/api/${type}/${id}`,
    type: "PUT",
    data: { formData, currentNotes },
    success: (res) => {
      $("#editTitle").val("");
      $("#editContent").val("");
      $("#editTags").val("");
      showNotes(type);
    },
  });
}

function deleteNote(id, type) {
  currentNotes.pop(id);
  $.ajax({
    url: `/api/${type}/${id}`,
    contentType: "application/json",
    dataType: "json",
    type: "DELETE",
    success: (res) => {
      console.log("Delete note");
      currentNotes = res;
      fillNotesSection(res, type);
    },
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
      fillNotesSection(res, "web");
    },
  });
}

function postWebNote() {
  postNote("web");
}

function showLinuxNotes() {
  $.ajax({
    url: "/api/linux",
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      console.log("Get linux notes", res);
      currentNotes = res;
      fillNotesSection(res, "linux");
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
      fillNotesSection(res, "python");
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
      fillNotesSection(res, "raspberryPi");
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
      fillNotesSection(res, "computers");
    },
  });
}

function toggleNotesForm(formShowing) {
  console.log(formShowing);
  if (formShowing === "false") {
    console.log("show form");
    $("#notesFormToggle").attr("data-show", "true");
    $("#addNoteForm").removeClass("hidden");
  } else {
    console.log("hide form");
    $("#notesFormToggle").attr("data-show", "false");
    $("#addNoteForm").addClass("hidden");
  }
}

// On load get web notes by default
showWebNotes();

// Click funtions for titles of section to show that sections notes
$("#webDesign").on("click", showWebNotes);
$("#linux").on("click", showLinuxNotes);
$("#python").on("click", showPythonNotes);
$("#raspberryPi").on("click", showRaspberryPiNotes);
$("#computers").on("click", showComputersNotes);

// Click function to toggle notes
$(document).on("click", "#notesFormToggle", function () {
  const formShowing = this.dataset.show;
  toggleNotesForm(formShowing);
});

// Click functions for the make note form
$("#createNoteBtn").on("click", postWebNote);

// Click function for deleting notes
$(document).on("click", ".deleteNoteBtn", function () {
  console.log("dataset", this.dataset);
  deleteNote(this.dataset.index, this.dataset.type);
});

$(document).on("click", ".editNoteBtn", function () {
  primeEditForm(this.dataset.index, this.dataset.type);
});

$(document).on("click", "#submitEditedNoteBtn", function () {
  editNote(this.dataset.index, this.dataset.type);
});
