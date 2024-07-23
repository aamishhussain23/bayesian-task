import { useState } from "react";
import axios from "axios";
import "./index.css";
import SelectBox from "./components/SelectBox";
import FlightInfoCard from "./components/FlightInfoCard";

function App() {
  const [originBox, setOriginBox] = useState(false);
  const [originValue, setOriginValue] = useState("SYD");
  const [destinationBox, setDestinationBox] = useState(false);
  const [destinationValue, setDestinationValue] = useState("JFK");
  const [cabinBox, setCabinBox] = useState(false);
  const [cabinValue, setCabinValue] = useState("Economy");
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useState({
    origin: "SYD",
    destination: "JFK",
    cabin: "Economy",
  });

  const handleSearch = async () => {
    console.log("clicked");
    if (originValue === destinationValue) {
      return setError("Please select correct origin & Destination...");
    }
    try {
      const response = await axios.post('https://cardgpt.in/apitest', {
        origin: originValue,
        destination: destinationValue,
        partnerPrograms: [
          'Air Canada',
          'United Airlines',
          'KLM',
          'Qantas',
          'American Airlines',
          'Etihad Airways',
          'Alaska Airlines',
          'Qatar Airways',
          'LifeMiles',
        ],
        stops: 2,
        departureTimeFrom: '2024-07-09T00:00:00Z',
        departureTimeTo: '2024-10-07T00:00:00Z',
        isOldData: false,
        limit: 302,
        offset: 0,
        cabinSelection: [cabinValue],
        date: '2024-07-09T12:00:17.796Z',
      });
      if (response.data.data.length === 0) {
        setError("Try another search route.");
        setFlightData([]);
      } else {
        setFlightData(response.data.data);
        setError("");
        setSearchParams({ origin: originValue, destination: destinationValue, cabin: cabinValue });
      }
    } catch (error) {
      console.log(error);
      setError("Try another search route.");
      setFlightData([]);
    }
  };

  return (
    <div className="container">
      <div className="searchArea">
        <br />
        <p className="heading">Choose Origin & Destination Airports:</p>
        <br />
        <SelectBox 
          box={originBox} 
          value={originValue} 
          setValue={setOriginValue} 
          toggleBox={() => setOriginBox(!originBox)}
          isOrigin
        />
        <br />
        <br />
        <SelectBox 
          box={destinationBox} 
          value={destinationValue} 
          setValue={setDestinationValue} 
          toggleBox={() => setDestinationBox(!destinationBox)}
          isOrigin={false}
        />
        <br />
        <br />
        <SelectBox 
          box={cabinBox} 
          value={cabinValue} 
          setValue={setCabinValue} 
          toggleBox={() => setCabinBox(!cabinBox)} 
          isCabin
        />
        <br />
        <br />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="flightArea">
        {error ? <p style={{color: "red"}}>{error}</p> : flightData.map((flight, index) => (
          <FlightInfoCard 
            key={index} 
            flight={flight} 
            originValue={searchParams.origin} 
            destinationValue={searchParams.destination}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
