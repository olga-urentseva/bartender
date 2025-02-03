import { PropsWithChildren } from "react";
import styled from "styled-components";

const Logo = styled.h2<PropsWithChildren>`
  color: ${(props) => props.theme.text};
  font-size: 2rem;
  font-family: "Oleo Script Swash Caps", serif;
  margin: 0;
  display: inline-block;
  white-space: nowrap;
`;

export default function LogoComponent(props: PropsWithChildren) {
  return <Logo {...props}>Bart-t-tender</Logo>;
}
