import React from 'react';
import styled from 'styled-components';

export default function CustomRating() {
  return (
    // TODO create react star component
    // Get another svg to work with
    // create custom component
    <>

     <svg height="210" width="500">
  <Polygon points="100,10 40,198 190,78 10,78 160,198" />
</svg> 


    <div>CustomRating</div>
    
    </>
    
  )
}

const Polygon = styled.polygon`
  fill: white;
  stroke: purple;
  stroke-width: 0;
  fill-rule: nonzero;
`
