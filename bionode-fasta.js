var parser = require('bionode-fasta')

// Usage with event per sequence
var readStream = parser.obj('./node_modules/bionode-fasta/test/test.fasta')

readStream.on('data', console.log)
readStream.on('end', function() {
  console.log('finished')
})

// Usage with concatenated data sent to Callback at the end
parser.obj('./node_modules/bionode-fasta/test/test.fasta.gz', function(error, data) {
  if (error) { console.log(error) }
  console.log(data)
})
