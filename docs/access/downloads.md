---
sidebar_position: 4
title: Downloading Geoconnex Graph Data Dumps
---

Geoconnex provides ways to download the entire graph database so that users can host or query it locally. 


## N-Quads

Geoconnex provides a dump of all [nquads](https://www.w3.org/TR/n-quads/) that compromises the Geoconnex graph [on github here](https://github.com/internetofwater/geoconnex.us/pkgs/container/geoconnex-graph). This is packaged as an OCI artifact. An OCI artifact is essentially a docker container for data that encapsulates a set of files with metadata. It can be easily versioned and rolled back.

You will need to install [`oras`](https://oras.land/). `oras` is a command line tool for managing OCI artifacts. Then run [`oras pull`](https://oras.land/docs/commands/oras_pull) to download the image.

### Example

_Download the snapshot of the Graph generated on 2026_05_14_
```
oras pull ghcr.io/internetofwater/geoconnex-graph:2026_05_14
```

## Geoparquet

Geoconnex also provides a download of all geospatial data in the graph as geoparquet [here](https://storage.cloud.google.com/metadata-geoconnex-us/exports/geoconnex_features.parquet). Geoparquet is similar to CSV but binary encoded and more appropriate for large geospatial datasets.

Note that this is just the geospatial data and some basic metadata like the name and description of the feature. For other linked metadata such as dataset info that doesn't have direct geospatial data on it, you should make queries against the full graph database.