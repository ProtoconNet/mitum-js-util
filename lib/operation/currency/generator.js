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
const { parseTyped } = require('../../util');

// sdk class; operation
const { OperationGenerator } = require('../base');

// sdk class; key
const { Keys, Key } = require('../../key');

// sdk class; currency
const { Amount } = require('./base');
const { CreateAccountsItem, TransfersItem } = require('./item');
const { CreateAccountsFact, KeyUpdaterFact, TransfersFact } = require('./fact');

// hint
const { MC_CREATE_ACCOUNTS_SINGLE_AMOUNT, MC_CREATE_ACCOUNTS_MULTIPLE_AMOUNTS, 
    MC_TRANSFERS_ITEM_SINGLE_AMOUNT, MC_TRANSFERS_ITEM_MULTI_AMOUNTS, PUBLIC_KEY } = require('../../hint');


/**
 * @class
 * @extends OperationGenerator
 * CurrencyGenerator helps to generate data and json files to send to mitum network.
 * Before you use methods of CurrencyGenerator, network id should be set, first.
 * @property {string} id
 */
class CurrencyGenerator extends OperationGenerator {

    /**
     * Forms (key, weight) into {key, weight}.
     * @param {string} key Public key with type suffix (mpu)
     * @param {number} weight Weight of the key
     * @returns {object} Object {key, weight}
     */
    key(key, weight) {
        const parsed = parseTyped(key);

        if (parsed.type !== PUBLIC_KEY) {
            throw '[ERROR] Invalid key';
        }
        if (typeof (weight) !== 'number') {
            throw '[ERROR] Invalid weight'
        }
        return {
            key: key,
            weight: weight
        };
    }

    /**
     * Forms (big, cid) into {big, cid}.
     * @param {string} big Amount of currency
     * @param {string} cid Currency ID
     * @returns {object} Object {big, cid}
     */
    amount(cid, big) {
        if (!typeof (big) === "string") {
            throw '[ERROR] Invalid amount! big must be string format.';
        }
        if (cid.length < 1) {
            throw '[ERROR] Invalid currency id';
        }
        return {
            big: big,
            cid: cid
        }
    }

    /**
     * Returns Keys instance by keys, and threshold.
     * @deprecated
     * @param {object} keys List of {key, weight} - from Generator.key 
     * @param {number} threshold Threshold
     * @returns {Keys} Keys
     */
    createKeys(keys, threshold) {
        return this.keys(keys, threshold);
    };

    /**
     * Returns Keys instance by keys, and threshold.
     * @param {object} keys List of {key, weight} - from Generator.key 
     * @param {number} threshold Threshold
     * @returns {Keys} Keys
     */
    keys(keys, threshold) {
        return new Keys(
            keys.map(x => new Key(x.key, x.weight)),
            threshold,
        );
    };

    /**
     * Returns list of Amount instances by amounts.
     * @deprecated
     * @param {object} amounts List of {big, cid} - from Generator.amount 
     * @returns {object} List of Amount instances
     */
    createAmounts(amounts) {
        return this.amounts(amounts);
    };

    /**
     * Returns list of Amount instances by amounts.
     * @param {object} amounts List of {big, cid} - from Generator.amount 
     * @returns {object} List of Amount instances
     */
    amounts(amounts) {
        return amounts.map(x => new Amount(x.big, x.cid));
    };

    /**
     * Returns CreateAccountsItem by keys and amounts.
     * @deprecated
     * @param {Keys} keys Keys instance - from Generator.createKeys
     * @param {object} amounts List of Amount instances - from Generator.createAmounts
     * @returns {CreateAccountsItem} CreateAccountsItem
     */
    createCreateAccountsItem(keys, amounts) {
        return this.getCreateAccountsItem(keys, amounts);
    }

    /**
     * Returns CreateAccountsItem by keys and amounts.
     * @param {Keys} keys Keys instance - from Generator.createKeys
     * @param {object} amounts List of Amount instances - from Generator.createAmounts
     * @returns {CreateAccountsItem} CreateAccountsItem
     */
    getCreateAccountsItem(keys, amounts) {
        const _type = amounts.length <= 1 ? MC_CREATE_ACCOUNTS_SINGLE_AMOUNT : MC_CREATE_ACCOUNTS_MULTIPLE_AMOUNTS;
        return new CreateAccountsItem(
            _type, keys, amounts
        );
    };

    /**
     * Returns TransfersItem by receiver and amounts.
     * @deprecated
     * @param {string} receiver Receiver address with type suffix (mca)
     * @param {object} amounts List of Amount instances - from Generator.createAmounts
     * @returns {TransfersItem} TransfersItem
     */
    createTransfersItem(receiver, amounts) {
        this.getTransfersItem(receiver, amounts);
    }

    /**
     * Returns TransfersItem by receiver and amounts.
     * @param {string} receiver Receiver address with type suffix (mca)
     * @param {object} amounts List of Amount instances - from Generator.createAmounts
     * @returns {TransfersItem} TransfersItem
     */
    getTransfersItem(receiver, amounts) {
        const _type = amounts.length <= 1 ? MC_TRANSFERS_ITEM_SINGLE_AMOUNT : MC_TRANSFERS_ITEM_MULTI_AMOUNTS;
        return new TransfersItem(
            _type, receiver, amounts
        )
    };

    /**
     * Returns CreateAccountsFact by sender and CreateAccountItems.
     * @deprecated
     * @param {string} sender Sender address with type suffix (mca) 
     * @param {object} items List of CreateAccountsItems
     * @returns {CreateAccountsFact} CreateAccountsFact
     */
    createCreateAccountsFact(sender, items) {
        return this.getCreateAccountsFact(sender, items);
    };

    /**
     * Returns CreateAccountsFact by sender and CreateAccountItems.
     * @param {string} sender Sender address with type suffix (mca) 
     * @param {object} items List of CreateAccountsItems
     * @returns {CreateAccountsFact} CreateAccountsFact
     */
    getCreateAccountsFact(sender, items) {
        return new CreateAccountsFact(
            sender, items
        );
    };

    /**
     * Returns KeyUpdaterFact by target address, currency id, and keys.
     * @deprecated
     * @param {string} target Target account address to change keys (mca).
     * @param {string} cid Currency ID
     * @param {Keys} keys New keys of account 
     * @returns {KeyUpdaterFact} KeyUpdaterFact
     */
    createKeyUpdaterFact(target, cid, keys) {
        return this.getKeyUpdaterFact(target,cid, keys);
    }

    /**
     * Returns KeyUpdaterFact by target address, currency id, and keys.
     * @param {string} target Target account address to change keys (mca).
     * @param {string} cid Currency ID
     * @param {Keys} keys New keys of account 
     * @returns {KeyUpdaterFact} KeyUpdaterFact
     */
    getKeyUpdaterFact(target, cid, keys) {
        return new KeyUpdaterFact(
            target, cid, keys
        );
    };

    /**
     * Returns TransfersFact by sender and TransfersItems.
     * @deprecated
     * @param {string} sender Sender address with type suffix (mca)
     * @param {object} items List of TransfersItems
     * @returns {TransfersFact} TransfersFact
     */
    createTransfersFact(sender, items) {
        return this.getTransfersFact(sender, items)
    }

    /**
     * Returns TransfersFact by sender and TransfersItems.
     * @param {string} sender Sender address with type suffix (mca)
     * @param {object} items List of TransfersItems
     * @returns {TransfersFact} TransfersFact
     */
    getTransfersFact(sender, items) {
        return new TransfersFact(
            sender, items
        )
    };
};


module.exports = {
    CurrencyGenerator,
};