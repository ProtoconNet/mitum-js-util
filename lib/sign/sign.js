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
const { _hint, dateToUTC, getTimeStamp } = require('../util');

// sdk module; key
const { Keypair } = require('../key');

// hint
const { BASE_FACT_SIGN } = require('../hint');

// base58 package
const bs58 = require('bs58');


class FactSign {

    constructor(signer, sign, at) {
        this.hint = _hint(BASE_FACT_SIGN);
        this.signer = signer;
        this.sign = sign;
        this.at = at;
    }

    buffer() {
        const bSigner = Buffer.from(this.signer);
        const bSign = this.sign;
        const bat = Buffer.from(dateToUTC(this.at));

        return Buffer.concat([bSigner, bSign, bat]);
    }

    signedAt() {
        return this.at.toISOString();
    }

    dict() {
        const fact_sign = {};

        fact_sign._hint = this.hint;
        fact_sign.signer = this.signer;
        fact_sign.signature = bs58.encode(this.sign);
        fact_sign.signed_at = this.signedAt()
        
        return fact_sign;
    }
};


const newFactSign = (msg, typedKey) => {
    let factSign;
    let keypair;

    try {
        keypair = new Keypair(typedKey);
        factSign = new FactSign(
            keypair.getPublicKey(),
            keypair.sign(msg),
            getTimeStamp()
        );
    } catch (e) {
        console.log("Fail to create new fact sign");
        return null;
    }

    return factSign;
};


module.exports = {
    FactSign,
    newFactSign
};