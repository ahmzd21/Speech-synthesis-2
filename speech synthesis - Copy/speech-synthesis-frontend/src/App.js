import React from "react";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <TextInput />
      </div>
      <Footer />
    </div>
  );
}

export default App;
