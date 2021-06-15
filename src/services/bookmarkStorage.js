var STORAGE_KEY = 'bookmark-box-data';

var sampleBookmarks = [
  {
    id: 1,
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    category: 'Development',
    note: 'Essential web development reference',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Hacker News',
    url: 'https://news.ycombinator.com',
    category: 'News',
    note: 'Tech community news and discussion',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'CSS-Tricks',
    url: 'https://css-tricks.com',
    category: 'Development',
    note: 'CSS tips and techniques',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'A List Apart',
    url: 'https://alistapart.com',
    category: 'Design',
    note: 'Web design articles and best practices',
    createdAt: new Date().toISOString()
  }
];

function load() {
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  save(sampleBookmarks);
  return sampleBookmarks;
}

function save(bookmarks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

module.exports = {
  load: load,
  save: save
};
