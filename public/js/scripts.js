/*! (c) 2025 Craig Cooper
/* Name: POinting Tool
 * Author: Craig Cooper
 * Author URI: http://craigomatic.co.uk
 * Description: A tool to help make scrum poker decisions
 * Version: 0.0.1
 */
const $resultContainer=document.getElementById("result"),$complexityLabel=document.querySelector(".range--complexity label"),$riskLabel=document.querySelector(".range--risk label"),$volumeLabel=document.querySelector(".range--volume label");let ranges=document.querySelectorAll("input[type=range]");for(let e=0;e<ranges.length;e++)ranges[e].addEventListener("change",(function(){const e=document.getElementById("complexity"),t=document.getElementById("volume"),l=document.getElementById("risk"),a=Number(e.value),r=Number(t.value),n=Number(l.value);let o="0",c=a+r+n;const u=parseFloat((c*(c+5)/23).toFixed(2));switch(!0){case u>=13:o="20";break;case u>8:o="13";break;case u>5:o="8";break;case u>3:o="5";break;case u>2:o="3";break;case u>1:o="2";break;case u>.5:o="1";break;case u>0:o="0.5";break;default:o="0"}$complexityLabel.innerHTML=`Complexity: ${a}`,$riskLabel.innerHTML=`Risk: ${n}`,$volumeLabel.innerHTML=`Volume: ${r}`,$resultContainer.innerHTML=o}));
//# sourceMappingURL=scripts.js.map
