/* eslint-env browser, mocha */
/* global assert */

var Reporter = require('../src/reporter')
var sinon = require('sinon')

describe('reporter', () => {
  var reporter
  var xhr
  var requests = []

  before(() => {
    xhr = sinon.useFakeXMLHttpRequest()
    xhr.onCreate = (req) => requests.push(req)
  })

  after(() => {
    xhr.restore()
  })

  beforeEach(() => {
    requests = []
    reporter = new Reporter({
      projectId: '123',
      projectKey: '456'
    })
  })

  it('is an object', () => {
    assert.instanceOf(reporter, Reporter)
  })

  it('notifies', () => {
    reporter.notify({ test: 1 })
    assert.equal(requests.length, 1)
    assert.equal(requests[0].url, 'https://api.airbrake.io/api/v3/projects/123/notices?key=456')
    assert.equal(requests[0].method, 'POST')
    assert.equal(JSON.parse(requests[0].requestBody).test, 1)
  })
})
