import React from "react";
import { useRouteError } from "react-router-dom";
import styled from "styled-components";

type ErrorResponse = {
  data: string | null;
  status: number;
  statusText: string | null;
};

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.primary};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorTitle = styled.h1`
  color: ${(props) => props.theme.error};
`;

const ErrorText = styled.h2`
  color: ${(props) => props.theme.accent};
`;

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <Wrapper>
      <ErrorTitle>&#128511; Error: {error.status} &#128511;</ErrorTitle>
      <ErrorText>
        &#128555; {error.data || error.statusText} &#128555;
      </ErrorText>
    </Wrapper>
  );
}

export default ErrorPage;
