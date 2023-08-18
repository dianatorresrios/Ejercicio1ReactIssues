import React, { useState, useEffect } from 'react';
import './App.css';

function IssueItem({ issue }) {
  const handleIssueClick = () => {
    window.open(issue.html_url, '_blank');
  };

  return (
    <div className="issue-item">
      <strong>Issue #{issue.number}</strong>
      <p>Title: {issue.title}</p>
      <p>Opened by: {issue.user.login}</p>
      <p>
        Labels: {issue.labels.map(label => label.name).join(', ')}
      </p>
      <button onClick={handleIssueClick}>View Details</button>
    </div>
  );
}

function App() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react/issues')
      .then(response => response.json())
      .then(data => setIssues(data))
      .catch(error => console.error('Error fetching issues:', error));
  }, []);

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Issues</h1>
        <input
          type="text"
          placeholder="Search issues"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </header>
      <div className="issue-list">
        {filteredIssues.map(issue => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

export default App;
