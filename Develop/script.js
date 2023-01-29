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

//create a variable that targets p element of header in which current day will be displayed
var currentDayEl = document.querySelector("#currentDay");

//create a variable that targets the 8AM timeblock of the container-fluid div
var timeBlock8 = document.querySelector("#hour-8 button");

//create object to use in local storage for all 9 time blocks
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
}

//create a function that returns the key of the taskData object that shares the same time block number
function indexReturn(timeBlock, object) {
  for (var i = 0; i < Object.keys(object); i++) {
    if (Object.keys(object)[i].slice(-2).includes(timeBlock)) {
      return Object.keys(object);
    }
  }

}
//create function that takes task text entered into an element block and saves into local storage
function saveData(e) {
  var El = e.target
  var parentEl = El.parentElement;
  var task = parentEl.children[1].value;
  var timeblock = parentEl.id.split("-")[1]
  var tasks = Object.keys(taskData)

  localStorage.setItem("taskData", JSON.stringify(studentGrade));
}

hourStyle();

timeBlock8.addEventListener("click", saveData);