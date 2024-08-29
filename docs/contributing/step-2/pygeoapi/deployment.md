---

title: Running pygeoapi locally
sidebar_position: 1

---

import Tippy from '@tippyjs/react';

# Running pygeoapi locally

Before geoconnex can leverage your data, it must be exposed in a way that geoconnex can crawl it. 

pygeoapi is a standardized, low-barrier, and open-source geospatial web server which allows you to output your data in a format that can be ingested by geoconnex. It leverages the [OGC-API Features](https://ogcapi.ogc.org/features/) standard, which gives each individual feature within a geospatial vector dataset a unique URL with an associated HTML landing page, a GeoJSON response, and a JSON-LD response. 

:::info

In this tutorial, we use our fork of pygeoapi from the [internetofwater/pygeoapi](https://github.com/internetofwater/pygeoapi) repository which provides support for additional data provider backends. It is recommended that you use this same fork.

:::

## Running with Docker

Our fork of pygeoapi is most easily deployed with [Docker](https://www.docker.com/) to ensure reproducibility. You can also clone the repo and install from source in a similar way to upstream [pygeoapi](https://docs.pygeoapi.io/en/stable/installation.html#for-developers-and-the-truly-impatient), but this may take additional effort.


Using Docker, you can spin up pygeoapi with one command and navigate to http://localhost:5000 to explore the frontend. 


  <Tippy content="This command binds port 80 in the container to port 5000 locally, runs it interactively, and cleans up after exiting.">
   <div>
   ```sh
   docker run -p 5000:80 -it --rm internetofwater/pygeoapi
  ```
  </div>
  </Tippy>


## Running with a custom configuration

Once you have explored the baseline configuration you can use git clone and deploy a custom pygeoapi instance.  To do this:

1. Clone the repository
    - _(We clone the repository only to get a copy of the config file; assuming you are using Docker, you do not need to worry about source code or other files for setting up the environment)_
2. Copy the default config named `pygeoapi-config.yml` and name it `local.config.yml`
3. Change the settings in `local.config.yml` to fit your needs 
    - `local.config.yml` is your local config that will specify which extra resources you want to expose and how you want them to be templated.
    - See the [pygeoapi docs](https://docs.pygeoapi.io/en/latest/configuration.html) for a list of all configuration options.
4. Run the container with a custom config.

  <Tippy content="Clone pygeoapi locally, and run the it with the local config file mounted inside the container at /pygeoapi/local.config.yml">
   <div>
```
git clone https://github.com/internetofwater/pygeoapi
cd pygeoapi
docker run -p 5000:80 -v $(pwd)/local.config.yml:/pygeoapi/local.config.yml -it --rm internetofwater/pygeoapi:latest    
```

  </div>
  </Tippy>



:::tip

If you wish to use docker-compose, view [the pygeoapi-geoconnex-examples repo](https://github.com/cgs-earth/pygeoapi-geoconnex-examples) for sample configuration

:::

## Next steps

Once you have set up the container locally and explored the frontend, you can begin to start [ingesting your data](../pygeoapi/providers/index.md)