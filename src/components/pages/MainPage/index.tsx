import styled from "styled-components";
import Layout from "../../templates/Layout";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { FormEvent, useState } from "react";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import Loader from "../../atoms/Loader";
import Collections from "./Collections";

const SearchInnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  flex-wrap: wrap;
  margin-top: 5%;
`;

const CollectionsInnerWrapper = styled.div``;

const SearchHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
  margin-bottom: 4em;
`;

const MainText = styled.h2`
  font-size: 2.5rem;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

const CollectionsLink = styled(Link)`
  color: ${(props) => props.theme.accent};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  display: inline-block;
  transition: color 0.1s ease-in-out;
  margin-bottom: 1rem;
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.accentLight};
  }
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
          <SearchInnerWrapper>
            <MainText>Bart-t-tender is your home bar companion.</MainText>
            <IngredientsFilterForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              handleFormSubmit={handleFormSubmit}
            />
          </SearchInnerWrapper>
          <CollectionsInnerWrapper>
            <CollectionsLink to="/collections">
              Discover our collections for every taste, mood, and celebration!
              🥂
            </CollectionsLink>
            <Collections />
          </CollectionsInnerWrapper>
        </SearchHero>
      )}
    </Layout>
  );
};

export default MainPage;
