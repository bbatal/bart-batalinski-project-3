import { useState } from 'react';
import styled from 'styled-components';

const EMPTY_STAR = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/1088px-Five-pointed_star.svg.png";

const FULL_STAR =  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png";


export const StarRating = () => {
  const starIds = [1, 2, 3, 4, 5];
  const [hovered, setHovered] = useState(0);
  const [clicked, setClicked] = useState(0);

  const getImg = (id) => {
    return id <= hovered || id <= clicked ? FULL_STAR : EMPTY_STAR;
  }

  return (
    <>
    <P>Rate this book</P>
    <Ul>
      {starIds.map((individualId) => {
  
        return (
          <Li>
            <Img
            src={getImg(individualId)} 
            id={individualId}  
            onMouseEnter={() => {
              setHovered(individualId)
              if(individualId < clicked) setClicked(0)
            }}
            onMouseOut={() => {
              setHovered(0);
            }}
            onClick={() => {
              setClicked(individualId)
            }}
            />
          </Li>
        )
      })}
    </Ul>
    </>
  )
}

const Ul = styled.ul`
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  padding: 0.5em 0.4em 0.5em 0.4em;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  width: 10px;
  height: 10px;
  cursor: pointer;
  position: absolute;
`

const P = styled.p`
  font-size: 0.6rem;
`
