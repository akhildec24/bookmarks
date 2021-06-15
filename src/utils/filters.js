function getCategories(bookmarks) {
  var cats = {};
  bookmarks.forEach(function(b) {
    if (b.category) {
      cats[b.category] = true;
    }
  });
  return Object.keys(cats).sort();
}

function getCategoryCounts(bookmarks) {
  var counts = {};
  bookmarks.forEach(function(b) {
    var cat = b.category || 'Uncategorised';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return counts;
}

function filterBookmarks(bookmarks, searchTerm, selectedCategory) {
  var filtered = bookmarks;
  var term = (searchTerm || '').toLowerCase();

  if (selectedCategory && selectedCategory !== 'All') {
    filtered = filtered.filter(function(b) {
      return b.category === selectedCategory;
    });
  }

  if (term) {
    filtered = filtered.filter(function(b) {
      var title = (b.title || '').toLowerCase();
      var url = (b.url || '').toLowerCase();
      var note = (b.note || '').toLowerCase();
      return title.indexOf(term) !== -1 ||
             url.indexOf(term) !== -1 ||
             note.indexOf(term) !== -1;
    });
  }

  return filtered;
}

function sortBookmarks(bookmarks, order) {
  var sorted = bookmarks.slice();
  if (order === 'newest') {
    sorted.sort(function(a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else {
    sorted.sort(function(a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
  return sorted;
}

function isDuplicateUrl(bookmarks, url) {
  var normalized = url.trim().toLowerCase();
  return bookmarks.some(function(b) {
    return (b.url || '').toLowerCase() === normalized;
  });
}

module.exports = {
  getCategories: getCategories,
  getCategoryCounts: getCategoryCounts,
  filterBookmarks: filterBookmarks,
  sortBookmarks: sortBookmarks,
  isDuplicateUrl: isDuplicateUrl
};
