/*
    mitum-js-util SDK for mitum-currency, mitum-document
    Copyright (C) 2022 ProtoconNet

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

// sdk class; operation
const { OperationGenerator } = require("../../base");

// sdk class; blocksign
const { BlockSignUser } = require("./base");
const { BlockSignDocument } = require("./doc");
const { SignDocumentsFact } = require("./fact");
const { SignDocumentsItem } = require("./item");


/**
 * @class
 * @extends OperationGenerator
 * BlockSignGenerator helps to generate data and json files to send to mitum network.
 * Before you use methods of BlockSignGenerator, network id should be set, first.
 * @property {string} id
 */
class BlockSignGenerator extends OperationGenerator {

    /**
     * Returns BlockSignUser from address, signcode and signed.
     * @param {string} address 
     * @param {string} signCode 
     * @param {boolean} signed 
     * @returns {BlockSignUser} BlockSignUser
     */
    user(address, signCode, signed) {
        return new BlockSignUser(address, signCode, signed);
    }

    /**
     * Returns BlockSignDocument from document id, owner, file hash, creator, title, size and signers.
     * The creator and each element of signers should be BlockSignUser object.
     * @param {string} docId Document ID
     * @param {string} owner Owner
     * @param {string} fileHash File hash
     * @param {BlockSignUser} creator Creator
     * @param {string} title Title
     * @param {string} size File Size
     * @param {object} signers Signers
     * @returns {BlockSignDocument} BlockSignDocument
     */
    document(docId, owner, fileHash, creator, title, size, signers) {
        return new BlockSignDocument(docId, owner, fileHash, creator, title, size, signers);
    }
    
    /**
     * Returns SignDocumentsItem from document id, owner and currency id.
     * @param {string} docId Document ID
     * @param {string} owner Owner
     * @param {string} cid Currency ID 
     * @returns 
     */
    getSignDocumentsItem(docId, owner, cid) {
        return new SignDocumentsItem(docId, owner, cid);
    }

    /**
     * Returns SignDocumentsFact from sender and items.
     * @param {string} sender Sender
     * @param {object} items List of SignDocumentsItem
     * @returns {SignDocumentsItem} SignDocumentsItem
     */
    getSignDocumentsFact(sender, items) {
        return new SignDocumentsFact(sender, items);
    }
};


module.exports = {
    BlockSignGenerator
};