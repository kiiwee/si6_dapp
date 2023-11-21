// import { Alchemy, Network } from 'alchemy-sdk'
import { acceptHMRUpdate, defineStore } from "pinia";
import contractABI from "../Token.sol/SupplyChainToken.json";
// Setup: npm install alchemy-sdk
import { ethers } from "ethers";
const contractAddress = "0xffde398a3dc75b951b750e3db6dbd2a99aa2503b";
import { NFTStorage, File, Blob } from "nft.storage";
// The 'fs' builtin module on Node.js provides access to the file system
import fs from "fs";

// The 'path' module provides helpers for manipulating filesystem paths
import path from "path";
// import contractABI from '../../MacDee.sol/MacDeeContract.json'
// const contractAddress = '0x35708b2605A08A471a80059a8D89d3E1B098FB06'
// import alchemy from '../plugins/alchemy'
const NFT_STORAGE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUwZDMzNWM4QTMwNGE3MzY3Q0U0ZERGRTMwRjU0QkNCRTc1YTVlNDEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTcyNTI5MDY3OCwibmFtZSI6InNpNyJ9.GfTcnN3C_BPhh8F22HFMDn9MFk6D3rk1pS-EmlTrBgo";
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
import axios from "axios";
const address = "0x9e2BB71110d724d8712B94C5Ba4C07F2E7bcD3dA";

const baseURL = `https://eth-sepolia.g.alchemy.com/v2/1e3k-TtozfGSz3WflkBQZQVauAp1WYFv`;
// const url = `${baseURL}/getNFTMetadata/?contractAddress=${contractAddress}&tokenId=${route.params.id}`;
// const config = {
//     method: 'get',
//     url: url,
// };

// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getExampleImage() {
    const imageOriginUrl =
        "https://img.zolaprod.babsta.net/lti3zL6JeH7hOgHqjXQwnQiOE7M=/fit-in/1700x1700/244c47fd4bd54f37b2312bf1a5265c75";
    const r = await useFetch(imageOriginUrl, { mode: "no-cors" });
    if (!r.ok) {
        throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
    }
    return r.blob();
}

