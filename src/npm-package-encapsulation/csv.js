const json2csv = require("json2csv");

const csvFromObjectWithBOM = (input) =>
  json2csv.parse(input, {
    withBOM: true,
    delimiter: ";",
    eol: "\n",
  });
const csvFromObjectWithoutBOM = (input) =>
  json2csv.parse(input, {
    withBOM: false,
    delimiter: ";",
    eol: "\n",
  });
const csvFromObjectTransposed = (input) =>
  json2csv.parse(transposeToArrayOfArrays(input), {
    withBOM: true,
    delimiter: ";",
    header: false,
    eol: "\n",
  });

const transposeToArrayOfArrays = (obj) =>
  Object.keys(obj).map((key) => [key, obj[key]]);

module.exports.csvFromObjectWithBOM = csvFromObjectWithBOM;
module.exports.csvFromObjectWithoutBOM = csvFromObjectWithoutBOM;
module.exports.csvFromObjectTransposed = csvFromObjectTransposed;
