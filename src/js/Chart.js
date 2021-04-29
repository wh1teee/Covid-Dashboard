import ChartJS from 'chart.js';

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
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              displayFormats: {
                month: 'MMMM',
              },
            },
            gridLines: {
              display: false,
            },
            ticks: {
              autoskip: true,
              autoSkipPadding: 40,
            },
          }],

          yAxes: [{
            ticks: {
              stepSize: 20e6,
              callback: function (value) {
                return value / 1e6 + ' M';
              },
            },
            gridLines: {
              display: false,
            },
          }],
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
}

const chart = new Chart();

export default chart;
