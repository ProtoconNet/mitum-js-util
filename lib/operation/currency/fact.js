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

// sdk class; key
const { Address } = require('../../key');

// sdk class; operation
const { GeneralOperationFact, PurposedOperationFact } = require('../base');

// hint
const { 
    MC_CREATE_ACCOUNTS_OP_FACT, MC_KEYUPDATER_OP_FACT, MC_TRANSFERS_OP_FACT,
    MC_CREATE_ACCOUNTS_OP, MC_KEYUPDATER_OP, MC_TRANSFERS_OP 
} = require('../../hint');

// base58 pakcage
const bs58 = require('bs58');


class CreateAccountsFact extends GeneralOperationFact {
    constructor(sender, items) {
        super(MC_CREATE_ACCOUNTS_OP_FACT, sender, items);
    }

    get operationHint() {
        return MC_CREATE_ACCOUNTS_OP;
    }
};


class KeyUpdaterFact extends PurposedOperationFact {

    constructor(target, cid, keys) {
        super(MC_KEYUPDATER_OP_FACT);
        this.target = new Address(target);
        this.cid = cid;
        this.keys = keys;

        this._generateHash();
    }

    buffer() {
        const bToken = Buffer.from(this.token.toISOString());
        const bTarget = this.target.buffer();
        const bKeys = this.keys.buffer();
        const bCid = Buffer.from(this.cid);

        return Buffer.concat([bToken, bTarget, bKeys, bCid]);
    }

    dict() {
        const fact = {};
        fact._hint = this.hint;
        fact.hash = bs58.encode(this.hash);
        fact.token = Buffer.from(this.token.toISOString(), 'utf8').toString('base64');
        fact.target = this.target.typed();
        fact.keys = this.keys.dict();
        fact.currency = this.cid;
        return fact;
    }

    get operationHint() {
        return MC_KEYUPDATER_OP;
    }
};


class TransfersFact extends GeneralOperationFact {
    constructor(sender, items) {
        super(MC_TRANSFERS_OP_FACT, sender, items);
    }

    get operationHint() {
        return MC_TRANSFERS_OP;
    }
};


module.exports = {
    CreateAccountsFact,
    KeyUpdaterFact,
    TransfersFact,
};