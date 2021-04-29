import ChartJS from 'chart.js/auto';
import 'chartjs-adapter-moment';

class Chart {

  createChart (labels, data, background) {
    this.chart = new ChartJS(this.ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Value',
            data,
            backgroundColor: background,
          },
        ],
      },
      options: {
        scales: {
          gridLines: {
            display: false,
          },
          x: {
            type: 'time',
            time: {
              displayFormats: {
                month: 'MMM YY',
              },
            },
            ticks: {
              autoskip: true,
              autoSkipPadding: 5,
            },
            gridLines: {
              display: false,
            },
          },

          y: {
            ticks: {
              stepSize: 20e6,
              callback: function (value) {
                return value / 1e6 + ' M';
              },
            },
            gridLines: {
              display: false,
            },
          },
        },
      },
    });
  }

  render () {
    document.querySelector(
      '.chart_div',
    ).innerHTML += '<canvas id="chart1" style="width: 100%;"></canvas>';

    this.ctx = document.getElementById('chart1').getContext('2d');
  }

  destroy () {
    this.chart.destroy();
  }

}

const chart = new Chart();

export default chart;
