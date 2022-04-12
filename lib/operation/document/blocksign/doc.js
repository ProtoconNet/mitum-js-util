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

// sdk class; util
const { BigInteger } = require("../../../util");

// sdk class; document
const { Document } = require("../base");

// sdk class blocksign
const { BlockSignGeneralInfo } = require("./info");

// compare user
function userCompare(x, y) {
    return Buffer.compare(x.address.buffer(), y.address.buffer());
};


class BlockSignDocument extends Document {
    constructor(docId, owner, fileHash, creator, title, size, signers) {
        super(new BlockSignGeneralInfo(docId), owner);

        this.fileHash = fileHash;
        this.creator = creator;
        this.title = title;
        this.size = new BigInteger(size);
        this.signers = signers;
    }

    buffer() {
        const bInfo = this.info.buffer();
        const bOwner = this.owner.buffer();
        const bFileHash = Buffer.from(this.fileHash);
        const bCreator = this.creator.buffer();
        const bTitle = Buffer.from(this.title);
        const bSize = this.size.tight();
        const bSigners = Buffer.concat(this.signers.sort(userCompare).map(x => x.buffer()));
    
        return Buffer.concat([bInfo, bOwner, bFileHash, bCreator, bTitle, bSize, bSigners]);
    }

    dict() {
        const doc = {};

        doc._hint = this.hint;
        doc.info = this.info.dict();
        doc.owner = this.owner.typed();
        doc.filehash = this.fileHash;
        doc.creator = this.creator.dict();
        doc.title = this.title;
        doc.size = this.size.origin;
        
        doc.signers = this.signers.map(x => x.dict());
    
        return doc;
    }
}


module.exports = {
    BlockSignDocument
};
