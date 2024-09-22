import { useEffect, useRef } from 'react';
import "sparnatural"
import "sparnatural/dist/sparnatural.css"

const config = require('!!raw-loader!./sparlq-config.ttl')?.default;
import React from 'react';

function Sparnatural() {  
   const sparnaturalRef = useRef<HTMLElement>(null);
   useEffect(
    () => {
      sparnaturalRef?.current?.addEventListener("queryUpdated", (event: any) => {
        console.log(event?.detail?.queryString);
        console.log(event?.detail?.queryJson);
        console.log(event?.detail?.querySparqlJs);
        // here : don't forget to call expandSparql so that core:sparqlString annotation is taken into account
     });
    },
    [],
  );

  return (
    <div className="App">
      {/*FontAwesome is only needed when the fontawesome features is used to display icons*/}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"  />
      <div id="ui-search">
        <spar-natural 
          ref={sparnaturalRef}
          src={JSON.stringify(config)} 
          lang={'en'}
          defaultLang={'en'}
          endpoint={'https://graph.geoconnex.us'} 
          distinct={'true'} 
          limit={'100'}
          prefix={"skos:http://www.w3.org/2004/02/skos/core# rico:https://www.ica.org/standards/RiC/ontology#"} 
          debug={"true"}
        />
      </div>
    </div>
  );
}

export default Sparnatural;

