/*
    mitum-js-util SDK for mitum-currency, mitum-document
    Copyright (C) 2021-2022 ProtoconNet

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// sdk module; util
const { parseTyped, sha256, sum256 } = require('../util');

// sdk class; key
const { BaseKey } = require('./base');

// hint
const { PRIVATE_KEY, PUBLIC_KEY } = require('../hint');

// base58 package
const bs58 = require('bs58');
const bs58check = require('bs58check');

// crypto package
const ecCrypto = require('eccrypto-js');
const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');

// crypto package; random values
const crypto = require('crypto').webcrypto;
const getRandomValues = require('get-random-values');


class Keypair {

    constructor(seed, useSeed) {
        if (!useSeed) {
            const parsed = parseTyped(seed);
            const type = parsed.type;
            const key = parsed.raw;

            if (type !== PRIVATE_KEY || key.length !== 52) {
                throw '[ERROR] Not a private key!';
            }

            this.seed = null;
            this.privKey = new BaseKey(key, type);
        }
        else {
            if (seed.length < 36) {
                throw '[ERROR] Too short seed < 36 length!';
            }

            this.seed = seed;
            this.privKey = null;
        }

        this._generatePrivateKey();
        this._generatePublicKey();
    }

    /**
     * @returns {string} Typed private key
     */
    getPrivateKey() {
        return this.privKey.typed();
    }

    /**
     * @returns {string} Typed public key 
     */
    getPublicKey() {
        return this.pubKey.typed();
    }

    /**
     * @returns {string} Raw private key
     */
    getRawPrivateKey() {
        return this.privKey.key;
    }

    /**
     * @returns {string} Raw public key 
     */
    getRawPublicKey() {
        return this.pubKey.key;
    }

    /**
     * Signs the target message and returns signature digest.
     * @param {string} msg Target message to sign 
     * @returns {Buffer} Signature digest
     */
    sign(msg) {
        const _msg = sha256(sha256(msg));
        const sk = this.keypair.getPrivate('hex');

        return Buffer.from(ec.sign(_msg, sk, 'hex', { canonical: true }).toDER());
    }

    _generatePublicKey() {
        const _sk = bs58check.decode(this.privKey.key);
        const _decode = Buffer.from(_sk.slice(1, _sk.length - 1));

        this.keypair = ec.keyFromPrivate(_decode);
        this.pubKey = new BaseKey(bs58.encode(ecCrypto.getPublicCompressed(_decode)), PUBLIC_KEY);
    }

    _generatePrivateKey() {
        if (this.privKey) {
            return;
        }

        this.privKey = new BaseKey(generatePrivateKeyFromBuffer(Buffer.from(this.seed)), "unknown");
    }
};


const encodeKey = (key) => {
    const _pk = Buffer.from(
        '80' + key + '01', 'hex');

    let _hs = sha256(_pk);
    _hs = sha256(_hs);

    const checksum = Buffer.from(_hs.subarray(0, 4));

    return bs58.encode(
        Buffer.concat([_pk, checksum])
    );
}

const generatePrivateKeyFromBuffer = (buf) => {
    const sh = sum256(buf);
    const shb = Buffer.from(bs58.encode(sh));

    const genKey = (encodedSeed) => {
        encodedSeed = encodedSeed.slice(0, shb.length - 4);

        function bufToBn(buf) {
            var hex = [];
            var u8 = Uint8Array.from(buf);

            u8.forEach(function (i) {
                var h = i.toString(16);
                if (h.length % 2) { h = '0' + h; }
                hex.push(h);
            });

            return BigInt('0x' + hex.join(''));
        }

        let k = bufToBn(encodedSeed);

        const N = BigInt(ec.n) - BigInt(1);
        k = k % N;

        k = k + BigInt(1);
        return Buffer.from(k.toString(16))
    };

    return encodeKey(genKey(shb)) + PRIVATE_KEY;
}

/**
 * Returns new keypair.
 * @returns {Keypair} Keypair
 */
const getNewKeypair = () => {
    const seed = new Uint8Array(32);
    crypto ? crypto.getRandomValues(seed) : getRandomValues(seed);
    return getKeypairFromPrivateKey(generatePrivateKeyFromBuffer(Buffer.from(seed)));
}

/**
 * Returns new keypair from string seed.
 * The length of seed should be longer than or equal to 36.
 * @param {string} seed Seed to generate Keypair (len(seed) >= 36) 
 * @returns {Keypair} Keypair from seed
 */
const getKeypairFromSeed = (seed) => {
    return new Keypair(seed, true);
}

/**
 * Returns new keypair from private key.
 * Private key should be a mitum key with type suffix (mpr).
 * @param {string} key Key - '{wif key}mpr' 
 * @returns {Keypair} Keypair from private key
 */
const getKeypairFromPrivateKey = (key) => {
    return new Keypair(key, false);
}


module.exports = {
    Keypair,
    getNewKeypair,
    getKeypairFromSeed,
    getKeypairFromPrivateKey
};