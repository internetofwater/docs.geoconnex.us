import React, { useState, useEffect } from "react";
import Papa from "papaparse";

const CSVTable = ({ csvUrl }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [displayUrl, setDisplayUrl] = useState(csvUrl);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        if (csvUrl) {
          const response = await fetch(csvUrl);
          const csvText = await response.text();
          parseCSV(csvText);

          // Convert raw GitHub URL to normal GitHub UI URL if applicable
          let displayUrl = csvUrl;
          if (csvUrl.includes("raw.githubusercontent.com")) {
            displayUrl = csvUrl
              .replace("raw.githubusercontent.com", "github.com")
              .replace("/master/", "/blob/master/");
          }

          setDisplayUrl(displayUrl);
        }
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      }
    };

    const parseCSV = (csvText) => {
      const parsedData = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      setHeaders(parsedData.meta.fields);
      setData(parsedData.data);
    };

    fetchCSV();
  }, [csvUrl]);

  const rowsToShow = 10
  const limitedData = data.slice(0, rowsToShow);
  const isAbbreviated = data.length > rowsToShow;
  const abbreviatedCount = data.length - limitedData.length;

  return (
    <div style={{ padding: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              colSpan={headers.length}
              style={{
                borderBottom: "2px solid #ccc",
                padding: "10px",
                textAlign: "left",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Source: <a href={displayUrl} target="_blank" rel="noopener noreferrer">{new URL(displayUrl).pathname.split('/').pop()}</a>
            </th>
          </tr>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  borderBottom: "2px solid #ccc",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {limitedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
          {isAbbreviated && (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: "left" }}>
                ...with {abbreviatedCount} more rows abbreviated for brevity
                              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CSVTable;
