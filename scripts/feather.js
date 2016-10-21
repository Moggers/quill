'use strict'
const request = require('request')
const extract = require('extract-zip')
const fs = require('fs')
const colors = require('colors/safe')
const R = require('ramda')
var prompt = require('prompt')
var ncp = require('ncp').ncp
const spawn = require('child_process').spawn

const tmpFolder = './tmp/'
const zipFile = tmpFolder + 'feather.latest.zip'
const outFolder = tmpFolder + 'feather.bootstrap/'
const latestPackage = 'https://github.com/Sitefinity/feather-packages/archive/master.zip'

// Expected packages to install
const Packages = [
  {name: 'Bootstrap', path: 'feather-packages-master/Bootstrap'},
  {name: 'Foundation', path: 'feather-packages-master/community-packages/Foundation'},
  {name: 'SemanticUI', path: 'feather-packages-master/community-packages/SemanticUI'},
  {name: 'Minimal', path: 'feather-packages-master/Minimal'}
]

// Setup tmp folder
try { fs.mkdirSync(tmpFolder) } catch(e) {}

// Grab Latest Package
request
  .get(latestPackage)
  .on('error', err => console.error(err))
  .on('response', res => console.log('Feather Retrieved: ' + res.statusCode))
  .pipe(fs.createWriteStream(zipFile))
  .on('finish', res => {

    // Extract Zip
    extract(zipFile, {dir: outFolder}, (err) => {
      if(err) return console.error(err)

      // Validate Packages inside
      console.log('\nPackages Extracted:')
      const ValidPackages = Packages.map(VerifyPackage)
      ValidPackages.forEach( p => {
        console.log('- ' + p.name + ' ' + (p.valid ? colors.green('Valid') : colors.red('Invalid')))
      })

      // Ask User for package to install
      prompt.start()
      prompt.get({properties: {package: { description: 'Which packages to install?' }}}, (err, res) => {

        if(err) return console.error(err)
        const installPkg = R.find(R.propEq('name', res.package))(ValidPackages)
        if(!installPkg) return console.error('Invalid package name: ' + res.package)
        console.log('Installing ' + installPkg.name + '..')

        // Install Package
        ncp(outFolder + installPkg.path, './' + installPkg.name, (err) => {
          if(err) return console.error(err)
          console.log('Installed ' + installPkg.name + ' Successfully')

          // Cleanup
          spawn('rm', ['-R', 'tmp/'])
            .on('close', code => console.log( code ? 'Error cleaning up: ' + code : 'Finished Cleaning up' ))
        })

      })
    })
  })

const VerifyPackage = (pkg) => {
  pkg.valid = true
  return pkg
}
