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
const { ISOToUTC, sum256 } = require('../util');

// sdk module; sign
const { newFactSign } = require('./sign');

// base58 package
const bs58 = require('bs58');


/**
 * @class
 * Signer supports to add fact_sign to the operation.
 * Before using it, network ID should be set.
 * @property {string} id
 * @property {string} signKey
 */
class Signer {
    /**
     * Signer instance with network id and signing key.
     * @param {string} id Network ID
     * @param {string} sk Signing key with type suffix (mpr) 
     */
    constructor(id, sk) {
        this.id = id;
        this.signKey = sk;
    }

    /**
     * Set new network id.
     * @param {string} id New network ID 
     */
    setId(id) {
        this.id = id;
    }

    /**
     * Returns the operation object with new fact_signs.
     * @param {string | object} f_oper Operation object or file path. 
     * @returns {object} New operation in dictionary type.
     */
    signOperation(f_oper) {
        const fs = require('fs');
        const before = typeof (f_oper) === 'string' ? JSON.parse(fs.readFileSync(f_oper))
            : (typeof (f_oper) === typeof ({}) ? f_oper : undefined);
        if (!before) {
            return undefined;
        }

        const after = {};
        const factHash = before['fact']['hash'];

        const bFactHash = bs58.decode(factHash);
        const factSigns = before['fact_signs'];

        factSigns.push(
            newFactSign(
                Buffer.concat([
                    bFactHash, Buffer.from(this.id)
                ]),
                this.signKey
            ).dict()
        );

        const bFactSigns = Buffer.concat(
            factSigns.map(x => {
                const bSigner = Buffer.from(x['signer']);
                const bSign = bs58.decode(x['signature']);
                const bAt = Buffer.from(ISOToUTC(x['signed_at']));

                return Buffer.concat([bSigner, bSign, bAt]);
            })
        );

        after['memo'] = before['memo'];
        after['_hint'] = before['_hint'];
        after['fact'] = before['fact'];
        after['fact_signs'] = factSigns;

        const bMemo = Buffer.from(before['memo']);
        after['hash'] = bs58.encode(
            sum256(Buffer.concat([bFactHash, bFactSigns, bMemo]))
        );

        return after;
    }
};


module.exports = {
    Signer,
};