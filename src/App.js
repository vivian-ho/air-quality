import { useState } from "react";
import logo from "./assets/air-quality.svg";
import "./app.css";
import { Header, Image, Segment, Form, Label } from "semantic-ui-react";
import Countries from "./countries";
import Cities from "./cities";
import useWindowSize from "./use-window-size";

function App() {
  const isDesktop = useWindowSize();
  const DESKTOP_SIZE = 175;
  const MOBILE_SIZE = 60;
  const deskTopSquare = { width: DESKTOP_SIZE, height: DESKTOP_SIZE };
  const mobileSquare = { width: MOBILE_SIZE, height: MOBILE_SIZE };
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [city1AirQuality, setCity1AirQuality] = useState(null);
  const [city2AirQuality, setCity2AirQuality] = useState(null);
  const [country, setCountry] = useState("");

  const DEFAULT = "white";
  const HEALTHY = "green";
  const EQUAL = "blue";
  const UN_HEALTHY = "orange";

  const pickColor = () => {
    if (city1AirQuality === null || city2AirQuality === null) {
      return { leftColor: DEFAULT, rightColor: DEFAULT };
    }

    if (city1AirQuality < city2AirQuality) {
      return { leftColor: HEALTHY, rightColor: UN_HEALTHY };
    } else if (city1AirQuality > city2AirQuality) {
      return { leftColor: UN_HEALTHY, rightColor: HEALTHY };
    }

    return { leftColor: EQUAL, rightColor: EQUAL };
  };

  const leftColor = pickColor().leftColor;
  const rightColor = pickColor().rightColor;
  const inverted =
    leftColor === HEALTHY ||
    leftColor === UN_HEALTHY ||
    rightColor === HEALTHY ||
    rightColor === UN_HEALTHY;

  return (
    <div className="app">
      <Header as="h2">
        <Image circular src={logo} /> Air Quality Assessor
      </Header>

      <Segment compact size="large" color="orange">
        Select a country, 2 cities to see air quality results. Please note some
        countries may not have any cities. If you're using Chrome, auto-fill may
        interfere with your dropdown selections.
      </Segment>

      <Form>
        <Form.Field>
          <Label pointing={"below"}>Please select a country</Label>
          <Countries setCountry={setCountry} />
        </Form.Field>

        <Form.Field>
          <Label pointing={"below"}>Please select a city</Label>
          <Cities
            country={country}
            setCity1={setCity1}
            setCity1AirQuality={setCity1AirQuality}
          />
        </Form.Field>

        <Form.Field>
          <Label pointing={"below"}>Please select another city</Label>
          <Cities
            country={country}
            setCity2={setCity2}
            setCity2AirQuality={setCity2AirQuality}
          />
        </Form.Field>
      </Form>
      <div className="results">
        <div className="segment">
          <Segment
            circular
            inverted={inverted}
            style={isDesktop ? deskTopSquare : mobileSquare}
            color={leftColor}
          >
            <Header as="h3">
              {city1}
              <Header.Subheader>{city1AirQuality}</Header.Subheader>
            </Header>
          </Segment>
        </div>

        <div className="segment">
          <Segment
            circular
            inverted={inverted}
            style={isDesktop ? deskTopSquare : mobileSquare}
            color={rightColor}
          >
            <Header as="h3">
              {city2}
              <Header.Subheader>{city2AirQuality}</Header.Subheader>
            </Header>
          </Segment>
        </div>
      </div>
    </div>
  );
}

export default App;
