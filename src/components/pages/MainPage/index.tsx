import styled from "styled-components";
import Layout from "../../templates/Layout";
import { useNavigate, useNavigation } from "react-router-dom";
import { FormEvent, useState } from "react";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import Loader from "../../atoms/Loader";
import Collections from "./Collections";

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: em;
  flex-wrap: wrap;
  margin-top: 4rem;
`;

const SearchHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
`;

const MainText = styled.h2`
  font-size: 2.5rem;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

const MainPage = () => {
  const [ingredients, setIngredients] = useState(new Set(""));
  const navigate = useNavigate();
  const { state } = useNavigation();

  function handleFormSubmit(e: FormEvent<HTMLFormElement>, inputValue: string) {
    e.preventDefault();
    console.log(inputValue);
    const newIngredients = ingredients;
    if (inputValue) {
      newIngredients.add(inputValue.trim().toLowerCase());
    }
    const newSearchParams = new URLSearchParams();
    newIngredients.forEach((ingredient) => {
      newSearchParams.append("ingredients[]", ingredient);
    });

    navigate(`/search?${newSearchParams.toString()}`);
  }

  return (
    <Layout type="accent">
      {state === "loading" ? (
        <Loader />
      ) : (
        <SearchHero>
          <InnerWrapper>
            <MainText>Bart-t-tender is your home bar companion.</MainText>
            <IngredientsFilterForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              handleFormSubmit={handleFormSubmit}
            />
          </InnerWrapper>
          <Collections />
        </SearchHero>
      )}
    </Layout>
  );
};

export default MainPage;
