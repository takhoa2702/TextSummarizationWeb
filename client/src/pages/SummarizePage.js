import {useState, useRef, useEffect} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

export default function SummarizePage(){
  const [paragraph, setParagraph] = useState('');
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const textareaRef = useRef(null);

  // useEffect(() => {
  //   // Assume you fetched the data and set it in state
  //   const apiResponse = {
  //     generated_text: 'This is the generated summary.'
  //   };
  //   setSummary(apiResponse.generated_text);
  // }, []);


  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    try {
      console.log("this is paragraph", paragraph);
      const response = await axios.post('http://localhost:4000/summarize', { paragraph });
      setSummary(response.data[0].generated_text);
      console.log("this is summary", response.data[0].generated_text);
      
    } catch (error) {
      console.error('Error summarizing paragraph:', error);
      setError(error.response ? error.response.data.error : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  async function handleSave(ev) {
    const data = new FormData();
    data.set('paragraph', paragraph);
    data.set('summary', summary);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/summary', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  useEffect(() => {
    adjustTextareaHeight();
  }, [paragraph]);

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="summarize-container">
      <h1>Summarize a Paragraph</h1>
      <textarea
        style={{width:'100%'}}
        rows="10"
        cols="100"
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        placeholder="Enter a paragraph to summarize"
      />
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      {/* <div>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div> */}
    </div>
  );
}