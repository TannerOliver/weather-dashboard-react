import { Nav, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState } from "react";

export default function Aside() {
  const [ city, setCity ] = useState('');
  let locallyStoredCities = JSON.parse(localStorage.getItem('storedCities')) || []

  const saveCityLocally = () => {
    if (!locallyStoredCities.includes(city)) {
      locallyStoredCities.push(city)
      localStorage.setItem('storedCities', JSON.stringify(locallyStoredCities));
    }
  }

  let secondApiCall = async ( lat, lon ) => {
    console.log(lat);
    console.log(lon);
    // delete me
  }

  let firstApiCall = async (apiLink) => {
    let firstApiFetch = await fetch(apiLink);
    let firstApiFetchData = await firstApiFetch.json();
    console.log(firstApiFetchData);
    let lat = firstApiFetchData.coord.lat;
    let lon = firstApiFetchData.coord.lon;
    secondApiCall( lat, lon)
  } 

  const fetchCity = async () => {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const apiKey = '&appid=81c8f33d2835754b525076279bdd2d53';
    console.log(city);
    let requestUrl = apiUrl + city + apiKey
    //  Set city in local storage
    saveCityLocally()
    //  Call first api call function
    firstApiCall(requestUrl)
    //  Append searched city
    //  Clear the input field
    return (
      console.log('Hello World!')
    )
  }

  const handleInput = ( e ) => {
    setCity(e.target.value);
  }

  return (
    <Nav>
      <div className='cityInput'>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Los Angeles"
            aria-label="currentCity"
            aria-describedby="basic-addon"
            onChange={handleInput}
          />
          <Button variant="outline-secondary" id="button-addon" onClick={fetchCity}>
            Button
          </Button>
        </InputGroup>
      </div>
      <div>
        <Nav.Item>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
        </Nav.Item>
      </div>
    </Nav>
  )
}