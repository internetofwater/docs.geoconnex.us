import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import CodeBlock from '@theme/CodeBlock';

const GeoconnexSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(false); // State for toggling the editor
  const [sparqlQuery, setSparqlQuery] = useState(''); // State to store the SPARQL query

  useEffect(() => {
    const updatedSparqlQuery = `PREFIX luc: <http://www.ontotext.com/connectors/lucene#>
PREFIX luc-index: <http://www.ontotext.com/connectors/lucene/instance#>
PREFIX schema: <https://schema.org/>

SELECT DISTINCT ?uri ?name ?description ?dataset_url {
  ?search a luc-index:combined_two ;
      luc:query "${searchText}".
    
    OPTIONAL { ?uri schema:name ?name. }
    OPTIONAL { ?uri schema:description ?description. }
    OPTIONAL { ?uri <http://www.w3.org/2000/01/rdf-schema#label> ?label.}
    OPTIONAL { ?uri schema:subjectOf ?datasets.}
    OPTIONAL { ?datasets schema:url ?dataset_url.}
}
LIMIT 100`;
    setSparqlQuery(updatedSparqlQuery); // Update the SPARQL query whenever searchText changes
  }, [searchText]);

  const handleSubmit = (event) => {
    event.preventDefault();
    graphCall(searchText);
  };

  const graphCall = async (query) => {
    setLoading(true);
    setError(''); // Clear previous errors

    const url = new URL("https://graph.geoconnex.us/repositories/iow");
    url.searchParams.append("query", sparqlQuery); // Use the updated SPARQL query

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseText = await response.text();
      console.log(responseText);

      const parsedData = Papa.parse(responseText, { header: true });
      setResults(parsedData.data);
      if (parsedData.meta.fields) {
        setHeaders(parsedData.meta.fields);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.'); // Set error message
      setResults([]); // Clear results
    } finally {
      setLoading(false);
    }
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  const cleanDescription = (name, description) => {
    // in Geoconnex the description has the name in it, so we need to remove it
    
    if (!name || !description) return description; // Return the original description if name or description is missing
    
    const nameLower = name.toLowerCase();
    const descriptionLower = description.toLowerCase();
    
    // Check if the description contains the name
    if (descriptionLower.includes(nameLower)) {
      // Remove the name from the description
      return description.replace(new RegExp(name, 'i'), '').trim(); // Replace the name with an empty string and trim
    }
    
    return description; // Return the original description if no duplicates found
  };

  return (
    <div style={{ width: '90%', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter the name of a feature of interest"
          style={{ 
            flex: '1',  // Make the input take the available space
            padding: '10px', 
            fontSize: '16px', 
            marginRight: '10px',  // Add margin to the right of the input
            boxSizing: 'border-box', 
          }}
        />
        <button type="submit" style={{ 
          padding: '10px 20px',
          fontSize: '16px', 
          cursor: 'pointer', 
          borderRadius: '4px', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          border: 'none', 
          transition: 'background-color 0.3s',
        }}>
          Search
        </button>
        <button 
          type="button" 
          onClick={() => setShowEditor(!showEditor)} // Toggle editor visibility
          style={{ 
            padding: '10px 20px',
            fontSize: '16px', 
            marginLeft: '10px',
            cursor: 'pointer', 
            borderRadius: '4px', 
            backgroundColor: '#28a745', 
            color: '#fff', 
            border: 'none', 
            transition: 'background-color 0.3s',
          }}
        >
          {showEditor ? 'Hide SPARQL Query' : 'Show SPARQL Query'}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      {showEditor && (  // Conditionally render the code block
        <CodeBlock language="sparql" style={{ marginBottom: '20px' }}>
          {sparqlQuery}
        </CodeBlock>
      )}

      <div style={{ marginTop: '30px' }}>
        {results.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={{ padding: '8px', textAlign: 'left' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  {headers.map((header, idx) => (
                    <td key={idx} style={{ padding: '8px' }}>
                      {header === 'description' ? (
                        <span style={{ textDecoration: 'none' }}>
                          {cleanDescription(result.name, result.description)}
                        </span>
                      ) : isValidURL(result[header]) ? (
                        <a 
                          style={{ 
                            textDecoration: 'underline',
                            color: 'inherit' // Inherit color instead of blue
                          }}
                          href={result[header]}
                          target="_blank" // Open in a new tab
                          rel="noopener noreferrer" // Security best practice
                        >
                          {result[header] || 'Name unavailable'}
                        </a>
                      ) : (
                        <span style={{ textDecoration: 'none' }}>
                          {result[header] || 'N/A'}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GeoconnexSearch;
