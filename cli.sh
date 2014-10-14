# Install bionode, Stream utilities and JSON prettifier
npm install bionode tool-stream json -g

# Alternative, modular install:
# The first argument for bionode is the module name, so to use ```bionode ncbi```
# you can alternatively just install the ```bionode-ncbi``` module and use it
# with the command ```bionode-ncbi``` (notice the dash).

# Example using all-in-one bionode module
npm install bionode -g
bionode ncbi download assembly Guillardia theta
bionode fasta 503988/GCA_000315625.1_Guith1_genomic.fna.gz > guith1.json
# Same as previous using only bionode-ncbi module
npm install bionode-ncbi -g
bionode-ncbi download assembly Guillardia theta
# bionode fasta (no dash) would fail because we didn't install bionode.
# bionode-fasta (with dash) would also fail because we didn't install bionode-fasta.


# Get url of Guillardia theta assembly
bionode ncbi urls assembly Guillardia theta | tool-stream extractProperty protein.faa

# See all NCBI urls for Guillardia theta assembly datasets
bionode ncbi urls assembly Guillardia theta | json

# See all NCBI urls for Guillardia theta Sequence Read Archive (SRA) datasets
bionode ncbi urls sra Guillardia theta

# Download all Guilardia theta SRA and extract to FASTQ files
bionode ncbi download sra Guillardia theta | bionode sra fastq-dump

# Slightly shorter version since fastq-dump is default command
bionode ncbi download sra Guillardia theta | bionode sra

# Get one SRA description for Solenopsis invicta
bionode ncbi search sra Solenopsis invicta --limit 1 | json

# Extract UID for Solenopsis invicta SRA descriptions
bionode ncbi search sra Solenopsis invicta | tool-stream extractProperty uid

# Extract Titles for Solenopsis invicta SRA descriptions
bionode ncbi search sra Solenopsis invicta | tool-stream extractProperty expxml.Summary.Title

# Link SRA UIDs to papers
bionode ncbi search sra Solenopsis invicta | tool-stream extractProperty uid | bionode ncbi link sra pubmed

# Get UIDs for papers related to SRA search
bionode ncbi search sra Solenopsis invicta | tool-stream extractProperty uid | bionode ncbi link sra pubmed | tool-stream extractProperty destUID

# Get descriptions for papers related to SRA search
bionode ncbi search sra Solenopsis invicta | tool-stream extractProperty uid | bionode ncbi link sra pubmed | tool-stream extractProperty destUID | bionode ncbi search pubmed

# Save search in Dat
npm install dat -g
dat init
bionode ncbi search biosample Solenopsis invicta | dat import --json
dat listen
