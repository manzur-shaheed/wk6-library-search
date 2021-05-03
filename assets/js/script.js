var searchEl = $('#search');

// main page section
// add event handler
searchEl.on('submit', searchLibraryMain);

function searchLibraryMain(event) {
    var searchText, formatText, queryStr;

    event.preventDefault();
    searchText = $('#searchText').val();
    formatText = $('#formatText').val();

    // console.log(searchText);
    // console.log(formatText);
    if (searchText === '') {
        alert('Please enter a search text!');
        return;
    }
    if (!formatText) {
        formatText = '';
    }
    queryStr = "./results.html?searchText=" + searchText + "&format=" + formatText;
    location.assign(queryStr);
}

