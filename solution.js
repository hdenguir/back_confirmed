const StreamArray = require("stream-json/streamers/StreamArray");
const path = require("path");
const fs = require("fs");

const stream = StreamArray.withParser();

var [inputId] = process.argv.slice(2);

if (!inputId) {
  console.log("Please provide an ID");
  process.exit(0);
}

stream.on("data", ({ key, value }) => {
  if (value && value.hasOwnProperty("id") && value.id === +inputId) {
    console.log(value.name);

    stream.end(); // End stream
    stream.removeAllListeners(); //  remove All Listeners attached to stream
  }
});

stream.on("end", () => {
  console.log("All done");
});

const filename = path.join(__dirname, "input.json");

fs.createReadStream(filename).pipe(stream.input);
