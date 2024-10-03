import React, { useState } from 'react';
import Papa from 'papaparse';

const GeoconnexSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    graphCall(searchText);
  };

  const graphCall = async (query) => {
    setLoading(true);
    setError(''); // Clear previous errors

    const sparqlQuery = `
      PREFIX luc: <http://www.ontotext.com/connectors/lucene#>
      PREFIX luc-index: <http://www.ontotext.com/connectors/lucene/instance#>
      PREFIX schema: <https://schema.org/>
      
      SELECT ?uri ?name ?description {
        ?search a luc-index:combined_two ;
            luc:query "${query}" ;
            luc:entities ?site_name .
          
          OPTIONAL { ?uri schema:name ?name. }
          OPTIONAL { ?uri schema:description ?description. }
          OPTIONAL { ?uri <http://www.w3.org/2000/01/rdf-schema#label> ?label.}
      }
      LIMIT 100
    `;

    const url = new URL("https://graph.geoconnex.us/repositories/iow");
    url.searchParams.append("query", sparqlQuery);

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

  return (
    <div style={{ width: '80%', margin: 'auto', padding: '20px' }}>
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
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      <div style={{ marginTop: '30px' }}>
        {results.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={{  padding: '8px', textAlign: 'left' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  {headers.map((header, idx) => (
                    <td key={idx} style={{ padding: '8px' }}>
                      {header === 'uri' ? (
                        <a 
                          style={{ 
                            textDecoration: 'underline',
                            color: 'inherit' // Inherit color instead of blue
                          }}
                          href={result[header]}
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
