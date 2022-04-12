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
const { Item } = require('../base');


class CurrencyItem extends Item {

    constructor(type, amounts) {
        super(type);
        this.amounts = amounts;
    }
};


class CreateAccountsItem extends CurrencyItem {

    constructor(type, keys, amounts) {
        super(type, amounts);
        this.keys = keys;
    }

    buffer() {
        const bKeys = this.keys.buffer();
        const bAmounts = Buffer.concat(this.amounts.map(x => x.buffer()));

        return Buffer.concat([bKeys, bAmounts]);
    }

    dict() {
        const item = {};

        item._hint = this.hint;
        item.keys = this.keys.dict();
        item.amounts = this.amounts.map(x => x.dict());

        return item;
    }
};


class TransfersItem extends CurrencyItem {

    constructor(type, receiver, amounts) {
        super(type, amounts);
        this.receiver = new Address(receiver);
    }

    buffer() {
        const bReceiver = this.receiver.buffer();
        const bAmounts = Buffer.concat(this.amounts.map(x => x.buffer()));

        return Buffer.concat([bReceiver, bAmounts]);
    }

    dict() {
        const item = {};

        item._hint = this.hint;
        item.receiver = this.receiver.typed();
        item.amounts = this.amounts.map(x => x.dict());

        return item;
    }
};


module.exports = {
    CreateAccountsItem,
    TransfersItem,
};