---

title: Setting up a new Endpoint
sidebar_position: 1

---

import Tippy from '@tippyjs/react';

# Exposing your data as JSON-LD using pygeoapi

Before geoconnex can leverage your data, you need to make sure it is exposed in a way that geoconnex can crawl it. 

pygeoapi is a standardized, low-barrier, and open-source geospatial web server which allows you to output your data in a format that can be ingested by geoconnex. It leverages the [OGC-API Features](https://ogcapi.ogc.org/features/) standard, which gives each individual feature within a geospatial vector dataset a unique URL with an associated HTML landing page, a GeoJSON response, and a JSON-LD response. 

## Spinning up pygeoapi locally

pygeoapi is most easily deployed with [Docker](https://www.docker.com/).

You can spin up pygeoapi with one command and navigate to http://localhost:5000 to explore the frontend. 

  <Tippy content="This command binds port 80 in the container to port 5000 in the host, runs interactively, and cleans up after exiting.">
   <div>
   ```
   docker run -p 5000:80 -it --rm internetofwater/pygeoapi
  ```
  </div>
  </Tippy>


## Run pygeoapi with a custom configuration

Once you have explored the baseline configuration, you can clone the repo, copy the default config named `pygeoapi-config.yml`, name it `local.config.yml` change it to fit your needs, and then run the container with a custom config.


  <Tippy content="This command does the same as above, but binds the local config file to where the container expects its config. Namely: /pygeoapi/local.config.yml">
   <div>
```
git clone https://github.com/internetofwater/pygeoapi
docker run -p 5000:80 -v $(pwd)/local.config.yml:/pygeoapi/local.config.yml -it --rm internetofwater/pygeoapi:latest    
```

  </div>
  </Tippy>


:::note

`local.config.yml` is your local config that will specify which extra resources you want to expose and how you want them to be templated.


See the [pygeoapi docs](https://docs.pygeoapi.io/en/latest/configuration.html) for a list of all configuration options.

:::


:::tip

If you wish to use docker-compose, view [the pygeoapi-geoconnex-examples repo](https://github.com/cgs-earth/pygeoapi-geoconnex-examples) for sample configuration

:::