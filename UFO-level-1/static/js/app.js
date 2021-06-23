// from data.js
var tableData = data;

////////////////////////////////////////////
// add data.js objects to webpage via d3 //
//////////////////////////////////////////

// create reference to table body tbody
var tbody = d3.select("tbody");

// function to add an array of objects to the table
function addEntries(tableData) {
    
    // loop through data objects 
    tableData.forEach(item => {
        
        // create row and a variable to reference it
        var row = tbody.append("tr");

        // use Object.entries to access the current object's contents- loop through them
        Object.entries(item).forEach(([key,value]) => {

            //append table data for current key-value pair in object
            row.append("td").text(value);
        });
    });
};

// call addEntries with all the table data from data.js
addEntries(tableData);

////////////////////////////////////////////
// create event listening functionality  //
//////////////////////////////////////////

// select the button html tag
var button = d3.select("#filter-btn");

// select the form html tag
var form = d3.select("#form");

// create event handlers for clicking 'Filter Table' and for pressing the enter key
button.on("click",runEnter);
form.on("submit",runEnter);

// create runEnter function to handle input from user
function runEnter() {

    // prevent refreshing
    d3.event.preventDefault();

    // select input html element and grab the value inserted
    var inputValue = d3.select("#datetime").property("value");
    
    // use user input to filter data
    var results = tableData.filter(entry => entry.datetime === inputValue);

    // clear the table before populating with results
    tbody.html("");

    // call addEntries to display the filtered results (i.e., add to the table via d3)
    addEntries(results);

}