import ChartJS from "chart.js";
// import DOMLinks from './DOMLinks';

class Chart {
  createChart(labels, data) {
    this.chart = new ChartJS(this.ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "# of Votes",
            data,
          },
        ],
      },
    });
  }

  render() {
    document.getElementById(
      "aside-right"
    ).innerHTML += <canvas id="chart1" style="width: 100%; height: 380px"></canvas>;

    this.ctx = document.getElementById("chart1").getContext("2d");
  }
}
const chart = new Chart();

export default chart;
