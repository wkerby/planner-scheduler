// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// localStorage.clear();

//create a variable that targets p element of header in which current day will be displayed
var currentDayEl = document.querySelector("#currentDay");

//create variables that target all save buttons of the container-fluid div
var timeBlock8 = document.querySelector("#hour-8 button");
var timeBlock9 = document.querySelector("#hour-9 button");
var timeBlock10 = document.querySelector("#hour-10 button");
var timeBlock11 = document.querySelector("#hour-11 button");
var timeBlock12 = document.querySelector("#hour-12 button");
var timeBlock13 = document.querySelector("#hour-13 button");
var timeBlock14 = document.querySelector("#hour-14 button");
var timeBlock15 = document.querySelector("#hour-15 button");
var timeBlock16 = document.querySelector("#hour-16 button");
var timeBlock17 = document.querySelector("#hour-17 button");

//create variables that target the text area of all time blocks
var textArea8 = document.querySelector("#hour-8 textarea");
var textArea9 = document.querySelector("#hour-9 textarea");
var textArea10 = document.querySelector("#hour-10 textarea");
var textArea11 = document.querySelector("#hour-11 textarea");
var textArea12 = document.querySelector("#hour-12 textarea");
var textArea13 = document.querySelector("#hour-13 textarea");
var textArea14 = document.querySelector("#hour-14 textarea");
var textArea15 = document.querySelector("#hour-15 textarea");
var textArea16 = document.querySelector("#hour-16 textarea");
var textArea17 = document.querySelector("#hour-17 textarea");

//create a list of all time block save buttons
var saveButtons = [timeBlock8, timeBlock9, timeBlock10, timeBlock11, timeBlock12, timeBlock13, timeBlock14, timeBlock15, timeBlock16, timeBlock17];

//create object to use in local storage for all 9 time blocks
//create a function that initializes taskData object depending on what is in localStorage

var taskData = {
  hour8: "",
  hour9: "",
  hour10: "",
  hour11: "",
  hour12: "",
  hour13: "",
  hour14: "",
  hour15: "",
  hour16: "",
  hour17: ""
}

//add a variable that will serve as the current date and time to be displayed
var time = setInterval(function () {
  var currentDate = dayjs().format("dddd, MMMM D");
  currentDayEl.textContent = currentDate;

}, 1000);

//create function that compares current hour of day with hour of day associated with timeblock and styles accordingly
function hourStyle() {
  var currentHour = dayjs().format("H");
  var hours = document.querySelector(".container-fluid").children;
  for (var i = 0; i < hours.length; i++) {
    var timeBlockHour = hours[i].id.split('-')[1]; //this returns the hour number of the element block currently in loop
    if (parseInt(timeBlockHour) === parseInt(currentHour)) {
      hours[i].setAttribute("class", "row time-block present"); //set current hour styling on the element block whose hour is equal to current hour
    }
    else if (parseInt(timeBlockHour) > parseInt(currentHour)) {
      hours[i].setAttribute("class", "row time-block future"); //set future hour styling on all element blocks whose hour value is greater than that of current hour
    }

    else {
      hours[i].setAttribute("class", "row time-block past"); //set past hour styling on all element blocks whose hour value is less than that of current hour
    }
  }
};

//create a function that returns the key of the taskData object that shares the same time block number
function keyReturn(timeBlock, object) {
  for (var i = 0; i < Object.keys(object).length; i++) {
    if (Object.keys(object)[i].slice(-2).includes(timeBlock)) {
      return Object.keys(object)[i];
    }
  }

};

//create function that takes task text entered into an element block and saves into local storage
function saveData(e) {
  e.stopPropagation();
  var El = e.target
  if (El.tagName === "I") { //if the element selected is an image element, then traverse out to grandparent element to get correct id selector in order to save to targetData object
    var parentEl = El.parentElement.parentElement;
  }
  else {
    var parentEl = El.parentElement; //if the element selected is not an image elemnet (i.e. it is a button element) traverse out only to parent element for correct ID selector
  }

  var task = parentEl.children[1].value.trim();
  var timeBlock = parentEl.id.split("-")[1];
  keyReturn(timeBlock, taskData);
  var key = keyReturn(timeBlock, taskData);
  if (localStorage.getItem('taskData')) { //if the user has already saved items into the taskData localStorage object
    taskData = JSON.parse(localStorage.getItem('taskData'));
  }

  else { //if a taskData localStorage object does not currently exist
  }

  taskData[key] = task; //call the keyReturn function to assing text value in task to approprate key in taskData object
  localStorage.setItem("taskData", JSON.stringify(taskData));
};

//create function that renders data from previous save onto page
function renderData() {
  //create a list of all text areas in timeblocks
  var textAreas = [textArea8, textArea9, textArea10, textArea11, textArea12, textArea13, textArea14, textArea15, textArea16, textArea17];
  if (localStorage.getItem('taskData')) { //if the user has already saved items into the taskData localStorage object
    var taskData = JSON.parse(localStorage.getItem("taskData"));
  }
  else { //if a taskData localStorage object does not currently exist
  }
  for (var i = 0; i < textAreas.length; i++) {
    textAreas[i].textContent = taskData[Object.keys(taskData)[i]];
  }
};

//assign an event listener with save functionality to all time block save buttons
for (var i = 0; i < saveButtons.length; i++) {
  saveButtons[i].addEventListener("click", saveData);
};

//create an init function that runs as soon as the page is refreshed
function init() {
  hourStyle();
  renderData();
};

init();
