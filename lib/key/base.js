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
const { parseTyped } = require('../util');


class BaseKey {

    constructor(key, type) {
        if (type == 'unknown') {
            const parsed = parseTyped(key);
            this.type = parsed.type;
            this.key = parsed.raw;
        }
        else {
            this.type = type;
            this.key = key;
        }
    }

    typed() {
        return this.key + this.type;
    }

    buffer() {
        return Buffer.from(this.typed());
    }

    _buffer() {
        return Buffer.from(this.key);
    }
};


module.exports = {
    BaseKey,
};