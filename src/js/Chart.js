import ChartJS from "chart.js";

// import DOMLinks from './DOMLinks';



class Chart {
    constructor() {
      
        this.canvas = document.createElement("canvas");
        document.body.append(this.canvas);
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
const chart = new Chart();

export default chart;