'use strict'
const request = require('request')
const extract = require('extract-zip')
const fs = require('fs')
const colors = require('colors/safe')
const R = require('ramda')
//var prompt = require('prompt')
var ncp = require('ncp').ncp
const spawn = require('child_process').spawn

const tmpFolder = './tmp/'
const skeletonSrc = './tools/skeletons/'
const zipFile = tmpFolder + 'feather.latest.zip'
const outFolder = tmpFolder + 'feather.bootstrap/'
const latestPackage = 'https://github.com/Sitefinity/feather-packages/archive/master.zip'
const tick = colors.green('✔')
const cross = colors.red('✖')
var installing = false
const root = __dirname.replace('tools','')

const ncpOptions = {transform: (read, write) => {
  console.log('Copied ' + read.path.replace(__dirname, '') + ' -> ' + colors.green(write.path.replace(root, '')))
  read.pipe(write)
}}

// Expected packages to install
const Packages = [
  {name: 'Bootstrap', path: 'feather-packages-master/Bootstrap'},
  {name: 'Foundation', path: 'feather-packages-master/community-packages/Foundation'},
  {name: 'SemanticUI', path: 'feather-packages-master/community-packages/SemanticUI'},
  {name: 'Minimal', path: 'feather-packages-master/Minimal'}
]
var ValidPackages = []

// Setup tmp folder
try { fs.mkdirSync(tmpFolder) } catch(e) {}
process.stdin.setEncoding('utf8')

// Grab Latest Zip of feather-packages
console.log('Downloading Feather Bootstrap..')
request
  .get(latestPackage)
  .on('error', err => console.error(err))
  .on('response', res => console.log('Response: ' + colors.green(res.statusCode + ' OK') ))
  .pipe(fs.createWriteStream(zipFile))
  .on('finish', res => {

    // Extract Zip to tmp folder
    console.log('Download Complete, Extracting..')
    extract(zipFile, {dir: outFolder}, (err) => {
      if(err) return console.error(err)

      // Validate Packages
      ValidPackages = Packages.map(VerifyPackage)
      console.log('\nFound '+colors.magenta(ValidPackages.length)+' Packages:')
      ValidPackages.forEach( pkg => {
        const pre = pkg.valid ? ' ' + tick + ' ' : ' ' + cross+ ' '
        const post = pkg.installed ? ' - ' + colors.yellow('Installed!') : ''
        console.log(pre + pkg.name + post)
      })

      // Ask User for package to install
      console.log('\nChoose a package to install: ')
      return process.stdin.resume()
    })
  })

// Package selector
process.stdin.on('data', (text) => {

  var installPkg = R.find(R.propEq('name', text.trim()))(ValidPackages)
  if(!installPkg) return console.error(colors.red('Invalid package name: ') + text)
  if(installing){ return true } else { installing = installPkg.name }
  console.log('Installing ' + installPkg.name + ' Package..')

  // Copy over the entire package
  ncp(outFolder + installPkg.path, './' + installPkg.name, (err) => {
    if(err) return console.error(err)
    console.log('Installing ' + installPkg.name + ' Skeleton..')

    // Copy over skeleton
    ncp(skeletonSrc + installPkg.name, './src/', ncpOptions, (err) => {
      if(err) return console.error(err)
      
      // Cleanup
      spawn('rm', ['-R', 'tmp/'])
        .on('close', code => {
          console.log( code ? 'Error cleaning up: ' + code : 'Finished Installing' + installPkg.name )
          process.stdin.pause()
        })
    })

  })
})

const VerifyPackage = (pkg) => {
  pkg.valid = false
  pkg.installed = false
  if(fs.existsSync('./' + pkg.name)) { pkg.installed = true }
  if(fs.existsSync(outFolder + pkg.path)){ pkg.valid = true }
  return pkg
}
