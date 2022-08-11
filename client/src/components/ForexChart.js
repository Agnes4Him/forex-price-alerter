import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

const ForexChart = ({chartValues, baseCurrency, quoteCurrency}) => {

    var dates = Object.keys(chartValues)
    var prices = Object.values(chartValues)
    var priceArray = []
    prices.map((price) => priceArray.push((Object.values(price))[0])) 
    const chartData = {
        labels: dates,
        datasets: [
            {
                label: `Exchange Rates For ${baseCurrency}${quoteCurrency}`,
                data: priceArray,
                borderColor: "#ff647f",
                fill: true,
                lineTension: 0.1,
                borderWidth: 1.5
            }
        ]
    }

    return (
        <div className="chart-container">
            <Line 
            type="line"
            width={70}
            height={30}
            options={{
                title: {
                    display: true,
                    text: `Exchange Rates For ${baseCurrency}${quoteCurrency}`,
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: "top",
                }
            }} 
            data={chartData}
            />
        </div>
    )
}

export default ForexChart