export class Graph {

  /**
   * Create Graph
   * @param {*} subject 
   * @param {*} values 
   */
  create(subject, values) {
    const valueNumbers = [values[1], values[3], values[5], values[7], values[9], values[11]];
    const labels = [values[0], values[2], values[4], values[6], values[8], values[10]];
    const max = this.getMaxValue(valueNumbers);

    const ctx = document.getElementById("myLineChart");
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: subject, 
            data: valueNumbers,
            lineTension: 0,
            borderColor: "rgb(0,105,91)",
            backgroundColor: "rgba(0,0,0,0)"
          }
        ],
      },
      options: {
        title: {
          display: true,
          text: 'Transition'
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: max + (max / 10),
              suggestedMin: 0,
              stepSize: max / 4,
              callback: function(value, index, values){
                return  value +  ' YEN'
              }
            }
          }]
        },
      }
    });
  }

  /**
   * Get max Number
   * @param {*} values 
   * @returns max
   */
  getMaxValue(values) {
    let max = 0;

    values.forEach(element => {
      const num = Number(element);
      if (max < num) {
        max = num;
      }
    });

    return max;
  }
}