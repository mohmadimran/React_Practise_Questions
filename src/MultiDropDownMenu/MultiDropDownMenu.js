import { useState, useEffect } from "react";

export default function AddressAPI() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Fetch countries on component load
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions") // free API
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.data.map((c) => c.name)); // Extract country names
      });
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (country) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      })
        .then((res) => res.json())
        .then((data) => {
          setStates(data.data.states.map((s) => s.name));
          setState("");
          setCity("");
        });
    }
  }, [country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (state) {
      fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, state }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCities(data.data);
          setCity("");
        });
    }
  }, [state]);

  return (
    <div>
      <h3>User Address</h3>

      {/* Country */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* State */}
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        disabled={!country}
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* City */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={!state}
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Final Result */}
      {country && state && city && (
        <p>
          <strong>Selected Address:</strong> {city}, {state}, {country}
        </p>
      )}
    </div>
  );
}

