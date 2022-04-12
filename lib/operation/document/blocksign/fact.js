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

// sdk class; document
const { GeneralDocumentsFact } = require("../fact");

// hint
const { MBS_SIGN_DOCUMENTS_OP_FACT, MBS_SIGN_DOCUMENTS_OP } = require("../../../hint");


class SignDocumentsFact extends GeneralDocumentsFact {
    constructor(sender, items) {
        super(MBS_SIGN_DOCUMENTS_OP_FACT, sender, items);
    }

    get operationHint() {
        return MBS_SIGN_DOCUMENTS_OP;
    }
}


module.exports = {
    SignDocumentsFact,
};