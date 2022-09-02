import styled from "styled-components";
import CoctailCard from "../../atoms/CoctailCard";
import Input from "../../atoms/Input";
import Layout from "../../templates/Layout";

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em 5em;
  justify-content: space-between;
  align-content: flex-start;
  margin: 3em 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 0 15em;
`;

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

const CoctailCardsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
  flex: 1 1 30em;
  flex-direction: row;
  flex-wrap: wrap;
`;

function MainPage() {
  return (
    <Layout>
      <InnerWrapper>
        <Form>
          <Label>What do you have in your bar?</Label>
          <Input type="text" placeholder="Limoncello" />
        </Form>
        <CoctailCardsWrapper>
          <CoctailCard
            url="https:\/\/www.thecocktaildb.com\/images\/media\/drink\/b7qzo21493070167.jpg"
            coctailName="Amaretto"
          />
          <CoctailCard
            url="https:\/\/www.thecocktaildb.com\/images\/media\/drink\/b7qzo21493070167.jpg"
            coctailName="Amaretto"
          />
          <CoctailCard
            url="https:\/\/www.thecocktaildb.com\/images\/media\/drink\/b7qzo21493070167.jpg"
            coctailName="Amaretto"
          />
        </CoctailCardsWrapper>
      </InnerWrapper>
    </Layout>
  );
}

export default MainPage;
