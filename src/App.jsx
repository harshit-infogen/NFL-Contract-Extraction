import { useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import "./App.css";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import FetchButton from "./components/FetchButton";
import { TABLE_HEAD, TABLE_ROWS, TABLE_ROWS1 } from "./data";
import { currencyFormatter } from "./utils/currencyFormat";
import Spinner from "./components/Spinner";
import Awards from "./components/Awards";

const SalaryComponent = ({ columns, rows }) => {
  const renderTableHeaders = () => {
    return (
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            className="border-b border-blue-gray-100 bg-[#2d3041] p-4 text-white font-bold uppercase"
          >
            <Typography
              variant="small"
              className="font-normal leading-snug opacity-70"
            >
              {column.replaceAll("_", " ")}
            </Typography>
          </th>
        ))}
      </tr>
    );
  };

  const renderTableRows = () => {
    return rows.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className={`${
          rowIndex === row.length - 1 && "text-[#2ed688]"
        } odd:bg-blue-gray-50/50`}
      >
        {columns.map((column, colIndex) => (
          <td key={colIndex} className="p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className={`font-normal ${
                (typeof row[column] === "number" || row[column] === "Totals") &&
                "text-[#2ed688] font-medium text-lg"
              }`}
            >
              {typeof row[column] === "string" ? (
                row[column]
              ) : typeof row[column] === "number" ? (
                `${currencyFormatter(row[column])}`
              ) : row[column][1]?.length > 0 ? (
                <>
                  <p>{row[column][0]}</p>
                  <p className="uppercase text-xs">({row[column][1]})</p>
                </>
              ) : (
                row[column][0]
              )}
            </Typography>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="w-auto overflow-auto">
      <table className="w-full text-left">
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

const PerformanceComponent = () => (
  <div className="w-auto overflow-auto">
    <table className="w-full text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-[#2d3041] p-4 text-white font-bold"
            >
              <Typography
                variant="small"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS1.map(
          (
            { year, baseSalary, signBonus, rbonus, offbonus, perAward, payout },
            index
          ) => (
            <tr
              key={year}
              className={`${
                index === TABLE_ROWS.length - 1 && "text-[#2ed688]"
              } odd:bg-blue-gray-50/50`}
            >
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {year}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {baseSalary}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {signBonus}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {rbonus}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {offbonus}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {perAward}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal text-[#2ed688]"
                >
                  {payout}
                </Typography>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState("salary");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [playerInfo, setPlayerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [awards, setAwards] = useState([]);
  return (
    <>
      <div className="flex justify-between items-end">
        <p className="text-[#2ed688] uppercase font-bold text-3xl">
          {!isLoading && playerInfo?.name}
          <p className="text-black text-sm font-medium">
            {!isLoading && playerInfo?.club_name}
          </p>
        </p>
        <FetchButton
          setColumns={setColumns}
          setRows={setRows}
          setPlayerInfo={setPlayerInfo}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setAwards={setAwards}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        rows.length > 0 && (
          <>
            <Card className="h-full shadow-xl rounded-xl flex flex-col mt-6">
              {/* // Hide header for demo purpose */}
              <CardHeader className="bg-[#2d3041] text-white w-full h-4 flex justify-between rounded-b-none">
                {/* <div className="m-3">
                  <p>Contract Details</p>
                </div> */}
                {/* <div className="m-3">
                  <button className="">See All</button>
                </div> */}
              </CardHeader>
              <Tabs
                value={activeTab}
                className="justify-center items-center w-full"
              >
                <TabsHeader className="h-[60px] text-center">
                  <Tab
                    value="salary"
                    onClick={() => {
                      setActiveTab("salary");
                    }}
                    className={`${
                      activeTab === "salary" &&
                      "border-b-4 border-[#2ed688] text-[#2ed688]"
                    } font-bold cursor-pointer`}
                  >
                    Salary & Bonus Pay
                  </Tab>
                  <Tab
                    value="performance"
                    // Disable second tab for demo
                    // onClick={() => {
                    //   setActiveTab("performance");
                    // }}
                    className={`${
                      activeTab === "performance" &&
                      "border-b-4 border-[#2ed688] text-[#2ed688]"
                    } font-bold`}
                  >
                    Performance Awards
                  </Tab>
                </TabsHeader>
                {activeTab === "salary" && (
                  <SalaryComponent columns={columns} rows={rows} />
                )}
                {activeTab === "performance" && <PerformanceComponent />}
              </Tabs>
            </Card>
            <Awards awards={awards} />
          </>
        )
      )}
    </>
  );
}

export default App;
