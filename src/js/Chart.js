import ChartJS from "chart.js";
class Chart {
    constructor() {
        this.canvas = document.createElement("canvas");
        document.querySelector("body").appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
    }

    createChart(x, y) {
      this.chart = new ChartJS(this.ctx, {
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
    }
}

export default Chart;