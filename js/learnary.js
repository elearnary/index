// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-bSnAwQd4c6ch-3rhWtwGcEFNknP5qgU",
    authDomain: "call-1cdf2.firebaseapp.com",
    databaseURL: "https://call-1cdf2-default-rtdb.firebaseio.com",
    projectId: "call-1cdf2",
    storageBucket: "call-1cdf2.appspot.com",
    messagingSenderId: "353146866726",
    appId: "1:353146866726:web:4549478e6b6b350af1eae7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to populate classes with parent and child names
function populateClasses() {
    const bookContainer = document.getElementById('bookContainer');

    // Reference to the Firebase database
    const dbRef = firebase.database().ref('Library');
        
    // Fetch data from Firebase
    dbRef.once('value', (snapshot) => {
        snapshot.forEach((classSnapshot) => {
            const className = classSnapshot.key;

            // Create class div
            const classDiv = document.createElement('div');
            classDiv.classList.add('containers');

            // Create header for class
            const classHeader = document.createElement('div');
            classHeader.classList.add('classes');
            classHeader.textContent = className;
            classDiv.appendChild(classHeader);

            // Add horizontal line after class header
            const hr = document.createElement('hr');
            classDiv.appendChild(hr);
        
            // Create popular books div
            const popularBooksDiv = document.createElement('div');
            popularBooksDiv.classList.add('popular', 'other');

            // Populate popular books
            classSnapshot.forEach((subjectSnapshot) => {
                const bookData = subjectSnapshot.val();
    
                // Create book div
                const bookDiv = document.createElement('div');
    
                // Create cover div
                const coverDiv = document.createElement('div');
                coverDiv.classList.add('cover');
                const coverAnchor = document.createElement('a');
                coverAnchor.href = bookData.bookUrl;
                coverAnchor.target = "_blank"; // Open link in new tab
                const coverImg = document.createElement('img');
                coverImg.src = bookData.bookCover;
                coverImg.alt = bookData.bookName;
                coverImg.loading = "lazy";
                coverAnchor.appendChild(coverImg);
                coverDiv.appendChild(coverAnchor);
                bookDiv.appendChild(coverDiv);
    
                // Create book name and author div
                const nameContainerDiv = document.createElement('div');
                nameContainerDiv.classList.add('bNameContainer');
                const bookName = document.createElement('h4');
                bookName.classList.add('bookName');
                bookName.textContent = bookData.bookName;
                const author = document.createElement('h5');
                author.classList.add('author');
                author.textContent = bookData.bookAuthor;
                nameContainerDiv.appendChild(bookName);
                nameContainerDiv.appendChild(author);
                bookDiv.appendChild(nameContainerDiv);
        
                // Append book div to popular books div
                popularBooksDiv.appendChild(bookDiv);
            });
    
            classDiv.appendChild(popularBooksDiv);
            bookContainer.appendChild(classDiv);
        });
    });
}
    
// Call the populateClasses function when the page loads
populateClasses();

var articles = document.querySelectorAll('.article');
var bcont = document.getElementById('bookContainer');
var exploreBtn = document.getElementById('explore');

// Store the initial state

var initialState = {
  articlesVisible: true,
  bcontVisible: false
};



// Push initial state to history

history.replaceState(initialState, "", window.location.pathname);

exploreBtn.addEventListener('click', function() {
  // Show bookContainer and hide articles
  bcont.style.display = 'block';
  articles.forEach(function(artic) {
    artic.style.display = 'none';
  });

  // Push new state to history

  history.pushState({
    articlesVisible: false,
    bcontVisible: true
  }, "", "");
});

window.addEventListener("popstate", function(e) {
  if (e.state) {
    // If we have state data (our custom navigation)
    if (e.state.bcontVisible) {
      bcont.style.display = 'block';
      articles.forEach(function(artic) {
        artic.style.display = 'none';
      });
    } else {
      bcont.style.display = 'none';
      articles.forEach(function(artic) {
        artic.style.display = 'block';
      });
    }
  } else {
    // If no state data (user navigated to our page fresh)
    bcont.style.display = 'none';
    articles.forEach(function(artic) {
      artic.style.display = 'block';
    });
  }
});
