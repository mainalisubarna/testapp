import { useState } from "react";
import Layout from './Pages/Layout/index'
import SearchButton from "./Components/DragAndDropWithImageUploader";
import {Routes, Route} from 'react-router-dom';
import "./App.css";
import HomePage from "./Pages/Home";

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<HomePage/>}></Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
