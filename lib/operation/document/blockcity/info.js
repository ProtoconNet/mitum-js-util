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
    const { _hint } = require("../../../util");

// sdk class; document
const { Info } = require("../base");

// hint
const { MBC_DOCTYPE_USER_DATA, MBC_DOCTYPE_LAND_DATA, MBC_DOCTYPE_VOTE_DATA, MBC_DOCTYPE_HISTORY_DATA,
    MBC_USER_DOCUMENT_ID, MBC_LAND_DOCUMENT_ID, MBC_VOTE_DOCUMENT_ID, MBC_HISTORY_DOCUMENT_ID } = require("../../../hint");


class BlockCityInfo extends Info {
    getIdHint() {
        switch (this.docType) {
            case MBC_DOCTYPE_USER_DATA:
                return _hint(MBC_USER_DOCUMENT_ID);
            case MBC_DOCTYPE_LAND_DATA:
                return _hint(MBC_LAND_DOCUMENT_ID);
            case MBC_DOCTYPE_VOTE_DATA:
                return _hint(MBC_VOTE_DOCUMENT_ID);
            case MBC_DOCTYPE_HISTORY_DATA:
                return _hint(MBC_HISTORY_DOCUMENT_ID);
            default:
                throw '[ERROR] Invalid document type for Info.dict()';
        }
    }
}


class BlockCityUserInfo extends BlockCityInfo {
    constructor(docId) {
        super(MBC_DOCTYPE_USER_DATA, docId);
    }
}


class BlockCityLandInfo extends BlockCityInfo {
    constructor(docId) {
        super(MBC_DOCTYPE_LAND_DATA, docId);
    }
}


class BlockCityVoteInfo extends BlockCityInfo {
    constructor(docId) {
        super(MBC_DOCTYPE_VOTE_DATA, docId);
    }
}


class BlockCityHistoryInfo extends BlockCityInfo {
    constructor(docId) {
        super(MBC_DOCTYPE_HISTORY_DATA, docId);
    }
}


module.exports = {
    BlockCityUserInfo,
    BlockCityLandInfo,
    BlockCityVoteInfo,
    BlockCityHistoryInfo,
};