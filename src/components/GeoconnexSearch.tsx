import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import CodeBlock from '@theme/CodeBlock';


const isValidURL = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

const GeoconnexSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [sparqlQuery, setSparqlQuery] = useState('');

  useEffect(() => {
    const updatedSparqlQuery = `PREFIX luc: <http://www.ontotext.com/connectors/lucene#>
PREFIX luc-index: <http://www.ontotext.com/connectors/lucene/instance#>
PREFIX schema: <https://schema.org/>

SELECT DISTINCT ?uri ?name ?description ?dataset_url {
  ?search a luc-index:combined_two ;
      luc:query "${searchText}";
      luc:entities ?uri.
    
    OPTIONAL { ?uri schema:name ?name. }
    OPTIONAL { ?uri schema:description ?description. }
    OPTIONAL { ?uri <http://www.w3.org/2000/01/rdf-schema#label> ?label.}
    OPTIONAL { ?uri schema:subjectOf/schema:url ?dataset_url.}
}
LIMIT 50`;
    setSparqlQuery(updatedSparqlQuery);
  }, [searchText]);

  const handleSubmit = (event) => {
    event.preventDefault();
    graphCall(searchText);
  };

  const graphCall = async (query) => {
    setLoading(true);
    setError('');

    const url = new URL("https://graph.geoconnex.us");
    url.searchParams.append("query", sparqlQuery);

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Status code: ${response.status} - ${(await response.text()).toString()}`);
      }
      const responseText = await response.text();

      const parsedData = Papa.parse(responseText, { header: true });
      setResults(parsedData.data);
      if (parsedData.meta.fields) {
        setHeaders(parsedData.meta.fields);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data: ' + error.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const allUndefined = (result) => {
    return headers.every(header => (result[header] === undefined || result[header] === null || result[header] === ''));
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
            flex: '1',
            padding: '10px', 
            fontSize: '16px', 
            marginRight: '10px',
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
          onClick={() => setShowEditor(!showEditor)}
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
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showEditor && (
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
                !allUndefined(result) && ( // Skip rendering row if all columns are N/A
                  <tr key={index}>
                    {headers.map((header, idx) => (
                      <td key={idx} style={{ padding: '8px' }}>
                        {header === 'description' ? (
                          <span style={{ textDecoration: 'none' }}>
                            {result[header] || 'N/A'}
                          </span>
                        ) : isValidURL(result[header]) ? (
                          <a 
                            style={{ 
                              textDecoration: 'underline',
                              color: 'inherit'
                            }}
                            href={result[header]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {result[header] || 'N/A'}
                          </a>
                        ) : (
                          <span style={{ textDecoration: 'none' }}>
                            {result[header] || 'N/A'}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GeoconnexSearch;
