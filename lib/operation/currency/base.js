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

// sdk module, class; util
const { _hint, BigInteger } = require('../../util');

// hint
const { MC_AMOUNT } = require('../../hint');


class Amount {

    constructor(big, cid) {
        if (typeof big !== "string") {
            throw new Error("[ERROR] Invalid amount(big) type for BigInteger! Use string.");
        }

        this.hint = _hint(MC_AMOUNT);
        this.big = new BigInteger(big);
        this.cid = cid;
    }

    buffer() {
        const bBig = this.big.tight();
        const bCid = Buffer.from(this.cid);

        return Buffer.concat([bBig, bCid]);
    }

    dict() {
        const amount = {};
        amount._hint = this.hint;
        amount.amount = this.big.rawValue;
        amount.currency = this.cid;
        return amount;
    }
};


module.exports = {
    Amount,
};