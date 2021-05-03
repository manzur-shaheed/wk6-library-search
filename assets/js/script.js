var searchEl = $('#search');

// add event handler
searchEl.on('submit', searchLibrary);

function searchLibrary(event) {
    event.preventDefault();

    console.log('I am here');
}