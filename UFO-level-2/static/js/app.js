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
var form = d3.selectAll("#form");

// create event handlers for clicking 'Filter Table' and for pressing the enter key
button.on("click",runEnter);
form.on("change",runEnter);

// create runEnter function to handle input from user
function runEnter() {

    // prevent refreshing
    d3.event.preventDefault();

    // select all input html elements and grab the values inserted
    var dateValue = d3.select("#datetime").property("value");
    var cityValue = d3.select("#city").property("value");
    var stateValue = d3.select("#state").property("value");
    var countryValue = d3.select("#country").property("value");
    var shapeValue = d3.select("#shape").property("value");

    //////////////////////
    // filter the data //
    ////////////////////

    // create variable to hold all of tableData, will skim non-matching results as we progress through each filter value
    var results = tableData;
    // create boolean as a flag to see if there are results to filter. 
    var empty = true;
    
    // if input values exist, filter the results by the value + set 'empty' to false
    if (dateValue) {
        results = results.filter(entry => entry.datetime===dateValue);
        empty = false;
    }
    if (cityValue) {
        results = results.filter(entry => entry.city === cityValue.toLowerCase());
        empty = false;
    }
    if (stateValue) {
        results = results.filter(entry => entry.state === stateValue.toLowerCase());       
        empty = false;
    }
    if (countryValue) {
        results = results.filter(entry => entry.country === countryValue.toLowerCase());
        empty = false;
    }
    if (shapeValue) {
        results = results.filter(entry => entry.shape === shapeValue.toLowerCase());
        empty = false;
    }

    // check to see if there were entries to filter. if empty, do nothing (will leave tableData alone i.e., applies no filters); if not empty, add the filtered results.
    if(!empty) {
        // input was made by the user //

        // clear the table before populating with results
        tbody.html("");
        // call addEntries to display the filtered results (i.e., add to the table via d3)
        addEntries(results);
    }

}
