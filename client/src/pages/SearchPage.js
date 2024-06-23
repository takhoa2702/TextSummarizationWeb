import {useState} from "react";

export default function SearchPage(){
    async function performSearch() {
        const query = document.getElementById('search-bar').value;
        const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
        const results = await response.json();
        displayResults(results);
    }
    
    function displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
    
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found</p>';
            return;
        }
    
        results.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>${book.description}</p>
            `;
            resultsContainer.appendChild(bookElement);
        });
    }
    return(
        <form>
        <div className="search-container">
            <input type="text" id="search-bar" placeholder="Search for books"/>
            <button onClick={performSearch}>Search</button>
        </div>
        <div id="search-result"></div>
        </form>
    );
}