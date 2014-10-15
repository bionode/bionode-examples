// Install the required modules with the following command:
// npm install bionode dat tool-stream JSONStream
// The run the script with:
// node bionode-ncbi-simple.js
// Try commenting/removing some of the examples below to
// see more easily what each one does, otherwise they
// will all run simultaneously and output to the console.

var bio = require('bionode')
var dat = require('dat')
var tool = require('tool-stream')
var JSONStream = require('JSONStream')

// Output a search using callback (will buffer everything in memory)
bio.ncbi.search('sra', 'Solenopsis invicta', function(data) {
  console.log(data)
})

// Output a search using events
var search = bio.ncbi.search('sra', 'Solenopsis invicta')
search.on('data', function(data) {
  console.log(data)
})

// Output a search by piping to stdout
var search = bio.ncbi.search('sra', 'Solenopsis invicta')
search.pipe(JSONStream.stringify()).pipe(process.stdout)

// Save output to Dat
// You can then in bash go to the local data folder and do dat listen
var db = dat('data', function() {
  var search = bio.ncbi.search('sra', 'Solenopsis invicta')
  var write  = db.createWriteStream()
  search.pipe(write)
})
