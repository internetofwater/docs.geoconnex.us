---
sidebar_position: 4
---

# Service Level Agreements

Based on research by the Geoconnex team and input from the Geoconnex working group, these expectations are intended to inform participating data providers and end‐users, and help ensure that the publicly available infrastructure meets the needs of the water data community. In a final implementation these targets may be refined based on community feedback and operational experience. These expectations are currently met although maintaining them udner current loads is a different question than under loads of widescale use.


## 1. Persistent Identifier (PID) Service

The PID service consists of the Registry (which mints URIs/PIDs and maintains mappings to landing URLs) and the Resolver (which processes HTTP 303 redirects).

**Availability and Uptime**
- **Registry**: The registry (hosted via GitHub and/or dedicated interfaces) shall maintain a minimum of 99% availability during any given calendar month.
- **Resolver**: The PID resolver shall achieve 99% uptime (excluding planned maintenance) with a publicly communicated maintenance window.

**Performance**
- **Resolution Time**: Under normal load (including during aggregator runs), the average PID resolution time shall remain below 200 milliseconds.
- **Error Rate**: The PID resolver is expected to maintain an error rate of less than 0.5% for redirection requests.
- **Scalability**: The system will support both static PID mappings and regex-based PIDs. Providers should have documented guidance and (where feasible) user-friendly tools or APIs for contributing new PIDs (e.g. https://register.geoconnex.us). For regex-based identifiers, documentation and procedures for generating comprehensive sitemap entries shall be provided.

**Data Quality and Update Frequency**
- Requests for new namespaces will be processed within one business day of request
- Requests for changes or additions to a namespace's PID redirect collection will be reviewed within one business day of request
- The registry shall automatically update the public sitemap index (e.g., https://geoconnex.us/sitemap.xml) within one hour of approval of new PID contributions.


---

## 2. Reference Feature Server

The Reference Feature Server delivers location-based metadata in GeoJSON and JSON-LD via OGC-API Features endpoints.

**Availability and Uptime**
- The Reference Feature Server shall be accessible 99% of the time per month.
- Planned maintenance windows will be communicated in advance.

**Performance and Query Responsiveness**
- Standard OGC-API queries (e.g., for individual features or collections) shall respond within 500 milliseconds under typical load.
- Bulk requests (e.g., crawling of complete collections) shall be supported without degradation of service for other users.

**Data Freshness**
- Updates to reference features (e.g., new or revised curated collections) shall be propagated to the public endpoints within 1 hour of their publication.
- Community-managed collections will be versioned and updated regularly per agreed community schedules.

**Interoperability**
- The server will maintain compliance with the OGC API Features standard and provide output in HTML, GeoJSON, and JSON-LD formats.
- Custom JSON-LD outputs will conform to domain models such as HY_Features and schema.org.

---

## 3. Aggregator Service

The aggregator service harvests JSON-LD from published landing pages, ingests it into object storage, and loads the information into the triple store and full-text index.

**Availability and Uptime**
- The aggregator service shall be operational 99% of the time per month.
- Scheduled harvesting jobs (via tools such as Gleaner, Nabu, and Dagster) will be monitored and any failures attributable to infrastructure corrected within a maximum of 2 hours during business hours. Where failures are attributable to data providers data providers will b e informed with corrective actions recommended within a maximum of 2 hours during business hours.

**Harvesting and Ingestion Performance**
- **Cycle Frequency**: Regular harvesting cycles shall occur at least daily (or at a frequency agreed upon with data providers) with clear versioning of the RDF release graphs.
- **Latency**: The time between a requested (re-)crawl of a resource and its appearance in the aggregated knowledge graph shall not exceed 24 hours.
- **Scalability**: The system will be deployed using scalable storage and processing infrastructure to support growth in the number of data sources without performance degradation.

**Data Integrity and Versioning**
- The aggregator will maintain a “source of truth” by overwriting changed JSON-LD documents and providing versioned RDF graphs for archival and public download.
- Automated logging and error reporting will be in place to ensure that data ingestion issues are promptly detected and addressed.

---

## 4. Knowledge Graph / Triple Store

The knowledge graph is implemented using an RDF triple store (currently GraphDB) that serves as the central index for all harvested linked data.

**Availability and Uptime**
- The triple store endpoint (e.g., via SPARQL and RESTful interfaces) shall be available at least 99.5% of the time per month.
- For high-demand scenarios, plans for replication and failover will be developed and communicated.

**Query Performance**
- **Standard SPARQL Queries**: For typical user queries (such as those supported by the Reference Feature OGC-API server), response times shall be maintained under 500ms.
- **Complex Queries**: For more complex SPARQL or GeoSPARQL queries, response times up to 30 seconds may be acceptable, with continued monitoring and optimization.
- **Indexing**: The triple store will be periodically maintained to ensure efficient indexing and query planning.

**Scalability and Future-Proofing**
- The service is expected to scale with increased usage; a roadmap for database replicas and load balancing will be provided as adoption grows.
- Alternative RESTful API endpoints for non-SPARQL users will be explored and implemented to widen accessibility.

---

## 5. Usage Statistics and Monitoring (Aspirational)

The system employs several mechanisms for tracking usage (including PID server logs and CloudFront CDN logs).

**Logging and Metrics**
- **PID and CDN Logs**: Logs shall be collected and made available for aggregated usage metrics on a daily basis.
- **Data Export and Visualization**: A public dashboard (e.g., built using AWS CloudWatch, R Shiny, or Python Dash) will be maintained to display high-level usage statistics, such as number of PID resolutions, data transfers, and error rates.
- **Granularity**: While individual data providers may need to access their own logs, the system shall provide aggregated usage data by namespace where possible.

**Update Frequency**
- Usage statistics shall be updated daily and made available via a public dashboard or report.
- Any anomalous behavior (such as unexpected spikes in error rates) shall trigger an operational alert with a response target of less than 30 minutes.

---

## 6. Author Guidance and Community Support

A key element of the Geoconnex system is supporting data providers and web authors in publishing compliant JSON-LD and other metadata.

**Documentation**
- Up-to-date documentation (e.g., at https://docs.geoconnex.us/) shall be maintained and updated at least quarterly to reflect changes in best practices and technology.
- Clear, minimal guidance that leverages widely adopted vocabularies (e.g., schema.org) shall be prioritized to ease adoption.

**Support Channels** 
- A contact point, listed on GitHub and the documentation website will be available during standard business hours (or via automated support channels) to answer technical questions and assist with onboarding.
- Regular webinars and training sessions will be scheduled to help new data providers learn how to integrate with the system.

---

## 7. Governance and Community Engagement

The Geoconnex system is maintained through a collaborative governance model involving a working group and open comments from the public

**Governance Process**
- **Working Group**: A voluntary, informal technical working group will meet regularly (e.g., quarterly) to review system performance, gather community feedback, and recommend improvements.
- **Transparency**: Minutes, reports, and decisions from working group meetings shall be made publicly available within 60 days of each meeting. (Aspirational)

**Review and Improvement**
- Service level expectations will be reviewed annually and updated as needed.
- A public review process shall be initiated every 1–3 years to ensure that the service levels continue to meet the evolving needs of the water data community.

---

*Note: The above expectations serve as a starting point. As the Geoconnex system is adopted more widely and usage patterns evolve, these targets should be revisited and refined in collaboration with system operators, data providers, and end users.*