// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
const LineChart = () => {
  const [details, setDetails] = useState([]);
  const [dates, setDates] = useState([]); // State to hold the dates

  const fetch = async () => {
    try {
      const response = await axios.get(
        `https://url-shortner-node.onrender.com/api/url/short`
      );
      const data = response.data.UrlData;

      // Extract clicks and dates from the response
      const clicksData = data.map((item) => item.clicks);
      const datesData = data.map((item) =>
      new Date(item.date).toLocaleDateString() // Format the date
    );
      setDetails(clicksData);
      setDates(datesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  let sum = 0;

  useEffect(() => {
      try {
        fetch()
        const calculatedSum = details.reduce((acc, item) => acc + item, 0);
          // eslint-disable-next-line react-hooks/exhaustive-deps
        sum = calculatedSum;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, []);
  


  // Calculate the sum of clicks

  const data = {
    labels: dates, // Use the dates as labels
    datasets: [
      {
        label: "URL Creation Statistics",
        backgroundColor: "red",
        borderColor: "black",
        data: [sum, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
