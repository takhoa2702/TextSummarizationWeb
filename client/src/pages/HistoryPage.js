import React, { useEffect, useState, useContext } from 'react';
import {useParams} from "react-router-dom";
import {UserContext} from "../UserContext";


export default function HistoryPage(){
  const [summaryInfo, setSummaryInfo] = useState([]);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/summary`)
      .then(response => {
        response.json().then(summaryInfo => {
          setSummaryInfo(summaryInfo);
          console.log(summaryInfo);
        });
      });
  }, []);

  if (!summaryInfo) return '';

  return (
    <div>
      <h1>Summary History</h1>
      <ul>
        {summaryInfo.map((item) => (
          <li key={item._id}>
            <p><strong>Paragraph:</strong> {item.paragraph}</p>
            <p><strong>Summary:</strong> {item.summary}</p>
            {item.author && <p><strong>Author:</strong> {item.author.username}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}