export const useCryptoStore = defineStore("user", () => {
    const account = ref(null);
    const loading = ref(true);
    const nfts = ref(null);

    async function connectWallet() {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Must connect to MetaMask!");
                return;
            }
            const myAccounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected: ", myAccounts[0]);
            account.value = myAccounts[0];
        } catch (error) {
            console.log(error);
        }
    }

    async function getNFTs() {
        try {
            loading.value = true;
            const { ethereum } = window;
            if (!ethereum) {
                alert("Must connect to MetaMask!");
                return;
            }
            // console.log(this.$config.INFURA_API_KEY)
            //const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
            //const nftjson = await alchemy.nft.getNftsForOwner(myAccounts[0]);
            //console.log(nftjson.ownedNfts[3]);
            //nfts.value = nftjson.ownedNfts;
            const url = `${baseURL}/getNFTs/?owner=${address}&contractAddresses[]=0xffde398a3dc75b951b750e3db6dbd2a99aa2503b&withMetadata=true`;
            const config = {
                method: "get",
                url: url,
            };
            axios(config)
                .then((response) => {
                    // console.log(response['data'].ownedNfts)
                    nfts.value = response["data"].ownedNfts;
                    loading.value = false;
                })
                .catch((error) => console.log("error", error));
            console.log("nfts on store:", nfts.value);
        } catch (error) {
            console.log(error);
        }
    }
    async function getNFTsByContract() {
        try {
            loading.value = true;
            const { ethereum } = window;
            if (!ethereum) {
                alert("Must connect to MetaMask!");
                return;
            }
            // console.log(this.$config.INFURA_API_KEY)
            //const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
            //const nftjson = await alchemy.nft.getNftsForOwner(myAccounts[0]);
            //console.log(nftjson.ownedNfts[3]);
            //nfts.value = nftjson.ownedNfts;
            const url = `${baseURL}/getNFTsForContract?contractAddress=0xffde398a3dc75b951b750e3db6dbd2a99aa2503b&withMetadata=true`;
            const config = {
                method: "get",
                url: url,
            };
            axios(config)
                .then((response) => {
                    // console.log(response['data'].ownedNfts)
                    nfts.value = response["data"];
                    loading.value = false;
                })
                .catch((error) => console.log("error", error));
            console.log("nfts on store:", nfts.value);
        } catch (error) {
            console.log(error);
        }
    }
    async function mintAsset(assetInfo: {}) {
        // const image = await getExampleImage()
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TokenContract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
            signer
        );

        try {
            const { ethereum } = window;
            if (ethereum) {
                const ammount_to_mint: number = assetInfo.quantitiy;
                const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

                const metadata = await client.store({
                    "name": assetInfo.name,
                    "description": assetInfo.desc,
                    "image": new File(["<DATA>"], "../public/pinpie.png", {
                        type: "image/jpg",
                    }),
                    "quantity": assetInfo.quantitiy,
                    "supplier_name": assetInfo.supplier_name,
                    "country_origin": assetInfo.country_origin,
                    "properties": {
                        size: [{
                            "size_l": assetInfo.size.size_w,

                        }, 
                        {
                            "size_l": assetInfo.size.size_l,
                        },
                        { "size_h": assetInfo.size.size_h, }],

                    }
                });
                console.log("NFT data stored!");
                console.log("Metadata URI: ", metadata.url);
                console.log(ammount_to_mint);
                const Txn = await TokenContract.mint_Assets(
                    ammount_to_mint,
                    metadata.url,
                    { gasLimit: 5000000 }
                );
                console.log(
                    "Link to txn",
                    "https://sepolia.etherscan.io/tx/" + Txn.hash
                );
                console.log("Mining...", Txn.hash);
                await Txn.wait();
                console.log("Mined -- ", Txn.hash);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }

    async function mint_with_uri(
        tokenid: number,
        ammout_u: number,
        name: string
    ) {
        console.log("setting loader");
        //setLoader(true)
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const TokenContract = new ethers.Contract(
                    contractAddress,
                    contractABI.abi,
                    signer
                );

                /*
                 * Execute the actual wave from your smart contract
                 */
                const overrides = {
                    tokenid: tokenid,
                    amount: ammout_u,
                    gasLimit: 200000, // optional
                };

                const metadata = await client.store({
                    name: name,
                    description: "Final Product of the company",
                    image: new File(["<DATA>"], "../public/pinpie.png", {
                        type: "image/jpg",
                    }),
                    properties: {
                        supplier1: "Custom data can appear here, files are auto uploaded.",
                        supplier2: "Custom data can appear here, files are auto uploaded.",
                    },
                });
                console.log(metadata.url);
                const Txn = await TokenContract.uri_set_mint(
                    tokenid,
                    ammout_u,
                    metadata.url,
                    { gasLimit: 5000000 }
                );
                console.log(
                    "Link to txn",
                    "https://sepolia.etherscan.io/tx/" + Txn.hash
                );
                console.log("Mining...", Txn.hash);
                await Txn.wait();
                console.log("Mined -- ", Txn.hash);
                /*
                 * Execute the actual wave from your smart contract
                 */
                // const overrides = {
                //     tokenid: token_id,
                //     amount: amount_u,
                //     gasLimit: 200000, // optional
                // }
                // const Txn = await TokenContract.normal_mint(token_id, amount_u, { gasLimit: 5000000 });
                // console.log("Link to txn", "https://sepolia.etherscan.io/tx/" + Txn.hash)
                // console.log('Mining...', Txn.hash)
                // await Txn.wait()
                // console.log('Mined -- ', Txn.hash)
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }
    async function mint_Semi(token_ids: Array, amount_u: Array) {
        console.log("setting loader");
        //setLoader(true)
        try {
            const { ethereum } = window;
            if (ethereum) {
                 const ammount_to_mint: number = assetInfo.quantitiy;
                const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

                const metadata = await client.store({
                    "name": assetInfo.name,
                    "description": assetInfo.desc,
                    "image": new File(["<DATA>"], "../public/pinpie.png", {
                        type: "image/jpg",
                    }),
                    "quantity": assetInfo.quantitiy,
                    "supplier_name": assetInfo.supplier_name,
                    "country_origin": assetInfo.country_origin,
                    "properties": {
                        size: [{
                            "size_l": assetInfo.size.size_w,

                        }, 
                        {
                            "size_l": assetInfo.size.size_l,
                        },
                        { "size_h": assetInfo.size.size_h, }],

                    }
                });
                console.log("NFT data stored!");
                console.log("Metadata URI: ", metadata.url);
                console.log(ammount_to_mint);
                const Txn = await TokenContract.mint_Assets(
                    ammount_to_mint,
                    metadata.url,
                    { gasLimit: 5000000 }
                );
                console.log(
                    "Link to txn",
                    "https://sepolia.etherscan.io/tx/" + Txn.hash
                );
                console.log("Mining...", Txn.hash);
                await Txn.wait();
                console.log("Mined -- ", Txn.hash);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }
    async function mint_token(token_id: number, amount_u: number) {
        console.log("setting loader");
        //setLoader(true)
        try {
            const { ethereum } = window;
            if (ethereum) {
                // create provider object from ethers library, using ethereum object injected by metamask
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const TokenContract = new ethers.Contract(
                    contractAddress,
                    contractABI.abi,
                    signer
                );

                /*
                 * Execute the actual wave from your smart contract
                 */
                const overrides = {
                    tokenid: token_id,
                    amount: amount_u,
                    gasLimit: 200000, // optional
                };
                const Txn = await TokenContract.normal_mint(token_id, amount_u, {
                    gasLimit: 5000000,
                });
                console.log(
                    "Link to txn",
                    "https://sepolia.etherscan.io/tx/" + Txn.hash
                );
                console.log("Mining...", Txn.hash);
                await Txn.wait();
                console.log("Mined -- ", Txn.hash);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            //setLoader(false)
            console.log("Eroor");
            console.log(error);
        }
    }
    return {
        getNFTs,
        connectWallet,
        mint_token,
        mint_with_uri,
        getNFTsByContract,
        mintAsset,
        account,
        nfts,
        loading,
    };
});
// contract adress 0x35708b2605A08A471a80059a8D89d3E1B098FB06
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot));
}
