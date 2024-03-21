/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-zoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../stores/action/actionCreator";

const MyChartComponent = () => {
  const chartRef = useRef(null);
  const { data } = useSelector((state) => state.dashboardReducer);
  const dispatch = useDispatch();
  const [dataChart, setDataChart] = useState({});
  const [chartType, setChartType] = useState("monthly");

  useEffect(() => {
    dispatch(fetchDashboard(chartType));
  }, [chartType]);

  useEffect(() => {
    setDataChart({
      labels: data.label,
      datasets: [
        {
          label: `Sales revenue (${chartType})`,
          data: data.data,
          backgroundColor: ["#4235f3", "gray"],
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  useEffect(() => {
    const myChart = new Chart(chartRef.current, {
      type: "bar",
      data: dataChart,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              enabled: true,
              mode: "xy",
            },
          },
          title: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Periode",
            },
          },
          y: {
            title: {
              display: true,
              text: "Revenu (Rp.)",
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [dataChart]);

  return (
    <div className="m-5">
      <div className=" h-[60px] flex items-center rounded-t-lg border-b-[2px] border-b-[#4235f3]">
        <p className="text-[18px] m-2 font-semibold text-[#1a1a1a]">
          Dashboard
        </p>
      </div>
      <div className="flex justify-center items-center  w-[100%] gap-10 my-[50px]">
        <div className="w-[1000px]">
          <canvas ref={chartRef}></canvas>
        </div>
        <div>
          {["daily", "monthly", "yearly"].map((type) => (
            <div key={type}>
              <input
                type="radio"
                id={type}
                name="chartType"
                value={type}
                checked={chartType === type}
                onChange={() => setChartType(type)}
              />
              <label
                htmlFor={type}
                className={`font-semibold ${
                  chartType === type ? "text-[#4235f3]" : null
                }`}
              >
                {" " + type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyChartComponent;
