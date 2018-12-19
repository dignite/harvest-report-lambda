const json2csv = require("json2csv");

const csvFromObjectWithBOM = input =>
  json2csv.parse(input, {
    withBOM: true,
    delimiter: ";"
  });
const csvFromObjectWithoutBOM = input =>
  json2csv.parse(input, {
    withBOM: false,
    delimiter: ";"
  });
const csvFromObjectTransposed = input =>
  json2csv.parse(transposeToArrayOfArrays(input), {
    withBOM: true,
    delimiter: ";",
    header: false
  });

const transposeToArrayOfArrays = obj =>
  Object.keys(obj).map(key => [key, obj[key]]);

module.exports.csvFromObjectWithBOM = csvFromObjectWithBOM;
module.exports.csvFromObjectWithoutBOM = csvFromObjectWithoutBOM;
module.exports.csvFromObjectTransposed = csvFromObjectTransposed;
