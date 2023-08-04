// script.js

const stocks = ["AAPL", "AMD", "AMZN", "GOOGL", "INTC", "MSFT", "NFLX", "NVDA", "TSLA"];

const stock1Select = document.getElementById("stock1");
const stock2Select = document.getElementById("stock2");
const calculateButton = document.getElementById("calculateButton");
const resultDiv = document.getElementById("result");

stocks.forEach(stock => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.text = stock;
  option2.text = stock;
  stock1Select.add(option1);
  stock2Select.add(option2);
});

calculateButton.addEventListener("click", calculateCovarianceAndCorrelation);

// Covariance and Correlation tables based on the provided data
const covarianceTable = [
  [0.000738, 0.000346, 0.000312, 0.000210, 0.000284, 0.000223, 0.000210, 0.000396, 0.000230],
  [0.000346, 0.001506, 0.000416, 0.000236, 0.000408, 0.000279, 0.000351, 0.000714, 0.000397],
  [0.000312, 0.000416, 0.001291, 0.000241, 0.000301, 0.000290, 0.000324, 0.000417, 0.000265],
  [0.000210, 0.000236, 0.000241, 0.000377, 0.000172, 0.000189, 0.000190, 0.000269, 0.000208],
  [0.000284, 0.000408, 0.000301, 0.000172, 0.000572, 0.000274, 0.000211, 0.000457, 0.000203],
  [0.000223, 0.000279, 0.000290, 0.000189, 0.000274, 0.000403, 0.000183, 0.000345, 0.000209],
  [0.000210, 0.000351, 0.000324, 0.000190, 0.000211, 0.000183, 0.001275, 0.000349, 0.000332],
  [0.000396, 0.000714, 0.000417, 0.000269, 0.000457, 0.000345, 0.000349, 0.001456, 0.000381],
  [0.000230, 0.000397, 0.000265, 0.000208, 0.000203, 0.000209, 0.000332, 0.000381, 0.001298]
];

const correlationTable = [
  [1.000000, 0.328385, 0.323626, 0.520148, 0.437115, 0.408310, 0.275305, 0.407624, 0.357820],
  [0.328385, 1.000000, 0.289828, 0.332774, 0.439388, 0.358164, 0.262510, 0.474507, 0.308028],
  [0.323626, 0.289828, 1.000000, 0.511666, 0.347737, 0.408004, 0.361168, 0.327907, 0.353884],
  [0.520148, 0.332774, 0.511666, 1.000000, 0.450406, 0.564028, 0.296956, 0.452747, 0.335515],
  [0.437115, 0.439388, 0.347737, 0.450406, 1.000000, 0.571335, 0.281074, 0.501017, 0.297654],
  [0.408310, 0.358164, 0.408004, 0.564028, 0.571335, 1.000000, 0.291413, 0.462960, 0.352241],
  [0.275305, 0.262510, 0.361168, 0.296956, 0.281074, 0.291413, 1.000000, 0.294175, 0.286350],
  [0.407624, 0.474507, 0.327907, 0.452747, 0.501017, 0.462960, 0.294175, 1.000000, 0.372060],
  [0.357820, 0.308028, 0.353884, 0.335515, 0.297654, 0.352241, 0.286350, 0.372060, 1.000000]
];

function calculateCovarianceAndCorrelation() {
  const stock1Symbol = stock1Select.value;
  const stock2Symbol = stock2Select.value;

  if (!stock1Symbol || !stock2Symbol) {
    resultDiv.textContent = "Please select valid stocks.";
    return;
  }

  const stock1Index = stocks.indexOf(stock1Symbol);
  const stock2Index = stocks.indexOf(stock2Symbol);

  if (stock1Index === -1 || stock2Index === -1) {
    resultDiv.textContent = "Invalid stock selection.";
    return;
  }

  if (stock1Index === stock2Index) {
    resultDiv.textContent = "Covariance between the same stock is 1.0";
    return;
  }

  const covariance = covarianceTable[stock1Index][stock2Index];
  const correlation = correlationTable[stock1Index][stock2Index];
  resultDiv.innerHTML = `
    <p>Covariance between ${stock1Symbol} and ${stock2Symbol}: ${covariance.toFixed(6)}</p>
    <p>Correlation between ${stock1Symbol} and ${stock2Symbol}: ${correlation.toFixed(6)}</p>
  `;
}
