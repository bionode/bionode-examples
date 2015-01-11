# Install Node.js from http://nodejs.org

# Install bionode-ncbi and tool-stream
npm install bionode-ncbi tool-stream -g

# Download all *complete* genomes
bionode-ncbi search genome fungi[Organism]+AND+complete[Status] | \
tool-stream extractProperty assemblyid | \
bionode-ncbi download assembly -

# Alternative: get only the URLs to download with wget or other tool
bionode-ncbi search genome fungi[Organism]+AND+complete[Status] | \
tool-stream extractProperty assemblyid | \
bionode-ncbi urls assembly - | \
tool-stream extractProperty genomic.fna

# Tip: Have a look at one prettyfied JSON object, e.g., from URLs command
npm install json -g # install prettyfier
bionode-ncbi search genome fungi[Organism]+AND+complete[Status] -l2 | \
tool-stream extractProperty assemblyid | \
bionode-ncbi urls assembly  - | \
json

# Example output from previous tip:
#{
#  "uid": "205361",
#  "report": {
#    "txt": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/GCA_000743665.1_ASM74366v1_assembly_report.txt"
#  },
#  "stats": {
#    "txt": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/GCA_000743665.1_ASM74366v1_assembly_stats.txt"
#  },
#  "genomic": {
#    "fna": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/GCA_000743665.1_ASM74366v1_genomic.fna.gz",
#    "gbff": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/GCA_000743665.1_ASM74366v1_genomic.gbff.gz",
#    "gff": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/GCA_000743665.1_ASM74366v1_genomic.gff.gz"
#  },
#  "rm": {
#    "out": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/GCA_000743665.1_ASM74366v1_rm.out.gz",
#    "run": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/GCA_000743665.1_ASM74366v1_rm.run"
#  },
#  "README": {
#    "txt": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/README.txt"
#  },
#  "md5checksums": {
#    "txt": "http://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000743665.1_ASM74366v1/md5checksums.txt"
#  }
#}
