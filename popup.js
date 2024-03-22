document.addEventListener('DOMContentLoaded', function () {
    const bookmarkList = document.getElementById('bookmarkList');
    const addBookmarkBtn = document.getElementById('addBookmarkBtn');
  
    // Load bookmarks from storage
    chrome.storage.local.get('bookmarks', function (data) {
      const bookmarks = data.bookmarks || [];
      renderBookmarks(bookmarks);
    });
  
    // Function to render bookmarks
    function renderBookmarks(bookmarks) {
      bookmarkList.innerHTML = '';
      bookmarks.forEach(function (bookmark) {
        const li = document.createElement('li');
        li.textContent = bookmark.title;
        li.addEventListener('click', function () {
          chrome.tabs.create({ url: bookmark.url });
        });
        bookmarkList.appendChild(li);
      });
    }
  
    // Add Bookmark button click handler
    addBookmarkBtn.addEventListener('click', function () {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        const tab = tabs[0];
        const newBookmark = { title: tab.title, url: tab.url };
        chrome.storage.local.get('bookmarks', function (data) {
          const bookmarks = data.bookmarks || [];
          bookmarks.push(newBookmark);
          chrome.storage.local.set({ bookmarks: bookmarks }, function () {
            renderBookmarks(bookmarks);
          });
        });
      });
    });
  });
  