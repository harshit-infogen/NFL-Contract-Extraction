import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { extractColumnKeys } from "../utils/columnExtractor";
import { extractRowData } from "../utils/rowExtractor";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const FetchButton = ({
  setColumns,
  setRows,
  setPlayerInfo,
  setIsLoading,
  isLoading,
  setAwards,
}) => {
  const [pdfData, setPdfData] = useState([]);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    console.log("inside");
    const pdfContent = event.target.files[0];
    pdfContent ? setPdfData(pdfContent) : setPdfData([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", pdfData);

      const reqOptions = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "text/html",
        },
      };
      await fetch(
        "https://pika-adjusted-vervet.ngrok-free.app/uploadfile/",
        reqOptions
      )
        .then((response) => {
          const status = response.status;
          if (response.ok) {
            setIsLoading(false);
            return response.json();
          } else if (status === 500) {
            alert("PDF is not valid. Please upload a valid PDF!");
          }
        })
        .then((data) => {
          const column = extractColumnKeys(data[0]);
          const row = extractRowData(data[0]);
          setPlayerInfo(data[1]);
          setAwards(data[2]);
          setColumns(column);
          setRows(row);
          setIsLoading(false);
          navigate("/details");
        })
        .catch(() => {
          setIsLoading(false);
          alert("Server currently unavailable!");
        });
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div
          className="w-[400px] flex items-center justify-center relative border-2 border-gray-300 border-dashed rounded-lg p-6"
          id="dropzone"
        >
          <div className="text-center">
            <img
              className="mx-auto h-16 w-16"
              src="https://www.svgrepo.com/show/501670/pdf.svg"
              alt="file"
            />

            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label className="relative cursor-pointer">
                <span className="text-indigo-600">Browse to upload</span>
                <input
                  className="sr-only"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </h3>
            <div className="border-t border-gray-300 my-4 mt-2"></div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className={`bg-[#2ed688] flex justify-center text-white text-sm px-6 py-3 font-medium rounded-md mt-4 ${
                (pdfData?.length === 0 || isLoading) && "bg-gray-400"
              }`}
              disabled={pdfData?.length === 0 || isLoading}
            >
              Upload PDF {isLoading && <Spinner />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FetchButton;
