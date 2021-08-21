import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

const Cities = ({
  country,
  setCity1,
  setCity2,
  setCity1AirQuality,
  setCity2AirQuality,
}) => {
  const [cities, setCities] = useState([]);
  const url = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2";

  const transform = (data) => {
    const transformed = data.reduce((result, element) => {
      const city = element["city"];

      // exclude numbers
      if (!/^-?\d+$/.test(city)) {
        const option = {};

        option["key"] = city;
        option["value"] = city;
        option["text"] = city;
        result.push(option);
      }

      return result;
    }, []);

    return transformed;
  };

  const getCities = () => {
    if (country) {
      fetch(
        `${url}/cities?offset=0&sort=asc&country_id=${country}&order_by=city&limit=10000`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCities(transform(data?.results || []));
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const calculate = (data) => {
    let total = 0;

    data.forEach((location) => {
      total += location.value;
    });

    const average = Math.trunc((total * 10000) / data.length) / 10000;

    return average;
  };

  const selectCity = (event, data) => {
    if (setCity1 && typeof setCity1 === "function") {
      setCity1(data.value);

      fetch(
        `${url}/measurements?page=1&offset=0&sort=desc&radius=1000&country=${country}&city=${data.value}&order_by=datetime`
      )
        .then((response) => {
          return response.json();
        })
        .then((airQuality1) => {
          if (setCity1AirQuality && typeof setCity1AirQuality === "function") {
            setCity1AirQuality(calculate(airQuality1?.results || []));
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

    if (setCity2 && typeof setCity2 === "function") {
      setCity2(data.value);

      fetch(
        `${url}/measurements?limit=100&page=1&offset=0&sort=desc&radius=1000&country=${country}&city=${data.value}&order_by=datetime`
      )
        .then((response) => {
          return response.json();
        })
        .then((airQuality2) => {
          if (setCity2AirQuality && typeof setCity2AirQuality === "function") {
            setCity2AirQuality(calculate(airQuality2?.results || []));
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  useEffect(() => {
    if (country) {
      getCities();
    }
  }, [country]);

  return (
    <Dropdown
      placeholder="Select City"
      fluid
      search
      selection
      options={cities}
      label="Select City"
      onChange={selectCity}
    />
  );
};

export default Cities;
