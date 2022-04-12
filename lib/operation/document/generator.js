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
const { OperationGenerator } = require("../base");

// sdk class; generator
const { BlockCityGenerator } = require("./blockcity");
const { BlockSignGenerator } = require("./blocksign");

// sdk class; document
const { CreateDocumentsFact, UpdateDocumentsFact } = require("./fact");
const { CreateDocumentsItem, UpdateDocumentsItem } = require("./item");


/**
 * @class
 * @extends OperationGenerator
 * DocumentGenerator helps to generate data and json files to send to mitum network.
 * Before you use methods of DocumentGenerator, network id should be set, first.
 * It helps generate operations of blockcity and blocksign.
 * @property {string} id
 * @property {BlockCityGenerator} bc
 * @property {BlockSignGenerator} bs
 */
class DocumentGenerator extends OperationGenerator {

    /**
     * Generator instance with network id.
     * @param {string} id Network ID 
     */
    constructor(id) {
        super(id);

        this.bc = new BlockCityGenerator(id);
        this.bs = new BlockSignGenerator(id);
    }

    /**
     * Sets new network ID.
     * @param {string} id New network ID
     */
    setId(id) {
        this.id = id;

        this.bc = new BlockCityGenerator(id);
        this.bs = new BlockSignGenerator(id);
    }

    /**
     * Returns CreateDocumentsItem from document and currency id.
     * @param {Document} document Document
     * @param {string} cid Currency ID
     * @returns {CreateDocumentsItem} CreateDocumentsItem
     */
    getCreateDocumentsItem(document, cid) {
        return new CreateDocumentsItem(document, cid);
    }

    /**
     * Returns UpdateDocumentsItem from document and currency id.
     * @param {Document} document Document
     * @param {string} cid Currency ID
     * @returns {UpdateDocumentsItem} UpdateDocumentsItem
     */
    getUpdateDocumentsItem(document, cid) {
        return new UpdateDocumentsItem(document, cid);
    }

    /**
     * Returns CreateDocumentsFact from sender and items.
     * @param {string} sender Sender
     * @param {object} items List of CreateDocumentsItem
     * @returns {CreateDocumentsFact} CreateDocumentsFact
     */
    getCreateDocumentsFact(sender, items) {
        return new CreateDocumentsFact(sender, items);
    }

    /**
     * Returns UpdateDocumentsItem from sender and items.
     * @param {string} sender Sender 
     * @param {object} items List of UpdateDocumentsItem
     * @returns {UpdateDocumentsFact} UpdateDocumentsFact
     */
    getUpdateDocumentsFact(sender, items) {
        return new UpdateDocumentsFact(sender, items);
    }
}


module.exports = {
    DocumentGenerator,
};