import Chart from "chart.js";
class Chart {
    constructor() {
        this.canvas = document.createElement("canvas");
        document.querySelector("body").appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
    }

    createChart(x, y) {
      this.chart = new Chart(this.ctx, {
          type: "bar",
          data: {
              labels: x,
              datasets: [
                  {
                      label: "number of cases",
                      data: y,
                      backgroundColor: "yellow",
                  },
              ],
          },
      })   
      const chart = new Chart()
      chart.createChart(
          ["January","February","March","April","May","June","July","August","September","October","November","December"],
          [50, 100, 200, 300, 400, 500, 550, 350, 480, 500, 600, 150]
      )
    



}

export default Chart;