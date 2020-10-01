// docuement ready, clear all element values
$(document).ready(function () {

    // define all targeted reference with var elements
    var currentDate = moment().format("MMMM Do YYYY, h:mm a");
    var todayIs = moment().format("[Today is] dddd [!]");
    var currentDayObj = new Date();

    hourDisplayArr = ["09AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM"]
    hourIdsArr = ["9", "10", "11", "12", "13", "14", "15", "16", "17"]


    // function to set up table
    function setUp() {

        console.log("in setUp")

        // display today is weekday on title
        $("#today-is").text(todayIs);

        // display present date on page
        $("#currentDay").append(currentDate);

        // loop to create and format framework
        for (var i = 0; i < hourDisplayArr.length; i++) {

            // create row container, add id and classes to all 
            var rowEl = $("<div>").addClass("row time-block");

            // add hour block, add id and classes to all 
            var hourEl = $("<div>").addClass("hour col-md-2 hour-text").text(hourDisplayArr[i]).attr("id", hourIdsArr[i]);

            // add text area, add id and classes to all 
            var textAreaEl = $("<textarea>").addClass("col-md-9 description");

            // add button, add id and classes to all 
            var saveBtnEl = $("<button>").addClass("btn col-md-1 saveBtn");

            // append elements to container/page
            $(".container").append(rowEl);

            $(rowEl).append(hourEl);

            $(hourEl).after(textAreaEl);

            $(textAreaEl).after(saveBtnEl);


            // hour now variable
            var currentHour = currentDayObj.getHours()
            // hour Id on time-block variable
            var timeblockId = hourIdsArr[i]

            // check time to see if time if .past, .present or .future and add appropriate class
            if (currentHour < timeblockId) {

                $(rowEl).addClass("future");
            }

            else if (currentHour === timeblockId) {

                $(rowEl).addClass("present");
            }

            else $(rowEl).addClass("past");


            // get data from locaoStorage 
            var storedValue = localStorage.getItem(hourIdsArr[i]);

            // append to textarea
            textAreaEl.text(storedValue);



            // eventListener on save button
            saveBtnEl.on("click", toWrite)
        };
    };

    // toWrite function
    function toWrite() {

        console.log($(this).siblings(".description").val().trim())
        console.log($(this).siblings(".hour").attr("id"))

        // get value of textarea and .trim()
        var textAreaVal = $(this).siblings(".description").val().trim()
        var hourKey = $(this).siblings(".hour").attr("id")

        // save relevant text to local storage
        localStorage.setItem(hourKey, textAreaVal);
    };


    //clear button
    $(".clearBtn").on("click", clearStorage);

    function clearStorage() {
        localStorage.clear();
    };


    // function call setUp on document load
    setUp();


});