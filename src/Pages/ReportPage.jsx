import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";
import { utils, write as writeExcel } from "xlsx";

const ITEMS_PER_PAGE = 25;

const ReportPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInterval, setSelectedInterval] = useState("all"); // Default to show all data
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  useEffect(() => {
    const emailSent = JSON.parse(localStorage.getItem("emailSent"));
    const res = new Date().getTime().toString() <= emailSent?.expires;

    if (res) {
      const unsubscribe = fetchDataFromFirebase(
        (jsonData) => {
          const enquiriesData = jsonData.contactUs?.enquiries;
          if (enquiriesData && typeof enquiriesData === "object") {
            // Convert the object to an array
            const dataArray = Object.values(enquiriesData);
            setData(dataArray);
            setfilteredData(filterDataByInterval(data, selectedInterval));
          } else {
            console.error("Invalid enquiries data format:", enquiriesData);
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );

      // Cleanup function to unsubscribe when the component is unmounted
      return () => {
        unsubscribe();
      };
    }
  }, [data, selectedInterval]); // Empty dependency array to run the effect only once on mount

  // Calculate total pages
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Slice the data array based on current page and items per page
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Function to decode and format the token timestamp
  const formatTokenTime = (token) => {
    const timestamp = parseInt(atob(token), 10);
    const dateObject = new Date(timestamp);

    // Format the date as desired
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return dateObject.toLocaleString(undefined, options);
  };

  // Function to download data as Excel file
  const downloadExcel = () => {
    const sheetData = filteredData.map((item) => ({
      Name: item.name,
      Email: item.email,
      Message: item.message,
      Phone: item.phone,
      Address: item.address,
      "Company Name": item.companyName,
      Quote: item.quote,
      Token: formatTokenTime(item.token),
    }));

    const ws = utils.json_to_sheet(sheetData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data Report");
    const excelBuffer = writeExcel(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Create a timestamp in the format: yyyy-MM-ddTHH-mm-ss-SSS
    const fileName = `DataReport_${timestamp}.xlsx`;

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const filterDataByInterval = (data, interval) => {
    const currentDate = new Date();

    switch (interval) {
      case "lastDay":
        return data.filter((item) => {
          const tokenDate = new Date(parseInt(atob(item.token), 10));
          return tokenDate >= currentDate - 24 * 60 * 60 * 1000;
        });

      case "lastWeek":
        return data.filter((item) => {
          const tokenDate = new Date(parseInt(atob(item.token), 10));
          return tokenDate >= currentDate - 7 * 24 * 60 * 60 * 1000;
        });

      case "lastMonth":
        return data.filter((item) => {
          const tokenDate = new Date(parseInt(atob(item.token), 10));
          return tokenDate >= currentDate - 30 * 24 * 60 * 60 * 1000;
        });
      case "custom":
        const startDate = new Date(customStartDate);
        const endDate = new Date(customEndDate);
        return data.filter((item) => {
          const tokenDate = new Date(parseInt(atob(item.token), 10));
          return tokenDate >= startDate && tokenDate <= endDate;
        });
      default:
        return data; // 'all' or any other case
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold">Data Report</h1>
        </div>
        <div>
          <label className="mr-2">Filter by:</label>
          <select
            value={selectedInterval}
            onChange={(e) => setSelectedInterval(e.target.value)}
            className="px-2 py-1 rounded border"
          >
            <option value="all">All</option>
            <option value="lastDay">Last 24 hours</option>
            <option value="lastWeek">Last 7 days</option>
            <option value="lastMonth">Last 30 days</option>
            <option value="custom">Custom Date Range</option> {/* New option */}
          </select>
          {selectedInterval === "custom" && (
            <>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="mx-2 px-2 py-1 rounded border"
              />
              <span className="mx-2">to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="mx-2 px-2 py-1 rounded border"
              />
            </>
          )}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={downloadExcel}
        >
          Download Excel
        </button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="table-cell">Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Message</th>
            <th className="table-cell">Phone</th>
            <th className="table-cell">Address</th>
            <th className="table-cell">Company Name</th>
            <th className="table-cell">Quote</th>
            <th className="table-cell">Time</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="table-cell">{item.name}</td>
              <td className="table-cell">{item.email}</td>
              <td className="table-cell">{item.message}</td>
              <td className="table-cell">{item.phone}</td>
              <td className="table-cell">{item.address}</td>
              <td className="table-cell">{item.companyName}</td>
              <td className="table-cell">{item.quote}</td>
              <td className="table-cell">{formatTokenTime(item.token)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`mx-2 p-2 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportPage;