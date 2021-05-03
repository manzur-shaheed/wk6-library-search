var searchEl = $('#search');

// main page section
// add event handler
searchEl.on('submit', searchLibraryMain);

function searchLibraryMain(event) {
    var serachText, formatText, queryStr;

    event.preventDefault();
    serachText = $('#searchText').val();
    formatText = $('#format').val();

    // console.log(serachText);
    // console.log(formatText);
    if (serachText === '') {
        alert('Please enter a search text!');
        return;
    }
    queryStr = "./results.html?searchText=" + serachText + "&format=" + formatText;
    location.assign(queryStr);
}

// result page section
