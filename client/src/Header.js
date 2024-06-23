import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

//   async function performSearch() {
//     const query = document.getElementById('search-bar').value;
//     const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
//     const results = await response.json();
//     displayResults(results);
// }

// function displayResults(results) {
//     const resultsContainer = document.getElementById('search-results');
//     resultsContainer.innerHTML = '';

//     if (results.length === 0) {
//         resultsContainer.innerHTML = '<p>No results found</p>';
//         return;
//     }

//     results.forEach(book => {
//         const bookElement = document.createElement('div');
//         bookElement.classList.add('book');
//         bookElement.innerHTML = `
//             <h3>${book.title}</h3>
//             <p>Author: ${book.author}</p>
//             <p>${book.description}</p>
//         `;
//         resultsContainer.appendChild(bookElement);
//     });
// }
  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Comic</Link>
      {/* <div class="search-container">
        <input type="text" id="search-bar" placeholder="Search for books..."/>
        <button onclick="performSearch()">Search</button>
    </div>
    <div id="search-results"></div> */}
      <Link to="/search" className="search">Search</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new book</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
