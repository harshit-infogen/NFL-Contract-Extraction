import { useState } from "react";
import "./App.css";
import FetchButton from "./components/FetchButton";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContractDetails from "./components/ContractDetails";

function New() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [playerInfo, setPlayerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [awards, setAwards] = useState([]);
  
  //Test comment
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <FetchButton
                setColumns={setColumns}
                setRows={setRows}
                setPlayerInfo={setPlayerInfo}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setAwards={setAwards}
              />
            }
          />
          <Route
            path="/details"
            element={
              <ContractDetails
                playerInfo={playerInfo}
                isLoading={isLoading}
                rows={rows}
                columns={columns}
                awards={awards}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default New;
