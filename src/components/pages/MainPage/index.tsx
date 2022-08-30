import React from "react";
import styled from "styled-components";
import Input from "../../atoms/Input";
import Layout from "../../templates/Layout";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2em 0;
`;

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

function MainPage() {
  return (
    <Layout>
      <Form>
        <Label>What do you have in your bar?</Label>
        <Input type="text" placeholder="Limoncello" />
      </Form>
    </Layout>
  );
}

export default MainPage;
