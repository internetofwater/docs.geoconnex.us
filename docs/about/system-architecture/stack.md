---
sidebar_position: 1
---

# Software Stack

The Geoconnex.us system includes multiple infrastructural components that are each necessary to achieve a robust, queryable, and stable knowledge graph for water data.

- The [Persistent Identifier Registry](https://github.com/internetofwater/pids.geoconnex.us) helps data publishers mint persistent identifiers and create a system that is stable, even if the underlying resources change
- The [Sitemap of all identifiers](http://pids.geoconnex.us/sitemap.xml) allows a crawler to easily traverse all websites in the network
- The [Scheduler](https://github.com/internetofwater/scheduler) schedules crawls and collects structured data so that it can be exported as knowledge graph triplets
- The [Knowledge Graph](/playground/sparql) allows data users to interact with linked data through a search interfaces

![a visual architecture diagram of the Geoconnex system](./assets/bigpicture.png)

## Harvesting Details 

Harvesting metadata to construct the Geoconnex graph is accomplished by the integration of 2 main components. These are heavily modified forks of programs by the same name from the [gleanerio project](https://github.com/gleanerio/). These services are generalized and could be ran to construct other knowledge graphs in addition to Geoconnex.

- [Nabu](https://github.com/internetofwater/gleaner/): a web crawler and graph synchronization CLI program written in go
    - Crawls partner websites as specified in the Geoconnex sitemap: [geoconnex.us/sitemap.xml](https://geoconnex.us/sitemap.xml)
    - Fetches JSON-LD data and outputs it in a S3-compliant storage bucket
    - Ensures that a graph database is in sync with a S3 storage bucket by dropping old named graphs and generating new ones
    - (Note: crawling functionality used to be in the [gleaner](https://github.com/gleanerio/gleaner) project but was condensed into our Nabu fork)
- [Scheduler](https://github.com/internetofwater/scheduler): a data orchestrator written with [Dagster](https://dagster.io/) and Python
    - Launches Nabu harvest and sync jobs for each source on a set interval and logs their runs
    - Handles automatic exports of the final Geoconnex graph to partner organizations

All of these programs are open source and accept community contributions. They all can be ran either locally or in the cloud. For a full end-to-end cloud deployment with Terraform, see [harvest.geoconnex.us](https://github.com/internetofwater/harvest.geoconnex.us)

![Diagram of the full pipeline showing a scheduler with dagster, a crawl from gleaner, and a sync with nabu](./assets/pipeline.png)


