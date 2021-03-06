import shouldBehaveLikeBasicStakeContract from './behaviors/ERC900BasicStakeContract.behavior'
import shouldBehaveLikeCompoundingStakeContract from './behaviors/ERC900CompoundingStakeContract.behavior'

const { BigNumber } = web3

const Erc20Token = artifacts.require('PausableTokenMock.sol')
const CompoundingStakeContract = artifacts.require('CompoundingStakeContract.sol')

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

contract('ERC900CreditsStakeContract', function (accounts) {
  const lockInDuration = 7776000
  const annualizedInterestRate = web3.toWei(0.1, 'ether')

  beforeEach(async function () {
    this.erc20Token = await Erc20Token.new()
    this.stakeContract = await CompoundingStakeContract.new(this.erc20Token.address, lockInDuration, annualizedInterestRate)

    await this.erc20Token.approve(this.stakeContract.address, web3.toWei(100, 'ether'))
  })

  shouldBehaveLikeBasicStakeContract(accounts, lockInDuration)
  shouldBehaveLikeCompoundingStakeContract(accounts, annualizedInterestRate)
})
