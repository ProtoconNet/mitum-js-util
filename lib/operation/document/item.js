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
const { Item } = require("../base");

// hint
const { MD_CREATE_DOCUMENTS_ITEM, MD_UPDATE_DOCUMENTS_ITEM } = require("../../hint");


class DocumentsItem extends Item {};


class GeneralDocumentsItem extends DocumentsItem {
    constructor(type, document, cid) {
        super(type);

        this.document = document;
        this.cid = cid;
    }

    buffer() {
        const bDocument = this.document.buffer();
        const bCid = Buffer.from(this.cid);
        return Buffer.concat([bDocument, bCid]);
    }

    dict() {
        const item = {};

        item._hint = this.hint;
        item.doc = this.document.dict();
        item.currency = this.cid;

        return item;
    }
}


class PurposedDocumentsItem extends DocumentsItem {};


class CreateDocumentsItem extends GeneralDocumentsItem {
    constructor(document, cid) {
        super(MD_CREATE_DOCUMENTS_ITEM, document, cid);
    }
}


class UpdateDocumentsItem extends GeneralDocumentsItem {
    constructor(document, cid) {
        super(MD_UPDATE_DOCUMENTS_ITEM, document, cid);
    }
}


module.exports = {
    GeneralDocumentsItem,
    PurposedDocumentsItem,
    CreateDocumentsItem,
    UpdateDocumentsItem,
};