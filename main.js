var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var addBookmark = document.getElementById('addBookmark');
var bookmarkList = document.getElementById('bookmarkList');
var errorMessage = document.querySelector('.error-message');
var validationRules = document.querySelector('.validation-rules');


var bookmarks = [];


addBookmark.onclick = function () {
  var name = bookmarkName.value.trim();
  var url = bookmarkURL.value.trim();


  if (name === '' || url === '') {
    errorMessage.style.display = 'block';
    validationRules.style.display = 'none';
    return;
  }

  if (name.length < 3 || !validateURL(url)) {
    errorMessage.style.display = 'none';
    validationRules.style.display = 'block';
    return;
  }

  errorMessage.style.display = 'none';
  validationRules.style.display = 'none';

  
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name === name) {
      alert('Bookmark with this name already exists.');
      return;
    }
  }

  
  bookmarks.push({ name: name, url: url });

  
  renderBookmarks();

  
  bookmarkName.value = '';
  bookmarkURL.value = '';
};

function renderBookmarks() {
  bookmarkList.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    var row = '<tr>' +
              '<td>' + (i + 1) + '</td>' +
              '<td>' + bookmarks[i].name + '</td>' +
              '<td><a href="' + bookmarks[i].url + '" target="_blank" class="btn btn-success btn-sm">Visit</a></td>' +
              '<td><button class="btn btn-danger btn-sm" onclick="deleteBookmark(' + i + ')">Delete</button></td>' +
              '</tr>';

    bookmarkList.innerHTML += row;
  }
}


function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  renderBookmarks();
}


function validateURL(url) {
  var urlPattern = /^(https?:\/\/)[\w.-]+(\.[a-z]{2,})/i;
  return urlPattern.test(url);
}
