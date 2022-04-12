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

// sdk module; util
const { parseDocumentId, _hint } = require("../../util");

// sdk class; key
const { Address } = require("../../key");

// hint
const { MD_DOCUMENT_INFO } = require("../../hint");


class DocumentId {
    constructor(did) {
        const parsed = parseDocumentId(did);
        this.id = parsed.id;
        this.type = parsed.suffix;
    }

    get did() {
        return this.id + this.type;
    }

    buffer() {
        return Buffer.from(this.did);
    }
}


class Info {
    constructor(docType, did) {
        this.hint = _hint(MD_DOCUMENT_INFO);
        this.docType = docType;
        this.did = new DocumentId(did);
    }

    getIdHint() {
        throw "[ERROR] Unimplemented function getIdHint(); Info";
    }

    buffer() {
        const bDid = this.did.buffer();
        const bDocType = Buffer.from(this.docType);
        return Buffer.concat([bDid, bDocType]);
    }

    dict() {
        const docId = {};

        docId._hint = this.getIdHint();
        docId.id = this.did.did;

        const info = {};

        info._hint = this.hint;
        info.docid = docId;
        info.doctype = this.docType;

        return info;
    }
}


class Document {
    constructor(info, owner) {
        this.hint = _hint(info.docType);
        this.info = info;
        this.owner = new Address(owner);
    }

    buffer() {
        throw '[ERROR] Unimplemented function buffer(); Document';
    }

    dict() {
        throw '[ERROR] Unimplemented function dict(); Document';
    }
}


module.exports = {
    DocumentId,
    Info,
    Document,
};