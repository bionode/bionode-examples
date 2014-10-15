// Install the required modules first with:
// npm install bionode dat tool-stream async JSONStream through2
// Then run it with (it will take a few seconds to finish):
// node bionode-ncbi-complex.js
// Then you can try to go in one of the data folders and
// start Dat's web editor to look at the data:
// cd dats/papers && dat listen
// and open a browser at localhost:6461

var bio        = require('bionode')
var dat        = require('dat')
var tool       = require('tool-stream')
var async      = require('async')
var JSONStream = require('JSONStream')
var through    = require('through2')

var query = 'txid36668[Organism] AND strategy wgs[Properties]' // Ants Genomes

// dataTypes are the folders where we will store the data
// E.g., after running the pipeline you can go to dats/papers and type dat listen
// You should then open the provided url in your browser, usually localhost:6461
var dataTypes = ['reads', 'samples', 'papers', 'projects', 'genomes', 'taxons']

async.map(dataTypes, initDat, gotDats)

function initDat(path, cb) {
  console.log("Initializing Dat " + path)
  var db = dat('dats/' + path, ready)
  function ready(err) {
    var datStream = db.createWriteStream({ primary: 'uid' })
    cb(null, {path: path, datStream: datStream})
  }
}

function gotDats(err, repos) {
  if (err) { console.log(err) }
  var dats = {}
  repos.forEach(indexDat)
  function indexDat(dat) { dats[dat['path']] = dat['datStream'] }
  console.log("Starting pipeline")
  pipeline(dats)
}

function pipeline(dats) {
  console.log("Pipeline started")

  // Pass through streams to allow forking pipeline and fetching sample and paper metadata
  var fork1 = through.obj()
  var fork2 = through.obj()
  var fork3 = through.obj()

  var ncbi = bio.ncbi

  // Main pipe
  ncbi.search('sra', query)
  .pipe(fork1) // Fork pipeline to start fetching more metadata in other databases
  .pipe(dats.reads) // Store Reads metadata in an object
  .on('error', console.trace)

  fork1 // Query biosample database for Sample metadata
  .pipe(tool.extractProperty('expxml.Biosample.id', true))
  .pipe(ncbi.search('biosample'))
  .pipe(dats.samples)
  .on('error', console.trace)

  fork1 // Collect SRA datasets UIDs to fetch more metadata in other NCBI databases
  .pipe(tool.extractProperty('uid', true))
  .pipe(fork2)
  .on('error', console.trace)

  fork2 // Query bioproject for Project metadata
  .pipe(ncbi.link('sra', 'bioproject'))
  .pipe(tool.extractProperty('destUID', true)) // Collect Bioproject UID
  .pipe(ncbi.search('bioproject'))
  .pipe(dats.projects)
  .on('error', console.trace)

  fork2 // Query pubmed database for Paper metadata
  .pipe(ncbi.link('sra', 'pubmed'))
  .pipe(tool.extractProperty('destUID', true)) // Collect Paper UID
  .pipe(ncbi.search('pubmed'))
  .pipe(dats.papers)
  .on('error', console.log)

  fork1 //collect taxons for genomes
  .pipe(tool.extractProperty('expxml.Organism.taxid', true))
  .pipe(fork3)
  .pipe(appendUIDStr()) // See this function below
  .pipe(ncbi.search('taxonomy'))
  .pipe(dats.taxons)
  .on('error', console.trace)

  fork3
  .pipe(ncbi.link('taxonomy', 'genome'))
  .pipe(tool.extractProperty('destUID', true)) // Collect Genome UID
  .pipe(ncbi.search('genome'))
  .pipe(dats.genomes)
  .on('error', console.trace)
}


function appendUIDStr() {
  // Unlike other databases, NCBI taxonomy won't
  // search UIDs unless we append the string '[uid]'
  // at the end of the UID value
  var stream = through.obj(transform)
  function transform(obj, enc, next) {
    this.push(obj + '[uid]')
    next()
  }
  return stream
}
