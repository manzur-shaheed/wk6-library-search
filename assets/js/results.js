// result page section
var searchStrEl = $('#search-string');
var resultEl = $('#result');

// show fetched data
{/* <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div> */}

function showData(data) {
    var card, cbody, ctitle, cdate, csubject, cdescr, cbutton;

    card = $('<div>');
    card.addClass('card', 'text-dark', 'bg-light', 'm-3');
    cbody = $('<div>');
    cbody.addClass('card-body');

    ctitle = $('<h5>');
    ctitle.addClass('card-title');
    ctitle.text(data.title);

    cdate = $('<p>');
    cdate.text("Date: " + data.date);

    csubject = $('<p>');
    csubject.text("Subject: " + data.subject.join(', '));

    cdescr = $('<p>');
    if (data.description) {
        cdescr.text("Description: " + data.description[0]);
    }
    else {
        cdescr.text("Description: No description found");
    }
    cbutton = $('<button>');
    cbutton.attr('href', data.url);
    cbutton.addClass('btn', 'btn-dark');

    // now append children to card
    cbody.append(ctitle, cdate, csubject, cdescr, cbutton);
    card.append(cbody);
    resultEl.append(card);
}

// feth data from loc
function fetchData(searchText, formatText) {
    var url, i;
    console.log(searchText, formatText);

    // reference: https://libraryofcongress.github.io/data-exploration/
    url = 'https://www.loc.gov/'
    if (formatText) {
        url += formatText + '/?fo=json';
    }
    else {
        url += 'search/?fo=json';
    }
    // add searchText
    url += '&q=' + searchText;
    console.log(url);

    // clear result first
    resultEl.text('');

    // fetch data from loc
    fetch(url)
        .then(function(response) {
            // verify response and act accordingly
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(function(data) {
            // process data
            if (data.results.length < 1) {
                console.log('No results found!');
                var h3 = $('<h3>').addClass('p-3 text-white');
                resultEl.append((h3).html('No results found, search again!'));
            }
            else {
                for (i = 0; i < data.results.length; i++) {
                    showData(data.results[i]);
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });

}

// get search parameters
function getURIParameters() {
    var queryStr, tokens, searchText, formatText;
    
    queryStr = location.search;
    console.log(queryStr);

    // ?searchText=stuff&format=null
    tokens = queryStr.split('&');
    searchText = tokens[0].split('=')[1];
    formatText = tokens[1].split('=')[1];
    // console.log(formatText);

    searchStrEl.text(searchText);
    fetchData(searchText, formatText);
}

// evenet handlers
var searchEl = $('#search');

function searchLibrary(event) {
    var searchText, formatText, queryStr;

    event.preventDefault();
    // console.log('I am');
    searchText = $("#searchText").val();
    formatText = $("#formatText").val();

    // console.log(searchText);
    // console.log(formatText);
    if (searchText === '') {
        alert('Please enter a search text!');
        return;
    }
    if (!formatText) {
        formatText = '';
    }
    fetchData(searchText, formatText);
}

// add event handler
searchEl.on('submit', searchLibrary);

getURIParameters();
