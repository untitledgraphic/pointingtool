/*! (c) 2025 Craig Cooper
/* Name: POinting Tool
 * Author: Craig Cooper
 * Author URI: http://craigomatic.co.uk
 * Description: A tool to help make scrum poker decisions
 * Version: 0.0.1
 */


// @ts-check

const $resultContainer = /** @type {HTMLElement} */ (document.getElementById("result"));
const $complexityLabel = /** @type {HTMLLabelElement} */ (document.querySelector(".range--complexity label"));
const $riskLabel = /** @type {HTMLLabelElement} */ (document.querySelector(".range--risk label"));
const $volumeLabel = /** @type {HTMLLabelElement} */ (document.querySelector(".range--volume label"));
let ranges = document.querySelectorAll("input[type=range]");

for (let i = 0; i < ranges.length; i++) {
	ranges[i].addEventListener("change", function () {
        
		const $complexity = /** @type {HTMLInputElement} */ (document.getElementById("complexity"));
		const $volume = /** @type {HTMLInputElement} */ (document.getElementById("volume"));
        const $risk = /** @type {HTMLInputElement} */ (document.getElementById("risk"));
        
        const $complexityValue = Number($complexity.value);
		const $volumeValue = Number($volume.value);
		const $riskValue = Number($risk.value);

		let points = "0";
		let result = $complexityValue + $volumeValue + $riskValue;
		//const resultToPoints = ((1.393 * result - 0.8929) * (result + 5)) / 20;
		const resultToPoints = ((result * (result + 5) )) / 23;
		const roundedResult = parseFloat(resultToPoints.toFixed(2));

		// console.log(result);
		// console.log(resultToPoints);
		// console.log(roundedResult);

		switch (true) {
			case roundedResult >= 13:
				points = "20";
				break;
			case roundedResult > 8:
				points = "13";
				break;
			case roundedResult > 5:
				points = "8";
				break;
			case roundedResult > 3:
				points = "5";
				break;
			case roundedResult > 2:
				points = "3";
				break;
			case roundedResult > 1:
				points = "2";
				break;
			case roundedResult > 0.5:
				points = "1";
				break;
			case roundedResult > 0:
				points = "0.5";
				break;
			default:
				points = "0";
		}

		$complexityLabel.innerHTML = `Complexity: ${$complexityValue}`;
		$riskLabel.innerHTML = `Risk: ${$riskValue}`;
		$volumeLabel.innerHTML = `Volume: ${$volumeValue}`;
		$resultContainer.innerHTML = points;
	});
}

