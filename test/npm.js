var assert = require('assert');
const npm = require('../lib/managers/npm');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('importLatest', async () => {
  it('should import latest version of a package', async () => {
    var name = '@babel/code-frame'
    var res = await npm.importLatest(db, name)
    assert.equal(res.version, '7.12.13');
    assert.equal(res.cid, 'bafkrgqa5lvbjwrbxm25eer655wiwhgek4yeibpczlwivkg3fmav6gak2guvgko5ho3vfw7y5tjo2vv53bzfkhfumoi5utanuvtrpkbqffzx6u');
  })
})

describe('importPackage', async function() {
  it('should import npm packages larger than 1mb', async () => {
    var name = '7zip-bin'
    var version = '5.0.3'
    var url = "https://registry.npmjs.org/7zip-bin/-/7zip-bin-5.0.3.tgz"

    var cid = await npm.importPackage(db, name, version, url)

    assert.equal(cid, 'bafybgqde7kfgk4ub2rcr3nyukuy3q5b35nb4bxwvgwlg42uu7cyqv2ihryzurlwt2ozhyly3auysnl4idwnt5ii3jzgul7vb5756nzxuqg2c6');
  });

  it('should import npm packages smaller than 1mb', async () => {
    var name = '@babel/code-frame'
    var version = '7.8.3'
    var url = 'https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.8.3.tgz'

    var cid = await npm.importPackage(db, name, version, url)

    assert.equal(cid, 'bafkrgqdl3ay2mz2xwwiqrhsasioueqzmozkqmbxviewshbwlhbyph7o4iw53h24c4w4kiej5vxaec5zjl652ynxfexey3pjupnkjpi5j3wbnu');
  });
})

describe('getLatestVersion', async function() {
  it('should do the thing', async () => {
    var change = {time:
      {modified:"2019-03-06T15:06:44.330Z",
      created:"2012-02-24T18:04:05.588Z",
      "0.1.0":"2012-02-24T18:04:06.916Z",
      "0.1.1":"2012-12-09T05:11:27.662Z",
      "0.1.2":"2014-07-15T21:24:45.597Z",
      "1.0.0":"2014-10-11T07:22:23.512Z",
      "1.1.0":"2015-02-23T09:52:54.646Z",
      "1.1.1":"2016-04-14T21:55:22.812Z",
      "2.0.1":"2019-03-06T15:06:40.387Z"}
    }
    var res = await npm.getLatestVersion(change)
    assert.equal(res, '2.0.1')
  })
})

describe('verify', async function() {
  it('should do the thing', async () => {
    var name = '@babel/code-frame'
    var version = '7.8.3'
    var cid = 'bafkrgqdl3ay2mz2xwwiqrhsasioueqzmozkqmbxviewshbwlhbyph7o4iw53h24c4w4kiej5vxaec5zjl652ynxfexey3pjupnkjpi5j3wbnu'
    var res = await npm.verify(db, name, version, cid)
    assert.equal(res, true)
  })
})

describe('serverHandler', async function() {
  it('respond to tarball requests', (done) => {
    var name = '@babel/code-frame'
    var version = '7.8.3'
    var path = `/${name}/-/code-frame-${version}.tgz`
    chai.request(server)
            .get(path)
            .set('user-agent', 'npm')
            .end((err, res) => {
                  chai.expect(err).to.not.exist;
                  res.should.have.status(200);
                  done()
                })
  })

  it('respond to metadata requests', (done) => {
    var name = '@babel/code-frame'
    var path = `/${name}`
    chai.request(server)
            .get(path)
            .set('user-agent', 'npm')
            .end((err, res) => {
                  chai.expect(err).to.not.exist;
                  res.should.have.status(200);
                  done()
                })
  })
})

describe('updatePackage', async function() {
  it('should do the thing', async () => {
    var name = 'base62'
    var res = await npm.updatePackage(db, name)
    assert.equal(res, true)
  })
})

describe('versionAsJson', async function() {
  it('should return a json representation of a version', async () => {
    var name = 'base62'
    var version = '2.0.1'
    var json = await npm.versionAsJson(db, name, version)

    assert.deepEqual(json, {
      manager: 'npm',
      registry: 'https://registry.npmjs.org/',
      name: 'base62',
      number: '2.0.1',
      url: "https://registry.npmjs.org/base62/-/base62-2.0.1.tgz",
      integrity: 'sha512-4t4WQK7mdbcWzqEBiq6tfo2qDCeIZGXvjifJZyxHIVcjQkZJxpFtu/pa2Va69OouCkg6izZ08hKnPxroeDyzew==',
      cid: 'bafkrgqhc3yleblxgow3rntvbagfk5ll6rwvayj4imrs67drhzftsyrzbk4ruersjy2iw3o72llmvnoxu5ixausb2rm3hj4qsu47rv2dyhszxw',
      responses: []
    })
  })
})
