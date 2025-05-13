import { useRouteError } from "react-router-dom";
import styled from "styled-components";

type ErrorResponse = {
  data: string | null;
  status: number;
  statusText: string | null;
};

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.surface};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: ${(props) => props.theme.error};
  font-size: 1.5rem;
`;

const ErrorText = styled.h2`
  color: ${(props) => props.theme.primary};
  font-size: 1rem;
  max-width: 80%;
`;

function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <Wrapper>
      <ErrorTitle>
        &#128511; Error: {error.status || "Something went wrong"} &#128511;
      </ErrorTitle>
      <ErrorText>
        &#128555; {error.data || error.statusText || "Please try again"}{" "}
        &#128555;
      </ErrorText>
    </Wrapper>
  );
}

export default ErrorPage;
