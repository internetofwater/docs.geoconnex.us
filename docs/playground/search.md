---
title: "Geoconnex Feature Search"
hide_title: true
sidebar_position: 1
---

<!-- <iframe width="100%" height="1300px" src="https://search.geoconnex.us" title="Geoconnex textual search"></iframe> -->

import GeoconnexSearch from '@site/src/components/GeoconnexSearch';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="search" label="Search" default>
<div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1em"}}>
<h1>Geoconnex Feature Search</h1>
</div>
<GeoconnexSearch />
</TabItem>
<TabItem value="help" label="Help and Background Info" >

<!-- bigger but not ## because otherwise ## will show up in the heading when the tab isn't in focus -->
<div style={{fontSize: "1.5em", fontWeight: "bold", margin: "1em 0 0.5em 0"}}>
Feature Search Overview
</div>

This page allows you to search the Geoconnex graph for features of interest. It does this by querying the Geoconnex knowledge graph located at [graph.geoconnex.us](https://graph.geoconnex.us/)

This search includes both Geoconnex [reference features](/access/reference) as well as the hydrologic features of organizational partners. 

For more detailed information about finding features and their associated data in Geoconnex, see the documentation on [accessing data](/access/overview)

</TabItem>
</Tabs>