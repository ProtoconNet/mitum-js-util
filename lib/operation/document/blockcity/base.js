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

// sdk module, class; util
const { _hint, BigInteger } = require("../../../util");

// sdk class; key
const { Address } = require("../../../key");

// hint
const { MBC_USER_STATISTICS, MBC_VOTING_CANDIDATE } = require("../../../hint");


class Candidate {
    constructor(address, nickname, manifest, count) {
        if (manifest.length > 100) {
            throw '[ERROR] manifest length is over 100! (manifest.length <= 100)';
        }

        this.hint = _hint(MBC_VOTING_CANDIDATE);
        this.address = new Address(address);
        this.nickname = nickname;
        this.manifest = manifest;
        this.count = new BigInteger("" + count);
    }

    buffer() {
        const bAddress = this.address.buffer();
        const bNickname = Buffer.from(this.nickname);
        const bManifest = Buffer.from(this.manifest);
        const bCount = this.count.buffer();
        return Buffer.concat([bAddress, bNickname, bManifest, bCount]);
    }

    dict() {
        const candidate = {};
        candidate._hint = this.hint;
        candidate.address = this.address.typed();
        candidate.nickname = this.nickname;
        candidate.manifest = this.manifest;
        candidate.count = this.count.value;

        return candidate;
    }
}


class UserStatistics {
    constructor(hp, str, agi, dex, cha, intel, vital) {
        this.hint = _hint(MBC_USER_STATISTICS);

        this.hp = new BigInteger("" + hp);
        this.str = new BigInteger("" + str);
        this.agi = new BigInteger("" + agi);
        this.dex = new BigInteger("" + dex);
        this.cha = new BigInteger("" + cha);
        this.intel = new BigInteger("" + intel);
        this.vital = new BigInteger("" + vital);
    }

    buffer() {
        return Buffer.concat([
            this.hp.buffer(),
            this.str.buffer(),
            this.agi.buffer(),
            this.dex.buffer(),
            this.cha.buffer(),
            this.intel.buffer(),
            this.vital.buffer(),
        ]);
    }

    dict() {
        const statistics = {};

        statistics._hint = this.hint;
        statistics.hp = this.hp.value;
        statistics.strength = this.str.value;
        statistics.agility = this.agi.value;
        statistics.dexterity = this.dex.value;
        statistics.charisma = this.cha.value;
        statistics.intelligence = this.intel.value;
        statistics.vital = this.vital.value;

        return statistics;
    }
}


module.exports = {
    Candidate,
    UserStatistics,
};