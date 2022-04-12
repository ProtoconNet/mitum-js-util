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
const { GeneralOperationFact, PurposedOperationFact } = require("../base");

// hint
const { MD_CREATE_DOCUMENTS_OP_FACT, MD_CREATE_DOCUMENTS_OP, MD_UPDATE_DOCUMENTS_OP_FACT, MD_UPDATE_DOCUMENTS_OP } = require("../../hint");


class GeneralDocumentsFact extends GeneralOperationFact {};
class PurposedDocumentsFact extends PurposedOperationFact {};


class CreateDocumentsFact extends GeneralDocumentsFact {
    constructor(sender, items) {
        super(MD_CREATE_DOCUMENTS_OP_FACT, sender, items);
    }

    get operationHint() {
        return MD_CREATE_DOCUMENTS_OP;
    }
}


class UpdateDocumentsFact extends GeneralDocumentsFact {
    constructor(sender, items) {
        super(MD_UPDATE_DOCUMENTS_OP_FACT, sender, items);
    }

    get operationHint() {
        return MD_UPDATE_DOCUMENTS_OP;
    }
}


module.exports = {
    GeneralDocumentsFact,
    PurposedDocumentsFact,
    CreateDocumentsFact,
    UpdateDocumentsFact,
};