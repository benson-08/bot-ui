import React, { useState } from 'react';
import { Button, Slider } from '@mui/material';

function SearchForm() {
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 350, max: 1250});
    const [bedRooms, setBedrooms] = useState({ min: 1, max: 2 });
    const [flatProps, setflatProps] = useState({ location: location, pricerange: priceRange, bedrooms: bedRooms });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier könnte man die Daten an eine API senden oder ähnliches
        
        setflatProps({ ...flatProps, location: location, pricerange: priceRange, bedrooms: bedRooms });
        console.log(JSON.stringify(flatProps));
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ZIP-Code</span>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="form-control" placeholder="Location" aria-label="Location" />
            </div>

            <div className="input-group mb-3">
                <Slider
                    getAriaLabel={() => 'Price range'}
                    defaultValue={[100, 3000]}
                    valueLabelDisplay="auto"
                    min={100}
                    max={3000}
                    step={50}
                    onChange={function(e){
                        setPriceRange({ ...priceRange, min: e.target.value[0], max: e.target.value[1] })
                        setflatProps({ ...flatProps, location: location, pricerange: priceRange, bedrooms: bedRooms });
                    }}
                />
            </div>



            <label htmlFor='customRange1' className="form-label"> Price Range: {priceRange.min}€ - {priceRange.max}€</label>


            <br />
            <div className="input-group mb-3">
                Bedrooms
                <Slider
                    getAriaLabel={() => 'Bedrooms'}
                    defaultValue={[1, 3]}
                    valueLabelDisplay="auto"
                    min={1}
                    max={6}
                    step={1}
                    onChange={function(e){
                        setBedrooms({ ...bedRooms, min: e.target.value[0], max: e.target.value[1] });
                        setflatProps({ ...flatProps, location: location, pricerange: priceRange, bedrooms: bedRooms });
                    }}
                />
                <label htmlFor='customRange1' className="form-label"> Bedrooms: {bedRooms.min} - {bedRooms.max} rooms</label>


            </div>
            <Button variant="contained" type="submit">менің жерімді табу</Button>
        </form>
        
        <div className="input-group mb-3">{JSON.stringify(flatProps)}</div>
</>
    );
}

export default SearchForm;