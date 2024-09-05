import { useEffect, useState } from "react";
import React from "react";

interface IPokemon {
  name: string;
  url: string;
}

interface IResponse {
  count: number;
  next: string;
  previous: string | null;
  results: IPokemon[];
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IPokemon[] | null>(null);

  useEffect(() => {
    async function dataFetcher() {
      setIsLoading(true)
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const { results: pokemon } = await response.json() as IResponse;
      
      setData(pokemon);
      setIsLoading(false);
    }

    dataFetcher()
  }, []);

  return (
    <div>
      <h1>Hello Learners</h1>
      <h2>This is a demo of React App to retreive data from API!</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data?.map((p) => <p key={p.name}>{p.name}</p>)
      )}
    </div>
  );
}