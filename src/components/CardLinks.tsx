import { useColorMode } from '@docusaurus/theme-common';
import React from 'react';

const CardLinks = () => {
  const { colorMode } = useColorMode();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '160px',
        padding: '40px 0',
        flexWrap: 'wrap'
      }}
    >
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '300px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          ...(colorMode === 'dark' && {
            border: '1px solid #555',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)',
          })
        }}
      >
        <img
          src="/graphdb.png"
          alt="Query the graph database"
          style={{
            width: '100%',
            borderRadius: '8px'
          }}
        />
        <div style={{ marginTop: '12px' }}>
          <a
            href="https://graph.geoconnex.us"
            style={{
              display: 'inline-block',
              padding: '4px 8px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#007bff',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Query the graph database
          </a>
        </div>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '300px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          ...(colorMode === 'dark' && {
            border: '1px solid #555',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)',
          })
        }}
      >
        <img
          src="/map.png"
          alt="Explore a map of the data"
          style={{
            width: '100%',
            borderRadius: '8px'
          }}
        />
        <div style={{ marginTop: '12px' }}>
          <a
            href="https://gis.cgs.earth/portal/apps/webappviewer/index.html?id=41e8676b373344dfab9733b4d8f32837"
            style={{
              display: 'inline-block',
              padding: '4px 8px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#007bff',
              borderRadius: '4px',
              textDecoration: 'none'
            }}
          >
            Explore a map of the data
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardLinks;
