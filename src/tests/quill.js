'use strict'
var chai = require('chai')
var chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
var expect = chai.expect

describe('Quill', function(){

  describe('yarn bootstrap', function(){

    const Bootstrap = require('../../tools/feather.js')
    this.timeout(30000)

    it('can grab the latest package', function(){
      var res = Bootstrap.getLatest()
      expect(res).to.eventually.be.a('array')
      expect(res).to.eventually.have.length(4)
      return res
    })

    it('can gather Bootstrap', function(){
      //var res = 
    })
    it('can gather Foundation')
    it('can gather Minimal')
    it('can gather SymantecUi')
    it('can setup skeleton files')
    it('can clean up after itself')

  })

  describe('yarn build', function(){
    it('can produce a JS bundle')
    it('can produce JS sourcemaps')
    it('can produce a CSS bundle')
    it('can produce CSS sourcemaps')
    it('can optimize and produce source images')
    it('can proudce spritesheets')
  })

  describe('yarn dev', function(){
    it('can startup the dev server')
  })
  
})

