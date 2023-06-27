import { useState, useEffect } from "react";
import axios from "axios";
const apiURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const App = () => {
  const [newCountry, setNewCountry] = useState();
  const [results, setResults] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);

  useEffect(() => {
    let fullObj = [];
    let countryObj;
    let capitalName;
    getAllCountries().then((initialCountries) => {
      // eslint-disable-next-line no-lone-blocks
      {
        initialCountries.map((country) => {
          if (country.capital) {
            country.capital.map((capital) => {
              capitalName = capital;
            });
          }
          countryObj = [
            {
              name: country.name.common,
              capital: capitalName,
              area: country.area,
              languages: country.languages,
              flag: country.flags.png,
            },
          ];
          fullObj = fullObj.concat(countryObj);

          setResults(...results, fullObj);
        });
      }
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

  const showInfo = (country, e) => {
    e.preventDefault();
    // console.log(country.toLowerCase());
    getCountries(country.toLowerCase());
  };

  const getCountries = (val) => {
    let resultsCopy = [...results];
    let res = resultsCopy.filter((country) =>
      country.name.toLowerCase().includes(val)
    );
    console.log(res);
    setFoundCountries(res);
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
        {foundCountries.length > 10 &&
          "Too many matches, specify another filter"}

        {foundCountries.length > 1 &&
          foundCountries.length < 10 &&
          foundCountries.map((country) => {
            return (
              <div key={country.name}>
                {country.name}
                <button onClick={(e) => showInfo(country.name, e)}>show</button>
              </div>
            );
          })}

        {foundCountries.length < 2 &&
          foundCountries.map((country) => {
            return (
              <div key={country.name}>
                <h2>{country.name}</h2>
                <div>
                  capital: {country.capital}
                  <br />
                  area: {country.area}
                  <br />
                  <br />
                  <strong>languages</strong>
                  {Object.values(country.languages).map((lang) => {
                    return <li key={lang}>{lang}</li>;
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
