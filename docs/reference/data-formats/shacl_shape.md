# SHACL Shape
import ShaclShape from '@site/src/components/ShaclShape';

[SHACL](https://en.wikipedia.org/wiki/SHACL), also known as Shapes Constraint Language, is a format for defining constraints on data in a knowledge graph. It is a subset of [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework) and can be used to validate your JSON-LD data before it is added to the Geoconnex system.


This shape below ensures your data conforms to either the Location or Dataset formats presented in the [Geoconnex Specifics section](./jsonld/primer/index.md) of the documentation. 

:::note
In order to use this shape and check your JSON-LD, your data must have a JSON-LD key named `@type` with a value of either `schema:Place` or `schema:Dataset`. This signifies that it is either a dataset or a location. Otherwise shacl will skip checking it. For more info on JSON-LD generally, see the [JSON-LD section](./jsonld/overview.md) of the docs.

This shape is in active development and may be updated in the future.
:::


<ShaclShape url="https://raw.githubusercontent.com/internetofwater/nabu/refs/heads/main/shacl_validator/shapes/geoconnex.ttl" />
