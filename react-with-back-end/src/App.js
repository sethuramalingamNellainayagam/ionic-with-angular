import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [fetchData, setFetchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorProb, setErrorProb] = useState(null);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-learn-44283-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data, " data");
  };

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setErrorProb(null);
    try {
      const response = await fetch(
        "https://react-http-learn-44283-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedArray = data.results.map((innerData) => {
      //   return {
      //     id: innerData.birth_year,
      //     title: innerData.name,
      //     releaseDate: innerData.created,
      //     openingText: innerData.name,
      //   };
      // });
      setFetchData(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setErrorProb(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No data found...</p>;
  if (fetchData.length > 0) {
    content = <MoviesList movies={fetchData} />;
  }
  if (fetchData.length === 0) {
    content = <p>No data found...</p>;
  }
  if (errorProb) {
    content = <p>{errorProb}</p>;
  }
  if (isLoading) {
    content = <p>is loading...please wait!!!</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
