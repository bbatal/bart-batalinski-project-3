import { useState } from "react";
import CutString from "../utils";
import styled from 'styled-components';

export default function Truncate(props) {
  // we need to trim the string if its a certain length or return the original string based on a boolean 
  // we'll use useState to set a toggle which we will trigger onClick
  const [bool, setBool] = useState(false);


  if (bool) {
    return <Div onClick={() => setBool(!bool)}>{props.toBeTruncated}</Div>
  }
    return <Div onClick={() => setBool(!bool)}>{CutString(props.toBeTruncated, props.amount)}</Div>

}

const Div = styled.div`
  overflow: hidden;
  overflow-y: auto;
  max-height: 200px;
  cursor: pointer;
  position: relative;
`;

