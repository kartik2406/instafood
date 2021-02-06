import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [outletInfo, setOutletInfo] = useState("");

  const getOutletCode = () => {
    setOutletInfo("");
    fetch(`/api/outlets?address=${encodeURIComponent(location)}`)
      .then((res) => {
        console.log("res", res);
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log("then", data);

        if (data.name) return setOutletInfo(`Nearest outlet: ${data.name}`);
        setOutletInfo("Sorry, no outlets found in your area!");
      })
      .catch((err) => {
        console.error(err);
        let message = "Something went wrong";
        setOutletInfo(message);
      });
  };
  return (
    <main className="container">
      <h1>InstaFood</h1>
      <input
        type="text"
        value={location}
        placeholder="Please enter your location"
        onChange={(event) => setLocation(event.target.value)}
      />
      <button className="btn" onClick={getOutletCode}>
        Search
      </button>
      {outletInfo && <p className="outlet-info">{outletInfo}</p>}
    </main>
  );
}

export default App;
