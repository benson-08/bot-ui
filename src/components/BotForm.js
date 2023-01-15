import React, { useState } from 'react';
import { Button, Slider } from '@mui/material';

import ToggleButton from '@mui/material/ToggleButton';

import Fab from '@mui/material/Fab';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import TextField from '@mui/material/TextField';


function SearchForm() {


    const [location, setLocation] = useState(['']);
    const [priceRange, setPriceRange] = useState({ min: 350, max: 1250 });
    const [bedRooms, setBedrooms] = useState({ min: 1, max: 2 });
    const [typeOfFlat, settypeOfFlat] = useState(["rent"]);
    const [flatProps, setflatProps] = useState({ type: typeOfFlat, location: location, pricerange: priceRange, bedrooms: bedRooms });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier könnte man die Daten an eine API senden oder ähnliches

        setflatProps({ ...flatProps, type: typeOfFlat, location: location, pricerange: priceRange, bedrooms: bedRooms });
        console.log(JSON.stringify(flatProps));
    }

    const handleTormat = (event, newType) => {
        settypeOfFlat(newType);
        updateMyFilter(newType,location,priceRange,bedRooms);
    };


    const updateMyFilter = function(type,location,pricerange,bedrooms){
        setflatProps({ ...flatProps, type: type, location: location, pricerange: pricerange, bedrooms: bedrooms });
    };



    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className='formSection'>

                    <ToggleButtonGroup
                        value={typeOfFlat}
                        onChange={handleTormat}
                        aria-label="text formatting"
                    >
                        <ToggleButton value="rent" aria-label="bold" color='primary'>
                            RENTAL
                        </ToggleButton>
                        <ToggleButton value="purchase" aria-label="italic" color='primary' disabled>
                            PURCHASE
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div className='formSection'>
                <TextField
  value={location}
  onChange={function (e) {
    setLocation(e.target.value);
    setflatProps({ ...flatProps, location: e.target.value, pricerange: priceRange, bedrooms: bedRooms });
}}
/>
                </div>

                <div className='formSection'>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        defaultValue={[350, 750]}
                        valueLabelDisplay="auto"
                        min={100}
                        max={3000}
                        step={10}
                        marks
                        onChange={function (e) {
                            setPriceRange({ ...priceRange, min: e.target.value[0], max: e.target.value[1] })
                            setflatProps({ ...flatProps, location: location, pricerange: priceRange, bedrooms: bedRooms });
                        }}
                    />
                    <br></br>
                    <label htmlFor='customRange1' className="form-label"> Price Range: {priceRange.min}€ - {priceRange.max}€</label>
                </div>

                <div className='formSection'>Bedrooms
                    <Slider
                        getAriaLabel={() => 'Bedrooms'}
                        defaultValue={[1, 3]}
                        valueLabelDisplay="auto"
                        min={1}
                        max={6}
                        step={1}
                        onChange={function (e) {
                            setBedrooms({ ...bedRooms, min: e.target.value[0], max: e.target.value[1] });
                            updateMyFilter(typeOfFlat,location,priceRange,bedRooms);
                        }}
                    />
                    <label htmlFor='customRange1' className="form-label"> Bedrooms: {bedRooms.min} - {bedRooms.max} rooms</label>
                </div>
                <Button variant="contained" type="submit">Save filter!</Button>


            </form>

            <div className="outputBox">
                <div className="input-group mb-3">{JSON.stringify(flatProps)}</div>
            </div>
        </>
    );
}

export default SearchForm;