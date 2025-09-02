---
title: SPARQL Query Examples
description: A collection of SPARQL queries you can use in the Wikidata SPARQL GUI.
---

## Basic Queries

### List 10 Random Wikidata Items
<div class="mw-highlight">
<pre>
SELECT ?item ?itemLabel
WHERE {'{'}
  ?item wdt:P31 wd:Q5.
  SERVICE wikibase:label {'{'} bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". {'}'}
{'}'}
LIMIT 10
</pre>
</div>

### Find Humans Born in 1990
<div class="mw-highlight">
<pre>
SELECT ?person ?personLabel ?birthDate
WHERE {'{'}
  ?person wdt:P31 wd:Q5;
          wdt:P569 ?birthDate.
  FILTER(YEAR(?birthDate) = 1990)
  SERVICE wikibase:label {'{'} bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". {'}'}
{'}'}
LIMIT 20
</pre>
</div>

## Geographic Queries

### Capitals of European Countries
<div class="mw-highlight">
<pre>
SELECT ?country ?countryLabel ?capital ?capitalLabel
WHERE {'{'}
  ?country wdt:P31 wd:Q6256;
           wdt:P36 ?capital;
           wdt:P30 wd:Q46.
  SERVICE wikibase:label {'{'} bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". {'}'}
{'}'}
LIMIT 50
</pre>
</div>

### Cities with Population Over 1 Million
<div class="mw-highlight">
<pre>
SELECT ?city ?cityLabel ?population
WHERE {'{'}
  ?city wdt:P31 wd:Q515;
        wdt:P1082 ?population.
  FILTER(?population > 1000000)
  SERVICE wikibase:label {'{'} bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". {'}'}
{'}'}
ORDER BY DESC(?population)
LIMIT 50
</pre>
</div>

## Cultural Queries

### Movies Directed by Quentin Tarantino
<div class="mw-highlight">
<pre>
SELECT ?film ?filmLabel ?releaseDate
WHERE {'{'}
  ?film wdt:P57 wd:Q104939;
        wdt:P31 wd:Q11424;
        wdt:P577 ?releaseDate.
  SERVICE wikibase:label {'{'} bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". {'}'}
{'}'}
ORDER BY ?releaseDate
</pre>
</div>


