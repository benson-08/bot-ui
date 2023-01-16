import React, { useState } from "react";
import { Button, Slider } from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";

function SearchForm() {
    const [isAdvanced, setisAdvanced] = useState("false");  
  const [location, setLocation] = useState([""]);
  const [subUrbs, setsubUrbs] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 350, max: 1250 });
  const [bedRooms, setBedrooms] = useState({ min: 1, max: 2 });
  const [typeOfFlat, settypeOfFlat] = useState(["rent"]);
  const [flatProps, setflatProps] = useState({
    type: typeOfFlat,
    location: location,
    pricerange: priceRange,
    bedrooms: bedRooms,
  });

  const handleSubmit = (e) => {
    setflatProps({
      ...flatProps,
      type: typeOfFlat,
      location: location,
      pricerange: priceRange,
      bedrooms: bedRooms,
    });
  };

  const handleTormat = (event, newType) => {
    settypeOfFlat(newType);
    updateMyFilter(newType, location, priceRange, bedRooms);
  };

  const updateMyFilter = function (type, location, pricerange, bedrooms) {
    setflatProps({
      ...flatProps,
      type: type,
      location: location,
      pricerange: pricerange,
      bedrooms: bedrooms,
    });
  };

  const updateLocationInput = function () {
    var query = `[out:json];area["name"="${location}"]->.searchArea;(node["place"="suburb"](area.searchArea););out;`;

    fetch(`http://overpass-api.de/api/interpreter?data=${query}`)
      .then((response) => response.json())
      .then((data) => {
        // do something with the returned data
        setsubUrbs(data.elements);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(subUrbs);
  };

  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} rowSpacing={5}>
              <Grid item xs={12}>
                <ToggleButtonGroup
                  value={typeOfFlat}
                  onChange={handleTormat}
                  aria-label="text formatting"
                  fullWidth={true}
                >
                  <ToggleButton value="rent" aria-label="bold" color="primary">
                    RENTAL
                  </ToggleButton>
                  <ToggleButton
                    value="purchase"
                    aria-label="italic"
                    color="primary"
                    disabled
                  >
                    PURCHASE
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
                          <Grid item xs={12}>
                              <Tabs value={isAdvanced} centered onChange={e => setisAdvanced(e.target.value)}>
                                  <Tab label="Simple" value="false" />
                                  <Tab label="Advanced" value="true" />
                              </Tabs>
              </Grid>
              <Grid item xs={9}>
                              <TextField
                                  label="Location"
                  value={location}
                  onChange={function (e) {
                    setLocation(e.target.value);
                    setflatProps({
                      ...flatProps,
                      location: e.target.value,
                      pricerange: priceRange,
                      bedrooms: bedRooms,
                    });
                  }}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" onClick={updateLocationInput}>
                  +
                </Button>
              </Grid>
              <Grid item xs={2}>
                <label> {priceRange.min}€</label>
              </Grid>
              <Grid item xs={8}>
                <Slider
                  getAriaLabel={() => "Price range"}
                  defaultValue={[350, 750]}
                  valueLabelDisplay="auto"
                  min={100}
                  max={3000}
                  step={10}
                  marks
                  onChange={function (e) {
                    setPriceRange({
                      ...priceRange,
                      min: e.target.value[0],
                      max: e.target.value[1],
                    });
                    setflatProps({
                      ...flatProps,
                      location: location,
                      pricerange: priceRange,
                      bedrooms: bedRooms,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <label htmlFor="customRange1" className="form-label">
                  {priceRange.max}€
                </label>
              </Grid>
              <Grid item xs={2}>
                {bedRooms.min}{" "}
              </Grid>
              <Grid item xs={8}>
                <Slider
                  getAriaLabel={() => "Bedrooms"}
                  defaultValue={[1, 3]}
                  valueLabelDisplay="auto"
                  min={1}
                  max={6}
                  step={1}
                  onChange={function (e) {
                    setBedrooms({
                      ...bedRooms,
                      min: e.target.value[0],
                      max: e.target.value[1],
                    });
                    updateMyFilter(typeOfFlat, location, priceRange, bedRooms);
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                {bedRooms.max}
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{ padding: "20px", borderRadius: "50px" }}
                >
                  <img
                    alt="Logo"
                    src="https://immobilien-bot.de/wp-content/uploads/2023/01/immobilien-bot-error.png"
                    height="35px"
                  />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={4}></Grid>
          </form>
        </Container>

        <div className="outputBox">
          <div className="input-group mb-3">{JSON.stringify(flatProps)}</div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default SearchForm;
