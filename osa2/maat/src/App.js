import { useState, useEffect } from "react";
import axios from "axios";
const apiURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const App = () => {
  const [newCountry, setNewCountry] = useState();
  const [results, setResults] = useState([]);

  useEffect(() => {
    let fullObj = [];
    let countryObj;
    let capitalName;
    getAllCountries().then((initialCountries) => {
      {
        initialCountries.map((country) => {
          console.log(country.name.common);

          if (country.capital) {
            country.capital.map((capital) => {
              capitalName = capital;
            });
          }
          countryObj = [
            {
              name: country.name.common,
              capital: capitalName,
            },
          ];
          fullObj = fullObj.concat(countryObj);

          setResults(...results, fullObj);
        });
        console.log(fullObj);
      }

      // setResults(initialCountries);
    });
  }, []);

  const getAllCountries = () => {
    const request = axios.get(apiURL);
    return request.then((response) => response.data);
  };
  const addPerson = (event) => {
    event.preventDefault();
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    getCountries(event.target.value.toLowerCase());
  };

  const getCountries = (val) => {
    let resultsCopy = [...results];
    let res = resultsCopy.filter((country) =>
      country.name.toLowerCase().includes(val)
    );
    console.log(res);
    return res;
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          find countries:
          <input value={newCountry} onChange={handleNumberChange} />
        </div>
      </form>
      <div>
        {results.length > 1 &&
          getCountries().map((country) => {
            country.map((p) => {
              return <div className="result">{p.name}</div>;
            });
          })}
      </div>
    </div>
  );
};

export default App;
