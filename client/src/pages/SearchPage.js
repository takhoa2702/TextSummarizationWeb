import {useState} from "react";
import axios from "axios";

export default function SearchPage(){
    const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  return (
    <div className="search-container">
      <h1>Search Books</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map((result) => (
          <div key={result._id}>
            <h2>{result.title}</h2>
            <p>{result.summary}</p>
            <img src={result.cover} alt={result.title} />
          </div>
        ))}
      </div>
    </div>
  );
}