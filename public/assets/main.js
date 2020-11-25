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

function fillNotesSection(incomingNotes, type) {
  $("#currentNotesSection").empty();
  incomingNotes.map((note) => {
    note["type"] = type;
    const generatedNote = generateNoteCard(note);
    $("#currentNotesSection").append(generatedNote);
  });
  currentNotes = incomingNotes;
  $("#newNoteBtn").empty();
  const submitButton = $(
    `<button id="createNoteBtn" data-type="${type}" type="button" class="btn btn-success">Submit</button>`
  );
  $("#newNoteBtn").append(submitButton);
}

function showNotes(notesType) {
  $.ajax({
    url: `/api/${notesType}`,
    contentType: "application/json",
    dataType: "json",
    success: (res) => {
      console.log(`Get ${notesType} notes`, res);
      currentNotes = res;
      return fillNotesSection(res, notesType);
    },
  });
}

function primeEditForm(id, type) {
  $("#subModBtn").empty();
  const currentValue = currentNotes[id];
  $("#editTitle").val(currentValue.title);
  $("#editContent").val(currentValue.content);
  $("#editTags").val(currentValue.tags);
  const submitButton = $(
    `<button id='submitEditedNoteBtn' data-type='${type}' data-id='${id}'  type='button' class='btn btn-primary'>Save Changes</button>`
  );
  $("#subModBtn").append(submitButton);
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
      currentNotes = res;
      console.log({ res });
      return fillNotesSection(res, type);
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
      console.log(res);
      $("#editTitle").val("");
      $("#editContent").val("");
      $("#editTags").val("");
      return fillNotesSection(res, type);
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
      return fillNotesSection(res, type);
    },
  });
}

function toggleNotesForm(formShowing) {
  if (formShowing === "false") {
    console.log("show form");
    $("#notesFormToggle").text("Close notes form");
    $("#notesFormToggle").attr("data-show", "true");
    $("#addNoteForm").removeClass("hidden");
  } else {
    $("#notesFormToggle").text("Add a note");
    $("#notesFormToggle").attr("data-show", "false");
    $("#addNoteForm").addClass("hidden");
  }
}

// Click funtions for titles of section to show that sections notes
$("#webDesign").on("click", () => showNotes("web"));
$("#linux").on("click", () => showNotes("linux"));
$("#python").on("click", () => showNotes("python"));
$("#raspberryPi").on("click", () => showNotes("raspberryPi"));
$("#computers").on("click", () => showNotes("computers"));

// Click function to toggle notes
$(document).on("click", "#notesFormToggle", function () {
  toggleNotesForm(this.dataset.show);
});

// Click function for deleting notes
$(document).on("click", ".deleteNoteBtn", function () {
  deleteNote(this.dataset.index, this.dataset.type);
});

$(document).on("click", "#createNoteBtn", function () {
  postNote(this.dataset.type);
});

// Click function for editing notes
$(document).on("click", ".editNoteBtn", function () {
  primeEditForm(this.dataset.index, this.dataset.type);
});

// Click function to handle submitting of edited notes
$(document).on("click", "#submitEditedNoteBtn", function () {
  editNote(this.dataset.id, this.dataset.type);
});

// On load get web notes by default
showNotes("web");
