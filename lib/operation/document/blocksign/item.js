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

// sdk class; key
const { Address } = require("../../../key");

// sdk class; document
const { DocumentId } = require("../base");
const { PurposedDocumentsItem } = require("../item");

// hint
const { MBS_SIGN_ITEM_SINGLE_DOCUMENT } = require("../../../hint");


class SignDocumentsItem extends PurposedDocumentsItem {
    constructor(did, owner, cid) {
        super(MBS_SIGN_ITEM_SINGLE_DOCUMENT);
    
        this.did = new DocumentId(did);
        this.owner = new Address(owner);
        this.cid = cid;
    }

    buffer() {
        const bDid = this.did.buffer();
        const bOwner = this.owner.buffer();
        const bCid = Buffer.from(this.cid);

        return Buffer.concat([bDid, bOwner, bCid]);
    }

    dict() {
        const item = {};
        
        item._hint = this.hint;
        item.documentid = this.did.did;
        item.owner = this.owner.typed();
        item.currency = this.cid;

        return item;
    }
}


module.exports = {
    SignDocumentsItem,
};