// import { Alchemy, Network } from 'alchemy-sdk'
import { acceptHMRUpdate, defineStore } from 'pinia'
import contractABI from '../Token.sol/SupplyChainToken.json'
// Setup: npm install alchemy-sdk
import { ethers } from 'ethers'
const contractAddress = '0x0a7A444497bA11357fEFA8a1aC10E1f2Ac0f916d'
// import contractABI from '../../MacDee.sol/MacDeeContract.json'
// const contractAddress = '0x35708b2605A08A471a80059a8D89d3E1B098FB06'
// import alchemy from '../plugins/alchemy'

import axios from 'axios'
const address = '0x9e2BB71110d724d8712B94C5Ba4C07F2E7bcD3dA'

const baseURL = `https://eth-sepolia.g.alchemy.com/v2/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv`;
// const url = `${baseURL}/getNFTMetadata/?contractAddress=${contractAddress}&tokenId=${route.params.id}`;
// const config = {
//     method: 'get',
//     url: url,
// };

export const useCryptoStore = defineStore('user', () => {
    const account = ref(null)
    const loading = ref(true)
    const nfts = ref(null)

    async function connectWallet() {
        try {
            const { ethereum } = window
            if (!ethereum) {
                alert('Must connect to MetaMask!')
                return
            }
            const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })

            console.log('Connected: ', myAccounts[0])
            account.value = myAccounts[0]

        }
        catch (error) {
            console.log(error)
        }
    }
    async function getNFTs() {
        try {
            loading.value = true;
            const { ethereum } = window
            if (!ethereum) {
                alert('Must connect to MetaMask!')
                return
            }
            // console.log(this.$config.INFURA_API_KEY)
            //const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
            //const nftjson = await alchemy.nft.getNftsForOwner(myAccounts[0]);
            //console.log(nftjson.ownedNfts[3]);
            //nfts.value = nftjson.ownedNfts;
            const url = `${baseURL}/getNFTs/?owner=${address}`;
            const config = {
                method: 'get',
                url: url,
            };
            axios(config)
                .then(response => {
                    // console.log(response['data'].ownedNfts)
                    nfts.value = response['data'].ownedNfts
                    loading.value = false;
                })
                .catch(error => console.log('error', error));
            console.log("nfts on store:", nfts.value)

        }
        catch (error) {
            console.log(error)
        }
    }
    async function mint_token(token_id: number, amount_u: number) {
        console.log('setting loader')
        //setLoader(true)
        try {
            const { ethereum } = window
            if (ethereum) {
                // create provider object from ethers library, using ethereum object injected by metamask
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()
                const TokenContract = new ethers.Contract(contractAddress, contractABI.abi, signer)


                /*
                * Execute the actual wave from your smart contract
                */
                const overrides = {
                    tokenid: token_id,
                    amount: amount_u,
                    gasLimit: 200000, // optional
                }
                const Txn = await TokenContract.normal_mint(token_id, amount_u, { gasLimit: 5000000 });
                console.log("Link to txn", "https://sepolia.etherscan.io/tx/" + Txn.hash)
                console.log('Mining...', Txn.hash)
                await Txn.wait()
                console.log('Mined -- ', Txn.hash)
            }
            else {
                console.log('Ethereum object doesn\'t exist!')
            }
        }
        catch (error) {
            //setLoader(false)
            console.log('Eroor')
            console.log(error)
        }
    }
    return {
        getNFTs,
        connectWallet,
        mint_token,
        account,
        nfts,
        loading

    }
});
// contract adress 0x35708b2605A08A471a80059a8D89d3E1B098FB06
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))
}
