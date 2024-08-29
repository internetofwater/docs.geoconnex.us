---
sidebar_position: 1
title: Overview
---

# Overview for Accessing Data in Geoconnex


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
  {/* Card 1 */}
  <div
    style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      width: '300px',
      padding: '16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
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
          padding: '10px 20px',
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

  {/* Card 2 */}
  <div
    style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      width: '300px',
      padding: '16px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
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
          padding: '10px 20px',
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



Users can make knowledge graph queries for Geoconnex data at [graph.geoconnex.us](https://graph.geoconnex.us/).
The features with a namespace in https://github.com/internetofwater/geoconnex.us are harvested and included in the Geoconnex knowledge graph. These include both community reference features as well as those which are associated with a particular organization or database.

The query functionality for Geoconnex is in active development and there are plans to eventually develop a general purpose web api for accessing the knowledge graph without needing to use a graph database query language like SPARQL.



