'use strict'
process.env.NODE_ENV = 'test'
var chai = require('chai')
var chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
var expect = chai.expect
const exec = require('child_process').exec
const Bootstrap = require('../../tools/feather.js')
const fs = require('fs')

describe('Quill', function(){

  describe('yarn bootstrap', function(){

    this.timeout(20000)

    before('Delete all used folders', function(done){
      exec('rm -R tmp/ Bootstrap/ Minimal/ Foundation/ SemanticUI/', err => {
        done()
      })
    })

    it('can grab the latest package', function(){
      return Bootstrap.getLatest()
        .then(function(x){
          expect(x).to.be.a('array')
          expect(x).to.have.length(4)
        })
    })

    it('can install Bootstrap', function(){
      return Bootstrap.install(Bootstrap.Packages[0])
        .then(function(res){
          expect(res).to.be.true
        })
    })
    it('can gather Foundation', function(){
      return Bootstrap.install(Bootstrap.Packages[1])
        .then(function(res){
          expect(res).to.be.true
        })
    })
    it('can gather SemanticUI', function(){
      return Bootstrap.install(Bootstrap.Packages[2])
        .then(function(res){
          expect(res).to.be.true
        })
    })
    it('can gather Minimal', function(){
      return Bootstrap.install(Bootstrap.Packages[3])
        .then(function(res){
          expect(res).to.be.true
        })
    })
    it('can setup skeleton files', function(){
      expect( fs.existsSync('./src/sass/styles.sass') ).to.be.true
      expect( fs.existsSync('./src/js/app.js') ).to.be.true
    })

    it('can clean up after itself', function(){
      return Bootstrap.cleanup()
        .then(function(res){
          expect(res).to.be.true
        })
    })

  })

  describe('yarn build', function(){
    it('can produce a JS bundle', function(){
      expect( fs.existsSync('./assets/js/app.js') ).to.be.true
    })
    it('can produce JS sourcemaps', function(){
      expect( fs.existsSync('./assets/js/app.js.map') ).to.be.true
    })
    it('can produce a CSS bundle', function(){
      expect( fs.existsSync('./assets/css/styles.css') ).to.be.true
    })
    it('can produce CSS sourcemaps', function(){
      expect( fs.existsSync('./assets/css/styles.css.map') ).to.be.true
    })
    it('can optimize and produce source images', function(){
      expect( fs.existsSync('./assets/img/favicon.png') ).to.be.true
    })
    it('can proudce spritesheets', function(){
      expect( fs.existsSync('./assets/img/sprite.png') ).to.be.true
      expect( fs.existsSync('./assets/img/sprite@2x.png') ).to.be.true
    })
  })

  describe('yarn dev', function(){
    it('can startup the dev server')
  })
  
})

