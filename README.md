# mitum-js-util

'mitum-js-util' will introduce the usage of [mitum-currency](https://github.com/ProtoconNet/mitum-currency) and [mitum-data-blocksign](https://github.com/ProtoconNet/mitum-data-blocksign) for Javascript.

## Installation

Recommended requirements for 'mitum-js-util' are,

* node v12.22.1 or later
* npm v6.14.12 or later

```sh
$ node --version
v10.19.0

$ npm --version
6.14.4
```
Notice: the package name of 'mitum-js-util' is 'mitumc'.

```sh
$ npm install mitumc
added 74 packages, and audited 75 packages in 23s
```

## Generate New Keypairs

'mitumc' supports to generate btc, ether, stellar keypairs for mitum-currency.

### Methods 

There are two methods to generate keypairs. getKeypair and toKeypair.

```js
getKeypair('btc') // generate btc keypair
getKeypair('ether') // generate ether keypair
gerKeypair('stellar') // generate stellar keypair

// generate keypair from hinted key; hint example: btc-priv-v0.0.1, ether-priv-v0.0.1, stellar-priv-v0.0.1
// version of hint (for example, v0.0.1) is up to mitum or mitum-currency
toKeypair($hintedKey, '')

// generate keypair from raw key(key without hint)
toKeypair($rawKey, 'btc')
toKeypair($rawKey, 'ether')
toKeypair($rawKey, 'stellar')
```

#### Usage

```js
import mitumc from 'mitumc';

const btckp = mitumc.getKeypair('btc'); // returns BTCKeyPair
const ethkp = mitumc.getKeypair('ether'); // returns ETHKeyPair
const stlkp = mitumc.getKeypair('stellar'); // returns StellarKeyPair

btckp.getPrivateKey(); // 'KxZSDTbRvDCYtfaDcPcf2e97YuGPUA1Ag169WEa9TT5L9zvGUb2n:btc-priv-v0.0.1'
btckp.getPublicKey(); // '29TcoNh2yFmrZm5V8x5JL5f7wKvFs5mgxSZqTPAVpvksN:btc-pub-v0.0.1'

ethkp.getPrivateKey(); // '609b6a6f4e1d276affceb7a958c9c97c65fbe9aad179471db3eb7165b5bf3ee9:ether-priv-v0.0.1'
ethkp.getPublicKey(); // '047b83ef60db6236413d12e09c5bb6d652beee9e3777ca17fa7b19a3dca1e3cc3989389f98762b9b3530c63d6d2809ef3d3188777844ebbf71ed3251fa83a9c905:ether-pub-v0.0.1'

stlkp.getPrivateKey(); // 'SCJXZLP3DF64BHYW7WDKUVEBSJKLWB4SQ7Z7GIRYKDX56HADHMCCBISZ:stellar-priv-v0.0.1'
stlkp.getPublicKey(); // 'GBQ5GDMNMB6LXIM5VT2BKTNL7WPYGZXX2R2ULLLNKFXMPGHMHZSSWYYR:stellar-pub-v0.0.1'
```

Note that 'mitumc.getKeypair()' and 'mitumc.toKeypair()' provides compressed btc key - aka compressed wif.

Of course, you can get any keypair with your known private key by using 'toKeypair'.

Note that it works with either hintless or hinted keys to generate keypairs. (key-hint ex. btc-priv, ether-pub, etc...) 

```js
import mitumc from 'mitumc';

// both work same
const btckp = mitumc.toKeypair("L2ddEkdgYVBkhtdN8HVXLZk5eAcdqXxecd17FDTobVeFfZNPk2ZD:btc-priv-v0.0.1", '');
const btckp2 = mitumc.toKeypair("L2ddEkdgYVBkhtdN8HVXLZk5eAcdqXxecd17FDTobVeFfZNPk2ZD", 'btc'); // returns BTCKeyPair

const ethkp = mitumc.toKeypair("013e56aca7cf88d95aa6535fb6c66f366d449a0380128e0eb656a863b45a5ad5:ether-priv-v0.0.1", ''); // returns ETHKeyPair
const stlkp = mitumc.toKeypair("SBZV72AJVXGARRY6BYXF5IPNQYWMGZJ5YVF6NIENEEATETDF6LGH4CLL:stellar-priv-v0.0.1", ''); // returns StellarKeyPair
```

## Generate New Operation

### Operations

'mitum-js-util' provides three operations of 'mitum-currency',

* 'Create-Accounts' creates an account corresponding to any public key with a pre-registered account.
* 'Key-Updater' updates the public key of the account to something else.
* 'Transfers' transfers tokens from the account to another account.

'mitum-currency' supports various kinds of operations, but 'mitum-js-util' will provide these frequently used operations.

In addition, 'mitum-js-util' provides three operations of 'mitum-data-blocksign',

* 'Create-Documents' creates an document with filehash.
* 'Sign-Documents' signs the document.
* 'Transfer-Documents' transfers documents from the account to another account.

### Prerequisite

Before generating new operation, you should check below,

* 'private key' of source account to generate signatures (a.k.a signing key)
* 'public address' of source account
* 'public key' of target account
* 'network id'

Additionally, you should check below for 'mitum-data-blocksign',

* 'filehash' for Create-Documents
* 'owner' and 'documentid' for Sign-Documents and Transfer-Documents

Notice that the package name of 'mitum-js-util' is 'mitumc' for js codes.

* Every key, address, and keypair must be that of mitum-currency.

### Generator

'mitumc' package provides 'Generator' class to generate operations.

Modules that 'Generator' supports are,

```js
Generator.setNetworkID(netID)
Generator.formatKey(key, weight)
Generator.formatAmount(big, cid)
Generator.createKeys(keys, threshold)
Generator.createAmounts(amounts) 
Generator.createCreateAccountsItem(keys_o, amounts)
Generator.createTransfersItem(receiver, amounts)
Generator.createCreateDocumentsItem(fileHash, did, signcode, title, size, cid, signers, signcodes)
Generator.createSignDocumentsItem(owner, did, cid)
Generator.createTransferDocumentsItem(owner, receiver, did, cid)
Generator.createCreateAccountsFact(sender, items)
Generator.createKeyUpdaterFact(target, cid, keys_o)
Generator.createTransfersFact(sender, items)
Generator.createBlockSignFact(factType, sender, items)
Generator.createOperation(fact, memo)
Generator.createSeal(signKey, operations)

Generator.id
netID
```

You can check use-cases of Generator in the next part.

__! If you want to get keypair for mitumc, go 'Generate New Keypairs' first. !__

### Generate Create-Accounts 

For new account, 'currency id' and 'initial amount' must be set. With source account, you can create and register new account of target public key.

Note that source account must be already registered one.

When you use 'Generator', you must set 'network id' before you create something.

#### Usage

```js
import mitumc from 'mitumc';

/* const generator = new mitumc.Generator({networkId});
 * const generator = new mitumc.Generator(//anything//); generator.setNetworkId();
 */
const generator = new mitumc.Generator('mitum'); 

const sourcePriv = "SAZ4AMZV62FTWULIYLAH2PLR6LY7JVWAI4SOIFRHQLMNQ2W4NKMWDPL3:stellar-priv-v0.0.1"; // sender's private key
const sourceAddr = "6d1pvkKLurRPovsKuQ6X75r7gX5GYHzrWpzpgyyYe6xi:mca-v0.0.1";                      // sender's account address
const targetPub = "caRF1K6yCpaBh25hCS3czckjTjaRBpjvVsZn3qKWGzPC:btc-pub-v0.0.1";                   // public key of the account to newly create

const key = generator.formatKey(targetPub, 100);
const keys = generator.createKeys([key], 100);

/* If you want to get address of keys, use 'Keys.address'.
 * 
 * keys = generator.createKeys([key], 100);
 * keys.address;
 */

const amount = generator.formatAmount(100, "MCC");
const amounts = generator.createAmounts([amount]);

const createAccountsItem = generator.createCreateAccountsItem(keys, amounts);
const createAccountsFact = generator.createCreateAccountsFact(sourceAddr, [createAccountsItem]);
const createAccounts = generator.createOperation(createAccountsFact, "");

createAccounts.addSign(sourcePriv);
```

You must add new fact signature by addSign before creating seal or json files from an operation.

Then Operation.dict() methods work correctly.

```js
createAccounts.dict();
{
  memo: '',
  _hint: 'mitum-currency-create-accounts-operation-v0.0.1',
  fact: {
    _hint: 'mitum-currency-create-accounts-operation-fact-v0.0.1',
    hash: '7tQBLVfEUMsuoCQMJ9vrX673iM95zS8VNA2EgpPZ5EMx',
    token: 'MjAyMS0wOS0xNVQwMjo0MDowNy42ODJa',
    sender: '6d1pvkKLurRPovsKuQ6X75r7gX5GYHzrWpzpgyyYe6xi:mca-v0.0.1',
    items: [ [Object] ]
  },
  hash: 'ENpvX6mJyQSnRpaugCtFqdr5msSGe6ie54SiBTP37Lyw',
  fact_signs: [
    {
      _hint: 'base-fact-sign-v0.0.1',
      signer: 'GCSFDZ63ZGFWHN3M4XNAZKPLKWEEW32BMTM3KSVK4IFY7JCUVNF6GPNH:stellar-pub-v0.0.1',
      signature: '5pLigmGZvTZciRUmkhxTCAAbn9uBGvb1B5JPHUCFTXfu24HFrUxAvFmnRVTUTvJ8BTenpyg7W9NfrYsmSe3iFshw',
      signed_at: '2021-09-15T02:40:07.733Z'
    }
  ]
}
```

### Generate Key-Updater

Key-Updater literally supports to update source public key to something else.

#### Usage

```js
import mitumc from 'mitumc';

const generator = new mitumc.Generator('mitum'); // new mitumc.Generator({networkId})

const sourcePriv = "SAZ4AMZV62FTWULIYLAH2PLR6LY7JVWAI4SOIFRHQLMNQ2W4NKMWDPL3:stellar-priv-v0.0.1";
const toPub = "0422a860ed96a917c41d95b50d61e0d34fb0f7aa1f0b47dca5dc2ad9b7514497aa94ad8e62f3b1a9e877fee95075b7003f8c432b37eb90f2f01ed1cee4f31879ae:ether-pub-v0.0.1";
const fromAddr = "G6mRkczkChCfGEV9qT8h9V3TeUdagxSpbN4KMuC2LtoV:mca-v0.0.1";

const key = generator.formatKey(toPub, 100);
const keys = generator.createKeys([key], 100);

const keyUpdaterFact = generator.createKeyUpdaterFact(fromAddr, "MCC", keys);
const keyUpdater = generator.createOperation(keyUpdaterFact, "");

keyUpdater.addSign(source_priv);
```

### Generate Transfers

To generate an operation, you must prepare target address, not public key. Transfers supports to send tokens to another account.

#### Usage

```js
import mitumc from 'mitumc';

const generator = new mitumc.Generator('mitum'); // new mitumc.Generator({networkId})

const sourcePriv = "L4qMcVKwQkqrnPPtEhj8idCQyvCN2zyG374i5oftGQfraJEP8iek:btc-priv-v0.0.1";
const targetAddr = "GYJMxzXsgUbhayJvG34HAVT6288EYEkUxdyghDhjibtv:mca-v0.0.1";

const amount = generator.formatAmount(100, "MCC");
const amounts = generator.createAmounts([amount]);

const transfersItem = generator.createTransfersItem(targetAddr, amounts);
const transfersFact = generator.createTransfersFact(sourceAddr, [transfersItem]);
const transfers = generator.createOperation(transfersFact, "");

transfers.addSign(source_priv);
```

### Generate Create-Documents

To generate an operation, you must prepare file-hash. Create-Document supports to create documents with setting signers who must sign them.

#### Usage

```js
import mitumc from 'mitumc';

const generator = new mitumc.Generator('mitum'); // new mitumc.Generator({networkId})

const sourcePriv = "SAZ4AMZV62FTWULIYLAH2PLR6LY7JVWAI4SOIFRHQLMNQ2W4NKMWDPL3:stellar-priv-v0.0.1";
const sourceAddr = "6d1pvkKLurRPovsKuQ6X75r7gX5GYHzrWpzpgyyYe6xi:mca-v0.0.1";
const signer = "3GFpucWfTjHFaseG4X6X83qEugtci7bzyxcE1xgRUqpQ:mca-v0.0.1";

const createDocumentsItem = generator.createCreateDocumentsItem("abcdabc:mbfh-v0.0.1", 150, "user01", "title150", 1234, "MCC", [signer], ["user02"]);

const createDocumentsFact = generator.createBlockSignFact(generator.BLOCKSIGN_CREATE_DOCUMENTS, sourceAddr, [createDocumentsItem])

const createDocuments = generator.createOperation(createDocumentsFact, "");

createDocuments.addSign(sourcePriv);
```

### Generate Sign-Documents

To generate an operation, you must prepare owner and document id. Sign-Document supports to sign documents registered by 'mitum-data-blocksign'

#### Usage

```js
import mitumc from 'mitumc';

const generator = new mitumc.Generator('mitum'); // new mitumc.Generator({networkId})

const owner = "6d1pvkKLurRPovsKuQ6X75r7gX5GYHzrWpzpgyyYe6xi:mca-v0.0.1";

const senderPriv = "SDASY3GHXQUUJGPVMGB6PVPJYQZA5VGNY7PKG3O3OIVJ5AOTGR7CDWCS:stellar-priv-v0.0.1";
const senderAddr = "3GFpucWfTjHFaseG4X6X83qEugtci7bzyxcE1xgRUqpQ:mca-v0.0.1";

const signDocumentsItem = generator.createSignDocumentsItem(owner, 1, "MCC");

const signDocumentsFact = generator.createBlockSignFact(generator.BLOCKSIGN_SIGN_DOCUMENTS, senderAddr, [signDocumentsItem]);

const SignDocuments = generator.createOperation(signDocumentsFact, "");

SignDocuments.addSign(senderPriv);
```

### ~~Generate Transfer-Documents~~

<u>This operation is not supported anymore.</u>

~~To generate an operation, you must prepare owner and document id. Transfer-Document supports to transfer documents to other account.~~

#### Usage

```js
import mitumc from 'mitumc';

const generator = new mitumc.Generator('mitum'); // new mitumc.Generator({networkId})

const sourcePriv = "SAZ4AMZV62FTWULIYLAH2PLR6LY7JVWAI4SOIFRHQLMNQ2W4NKMWDPL3:stellar-priv-v0.0.1";
const sourceAddr = "6d1pvkKLurRPovsKuQ6X75r7gX5GYHzrWpzpgyyYe6xi:mca-v0.0.1";
const targetAddr = "3GFpucWfTjHFaseG4X6X83qEugtci7bzyxcE1xgRUqpQ:mca-v0.0.1";

const transferDocumentsItem = generator.createTransferDocumentsItem(sourceAddr, targetAddr, 1, "MCC");

const transferDocumentsFact = generator.createBlockSignFact(generator.BLOCKSIGN_TRANSFER_DOCUMENTS, sourceAddr, [transferDocumentsItem]);

const transferDocuments = generator.createOperation(transferDocumentsFact, "");

transferDocuments.addSign(sourcePriv);
```

## Generate New Seal

Supports you to generate a seal json file such that the seal is able to consist of several operations. Those operations can be any type 'mitum-js-util' provides.

### Prerequisite

To generate a seal, 'mitum-js-util' requires,

* 'signing key'
* 'a list of pre-constructed operations' not empty

Registration of 'signing key' as the private key for an account is not neccessary.

### JSONParser

You can create a json file from generated seal object without 'JSONParser' class provided by 'mitumc'. However, I recommend to use 'JSONParser' for convenience.

Modules that 'JSONParser' supports are,

```js
JSONParser.toJSONString(seal)
JSONParser.generateFile(seal, fName)
```

A use-case of 'JSONParser' will be introduced in the next part.

### Usage

First of all, suppose that every operation is that generated by 'Generator'. (createAccounts, keyUpdater, Transfers)

### Example

```js
import mitumc from 'mitumc';

const generator = new mitumc.Generator('mitum'); // new mitumc.Generator({networkId})
const parser = mitumc.JSONParser;

// ... omitted
// Create each operation [createAccounts, keyUpdater, transfers] with generator.
// See above sections.
// ...

const signer = "SAZ4AMZV62FTWULIYLAH2PLR6LY7JVWAI4SOIFRHQLMNQ2W4NKMWDPL3:stellar-priv-v0.0.1";

const operations = [createAccounts];
const seal = generator.createSeal(signer, operations);

parser.toJSONString(seal);
parser.generateFile(seal, 'seal.json');
```

Then the result format of generateFile() will be like [this](example/seal.json). (Each value is up to input arguments and time)

If you would like to create json file of an operation(not seal), use JSONParser.generateFile(Operation.dict(), 'filename.json').

Don't use Operation class to generateFile directly. You must transform Operation instance to dictionary variable by Operation.dict() before use generateFile().

## Send Seal to Network

Created seal json files will be used to send seals by 'mitum-currency'.

Use below command to send them to the target network. (See [mitum-currency](https://github.com/ProtoconNet/mitum-currency) for details)

```sh
$ ./mc seal send --network-id=$NETWORK_ID $SIGNING_KEY --seal=seal.json
```

* seal.json is your seal file.

## Sign Message

Sign message with btc, ether, stellar keypair.

'mitumc' supports 'generate' and 'get' keypairs. You can get signature digest which contains a signature by signing with keypairs.

### Usage

#### Sign Message

Each keypair supports 'sign' method that generates Buffer format signature by signing Buffer format message.

If you want to get signature for 'mitum-currency', use 'bs58' to encode the signature.

```js
import mitumc from 'mitumc';
import bs58 from 'bs58';

const msg = Buffer.from('mitum');

const btckp = mitumc.getKeypair('btc');
const sign = btckp.sign(msg) // <Buffer 30 45 02 21 00 9f 21 a9 5d 98 12 60 20 46 0d 0f 2f 48 ab 88 02 21 21 40 6c f2 24 01 32 87 24 3c 06 a2 a2 da 33 02 20 3b a1 43 c0 a0 c1 6b bf 02 c5 95 ... >

bs58.encode(sign); // 'AN1rKvtAFuz64U5jEK6FRpxoiLCiGWAjoX3R6NYPQE3WJfpTj9ye9vAyAV3yaGSeangJE1GK8U2eNLSFo2siKq2Zc2CXXUiVE'
```

Omit ether/stellar keypair sign. (bcz same...)

## Add Fact Signature to Operation

With 'Signer' object in 'mitum-js-util', you can add new fact signature to operation json.

To add signatures, you must prepare 'network id' and 'signing key'.

### Usage

For example, suppose that you already have an implemented operation json file like below.

operation.json
```json
{
    "memo": "",
    "_hint": "mitum-currency-create-accounts-operation-v0.0.1",
    "fact": {
        "_hint": "mitum-currency-create-accounts-operation-fact-v0.0.1",
        "hash": "A8z3Ybc4jTLFpfT7AN7Bo25peRQryeAjyZL3Q6EiUw2Q",
        "token": "MjAyMS0wNi0zMFQwNTowMjo1Ny4xNDha",
        "sender": "EbVibuKTyPqRVRcCpMRQdP7wBkr33GW2brSQvZQNJDSn:mca-v0.0.1",
        "items": [
            {
                "_hint": "mitum-currency-create-accounts-single-amount-v0.0.1",
                "keys": {
                    "_hint": "mitum-currency-keys-v0.0.1",
                    "hash": "6yvRQ8mebL9HkArU5ZfgfNwahfcJF2rRecN5m47hv44r",
                    "keys": [
                        {
                            "_hint": "mitum-currency-key-v0.0.1",
                            "weight": 100,
                            "key": "GBLMKGDYI6WICGZOM5XGMEMZJSQZQQKPYD7TPLFVTSHLGNA3CKU5Z27G:stellar-pub-v0.0.1"
                        }
                    ],
                    "threshold": 100
                },
                "amounts": [
                    {
                        "_hint": "mitum-currency-amount-v0.0.1",
                        "amount": "100",
                        "currency": "MCC"
                    }
                ]
            }
        ]
    },
    "hash": "4ZBBYutmuG7XRMbvxfUDeWvVKxu2qSPukGiBwthQZeb1",
    "fact_signs": [
        {
            "_hint": "base-fact-sign-v0.0.1",
            "signer": "cnMJqt1Q7LXKqFAWprm6FBC7fRbWQeZhrymTavN11PKJ:btc-pub-v0.0.1",
            "signature": "381yXZAhzmRES8bssPkA2Pdy95NP1EDvEnNNwj1btcrdCgMLNRnWVpuqQgGLJwXsW4sjjZB7Ek9W4KmxZBSh1D47m4j93PQm",
            "signed_at": "2021-06-30T05:02:57.212Z"
        }
    ]
}
```

#### Sign Operation

Use 'Signer.signOperation(#operation-file-path)' to add new fact signature to "fact_signs" key.

After adding a fact signature, operation hash is always changed.

```js
import mitumc from 'mitumc';

const signer = new Signer('mitum', "L4qMcVKwQkqrnPPtEhj8idCQyvCN2zyG374i5oftGQfraJEP8iek:btc-priv-v0.0.1");

/* Signer.signOperation(#target) */
/* #target must be a dictionary style object or the path of opertaion json file */
const newOperation = signer.signOperation('operation.json'); // or an object itself instead of the path 'operation.json'
```

After signing, above operation must be like below.(Each value is up to input arguments and time)

```json
{
    "memo": "",
    "_hint": "mitum-currency-create-accounts-operation-v0.0.1",
    "fact": {
        "_hint": "mitum-currency-create-accounts-operation-fact-v0.0.1",
        "hash": "A8z3Ybc4jTLFpfT7AN7Bo25peRQryeAjyZL3Q6EiUw2Q",
        "token": "MjAyMS0wNi0zMFQwNTowMjo1Ny4xNDha",
        "sender": "EbVibuKTyPqRVRcCpMRQdP7wBkr33GW2brSQvZQNJDSn:mca-v0.0.1",
        "items": [
            {
                "_hint": "mitum-currency-create-accounts-single-amount-v0.0.1",
                "keys": {
                    "_hint": "mitum-currency-keys-v0.0.1",
                    "hash": "6yvRQ8mebL9HkArU5ZfgfNwahfcJF2rRecN5m47hv44r",
                    "keys": [
                        {
                            "_hint": "mitum-currency-key-v0.0.1",
                            "weight": 100,
                            "key": "GBLMKGDYI6WICGZOM5XGMEMZJSQZQQKPYD7TPLFVTSHLGNA3CKU5Z27G:stellar-pub-v0.0.1"
                        }
                    ],
                    "threshold": 100
                },
                "amounts": [
                    {
                        "_hint": "mitum-currency-amount-v0.0.1",
                        "amount": "100",
                        "currency": "MCC"
                    }
                ]
            }
        ]
    },
    "fact_signs": [
        {
            "_hint": "base-fact-sign-v0.0.1",
            "signer": "cnMJqt1Q7LXKqFAWprm6FBC7fRbWQeZhrymTavN11PKJ:btc-pub-v0.0.1",
            "signature": "381yXZAhzmRES8bssPkA2Pdy95NP1EDvEnNNwj1btcrdCgMLNRnWVpuqQgGLJwXsW4sjjZB7Ek9W4KmxZBSh1D47m4j93PQm",
            "signed_at": "2021-06-30T05:02:57.212Z"
        },
        {
            "_hint": "base-fact-sign-v0.0.1",
            "signer": "cnMJqt1Q7LXKqFAWprm6FBC7fRbWQeZhrymTavN11PKJ:btc-pub-v0.0.1",
            "signature": "381yXZETg1xjq1dLJPV8ZVBnr8i62mF6Hg3MirYLYRX6bUw1evk2bCf5NaMUkav8G92AjRv6zfTi7zmvEjwW9r7bRwNa5219",
            "signed_at": "2021-07-02T08:13:31.825Z"
        }
    ],
    "hash": "FJCtuUm9v9YMbkER738ZzPpy1iGuTgabnaaxm5R9jHaV"
}
```

Signer class doesn't create json file of new operation.

Use 'JSONParser' if you need.
