/* eslint-disable */
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');
// should be in mocha config

chai.use(sinonChai);

const { expect } = chai;
const { stub } = sinon;

describe('src/range-list', () => {
  let leftMost;
  let concatByIndexes;
  let RangeList;
  let sut;
  before(() => {
    leftMost = stub().returns(2);
    concatByIndexes = stub();
    removeByIndexes = stub();
    RangeList = proxyquire('./range-list', {
      '../utils/binary-search': { leftMost },
      '../utils/array': { concatByIndexes, removeByIndexes }
    });
  });
  beforeEach(() => {
    sut = new RangeList();
  })
  describe('#constructor', () => {
    it('should initialize range list with empty array of ranges', () => {
      expect(sut.ranges).to.deep.equal([]);
    });
  });
  describe('#add', () => {
    beforeEach(() => {
      leftMost.resetHistory();
      concatByIndexes.resetHistory();
    })
    it('should throw error if trying to add not array to range list', () => {
      expect(() => sut.add(1)).to.throw(
        Error, 'Range must be of type array!'
      );
    });
    it('should throw error if trying to add range of bad size', () => {
      expect(() => sut.add([1])).to.throw(
        Error, 'Range must contain two boundaries!'
      );
    });
    it('should throw error if min is bigger than max', () => {
      expect(() => sut.add([5, 1])).to.throw(
        Error, 'Max should be bigger than min in range!'
      );
    });
    it('should add range to empty array', () => {
      sut.add([1, 5]);
      expect(sut.ranges).to.deep.equal([1, 5]);
    });
    it('should get leftMost indexes for values in range', () => {
      sut.ranges = [1, 5];
      sut.add([10, 20]);
      expect(leftMost.callCount).to.equal(2);
    });
    it('should get leftMost indexes for correct values', () => {
      sut.ranges = [1, 5];
      sut.add([10, 20]);
      expect(leftMost.firstCall.args).to.deep.equal([[1, 5], 10]);
      expect(leftMost.secondCall.args).to.deep.equal([[1, 5], 20]);
    });
    it('should add range to rage list', () => {
      sut.ranges = [1, 5];
      sut.add([10, 20]);
      expect(concatByIndexes.callCount).to.equal(1);
      expect(concatByIndexes.firstCall.args)
        .to.deep.equal([[1, 5], [10, 20], 2, 2]);
    });
  });
  describe('#remove', () => {
    beforeEach(() => {
      leftMost.resetHistory();
      removeByIndexes.resetHistory();
    })
    it('should throw error if trying to remove not array to range list', () => {
      expect(() => sut.remove(1)).to.throw(
        Error, 'Range must be of type array!'
      );
    });
    it('should throw error if trying to remove range of bad size', () => {
      expect(() => sut.remove([1])).to.throw(
        Error, 'Range must contain two boundaries!'
      );
    });
    it('should throw error if min is bigger than max', () => {
      expect(() => sut.remove([5, 1])).to.throw(
        Error, 'Max should be bigger than min in range!'
      );
    });
    it('should get leftMost indexes for values in range', () => {
      sut.ranges = [1, 8, 10, 21];
      sut.remove([10, 10]);
      expect(leftMost.callCount).to.equal(2);
    });
    it('should get leftMost indexes for correct values', () => {
      sut.ranges = [1, 8, 10, 21];
      sut.remove([10, 11]);
      expect(leftMost.firstCall.args).to.deep.equal([[1, 8, 10, 21], 10]);
      expect(leftMost.secondCall.args).to.deep.equal([[1, 8, 10, 21], 11]);
    });
    it('should remove range from rage list', () => {
      sut.ranges = [1, 8, 10, 21];
      sut.remove([10, 11]);
      expect(removeByIndexes.callCount).to.equal(1);
      expect(removeByIndexes.firstCall.args)
        .to.deep.equal([[1, 8, 10, 21], [10, 11], 2, 2]);
    });
  });
  describe('#print', () => {
    let consoleStub;
    before(() => {
      consoleStub = stub(global.console, 'log');
    });
    beforeEach(() => {
      consoleStub.resetHistory();
    })
    after(() => {
      consoleStub.restore();
    });
    it('should print to console renges in correct format', () => {
      sut.ranges = [1, 8, 10, 21];
      sut.print();
      expect(consoleStub.firstCall.args)
        .to.deep.equal(['[1, 8) [10, 21)']);
    });
    it('should print to console renges in correct format', () => {
      sut.ranges = [];
      sut.print();
      expect(consoleStub.firstCall.args)
        .to.deep.equal(['']);
    });
  });
});
