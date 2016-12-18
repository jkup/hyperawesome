'use strict'

// Load modules
const Hapi = require('hapi')
const Code = require('code')
const Lab = require('lab')

// Test shortcuts
const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

// Require server file
const server = require('../lib/server')
const options = require('../lib/options')
const manifest = require('../lib/manifest')

describe('The Server', () => {
  it('GET /', (done) => {
    server.init(manifest, options, (err, server) => {
      expect(err).to.not.exist()
      expect(server).to.be.instanceof(Hapi.Server)

      server.stop(done)
    })
  })
})

