import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

const Countries = ({ setCountry }) => {
  const [countries, setCountries] = useState([]);
  const excludes = [
    "bk",
    "ce",
    "cw",
    "iz",
    "ku",
    "kv",
    "su",
    "ti",
    "tx",
    "vm",
    "xk",
  ];
  const transform = (data) => {
    const transformed = data.reduce((result, element) => {
      const code = element["code"]?.toLowerCase();

      if (!excludes.includes(code)) {
        const option = {};

        option["key"] = code;
        option["value"] = code;
        option["flag"] = code;
        option["text"] = element["name"];
        result.push(option);
      }

      return result;
    }, []);

    return transformed;
  };

  const selectCountry = (event, data) => {
    if (setCountry && typeof setCountry === "function") {
      setCountry(data.value);
    }
  };

  const getCountries = () => {
    fetch(
      `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries?page=1&offset=0&sort=asc&order_by=country`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountries(transform(data?.results || []));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <Dropdown
      placeholder="Select Country"
      search
      selection
      options={countries}
      label="Select Country"
      fluid
      onChange={selectCountry}
    />
  );
};

export default Countries;
