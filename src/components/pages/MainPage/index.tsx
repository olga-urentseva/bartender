import React, { useEffect, useMemo, useState } from "react";

import { Status, useAsync } from "../../../hooks/useAsync";
import { get } from "../../../lib/http";
import { Cocktail } from "../../../types/Cocktail";

import CocktailCard from "../../atoms/CocktailCard";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";

import styled from "styled-components";
import Loader from "../../atoms/Loader";

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  margin: 3em 0;
  flex-direction: column;
`;

const CocktailCardsWrapper = styled.div`
  display: flex;
  gap: 1em;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function MainPage() {
  const [inputValue, setInputValue] = useState("");
  const inputValueWithDefault = inputValue || "lime";
  const inputIngredients = useMemo(
    () =>
      inputValueWithDefault
        .split(",")
        .map((i) => i.trim().replace(" ", "_"))
        .filter((i) => i.length > 0),
    [inputValue]
  );

  const [run, { data, status, error }] = useAsync(() =>
    Promise.all(
      inputIngredients.map((ing) =>
        get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
      )
    )
  );

  // мне нужен массив из обьектов {name: blala, id: 123}
  // у меня есть массив с неограниченным колическтвом обьектов [{drinks: [{name: blala, id: 123}}], {drinks: {name: blala, id: 123}}]
  // скопировать самый длинный массив под drinks в новый массив
  // нужно перебрать каждый элемент массива {drinks: [{name: blala, id: 123}], зайти под ключ drinks и дальше снова перебрать все элементы.
  // перебираем каждый элемент массива под ключом drinks, это обьекты, и проверяем:
  // если в массиве есть обьект, где под ключом id лежит номер id перебираемого элемента, то ничего не делаем.
  // если нет - удаляем обьект из массива

  // const searchedDrinks = data.filter(firstRequest);
  console.log(data?.length);

  useEffect(() => {
    run();
  }, [inputValue]);

  let cocktailCards;
  if (status === Status.SUCCESS) {
    console.log(data);
    // cocktailCards = data.drinks?.map((drink: Cocktail) => {
    //   return <CocktailCard info={drink} key={drink.idDrink} />;
    // });
  }

  return (
    <Layout>
      <InnerWrapper>
        <SearchForm inputValue={inputValue} setInputValue={setInputValue} />
        {status === Status.IN_PROGRESS && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
      </InnerWrapper>
    </Layout>
  );
}

export default MainPage;
