const math = require("mathjs")

let formula = "x^2 * e^x * sin(x)"
let solution = math.derivative(formula,"x");

console.log(solution.toString());