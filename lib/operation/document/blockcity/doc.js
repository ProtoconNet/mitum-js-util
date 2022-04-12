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

// skd class; key
const { Address } = require("../../../key");

// sdk class; document
const { Document } = require("../base");

// sdk class; blockcity
const { BlockCityUserInfo, BlockCityLandInfo, BlockCityVoteInfo, BlockCityHistoryInfo } = require("./info");

// compare candidate
function candidateCompare(x, y) {
    return Buffer.compare(x.buffer(), y.buffer());
}


class UserDocument extends Document {
    constructor(docId, owner, gold, bankGold, userStatistics) {
        super(new BlockCityUserInfo(docId), owner);

        this.gold = new BigInteger("" + gold);
        this.bankGold = new BigInteger("" + bankGold);
        this.statistics = userStatistics;
    }

    buffer() {
        const bInfo = this.info.buffer();
        const bOwner = this.owner.buffer();
        const bGold = this.gold.buffer();
        const bBankGold = this.bankGold.buffer();
        const bStatistics = this.statistics.buffer();
        return Buffer.concat([bInfo, bOwner, bGold, bBankGold, bStatistics]);
    }

    dict() {
        const doc = {};

        doc._hint = this.hint;
        doc.info = this.info.dict();
        doc.owner = this.owner.typed();
        doc.gold = this.gold.value;
        doc.bankgold = this.bankGold.value;
        doc.statistics = this.statistics.dict();

        return doc;
    }
}


class LandDocument extends Document {
    constructor(docId, owner, address, area, renter, account, rentDate, period) {
        super(new BlockCityLandInfo(docId), owner);

        this.address = address;
        this.area = area;
        this.renter = renter;
        this.account = new Address(account);
        this.rentDate = rentDate;
        this.period = new BigInteger("" + period);
    }

    buffer() {
        const bInfo = this.info.buffer();
        const bOwner = this.owner.buffer();
        const bAddress = Buffer.from(this.address);
        const bArea = Buffer.from(this.area);
        const bRenter = Buffer.from(this.renter);
        const bAccount = this.account.buffer();
        const bRentDate = Buffer.from(this.rentDate);
        const bPeriod = this.period.buffer();
        return Buffer.concat([bInfo, bOwner, bAddress, bArea, bRenter, bAccount, bRentDate, bPeriod]);
    }

    dict() {
        const doc = {};

        doc._hint = this.hint;
        doc.info = this.info.dict();
        doc.owner = this.owner.typed();
        doc.address = this.address;
        doc.area = this.area;
        doc.renter = this.renter;
        doc.account = this.account.typed();
        doc.rentDate = this.rentDate;
        doc.periodday = this.period.value;

        return doc;
    }
}


class VoteDocument extends Document {
    constructor(docId, owner, round, endTime, candidates, bossName, account, office) {
        super(new BlockCityVoteInfo(docId), owner);

        this.round = new BigInteger("" + round);
        this.endTime = endTime;
        this.candidates = candidates;
        this.bossName = bossName;
        this.account = new Address(account);
        this.office = office;
    }

    buffer() {
        const bInfo = this.info.buffer();
        const bOwner = this.owner.buffer();
        const bRound = this.round.buffer();
        const bEndTime = Buffer.from(this.endTime);
        const bBossName = Buffer.from(this.bossName);
        const bAccount = this.account.buffer();
        const bOffice = Buffer.from(this.office);
        const bCandidates = Buffer.concat(this.candidates.sort(candidateCompare).map(x => x.buffer()));
 
        return Buffer.concat([bInfo, bOwner, bRound, bEndTime, bBossName, bAccount, bOffice, bCandidates]);
    }

    dict() {
        const doc = {};

        doc._hint = this.hint;
        doc.info = this.info.dict();
        doc.owner = this.owner.typed();
        doc.round = this.round.value;
        doc.endvotetime = this.endTime;
        doc.candidates = this.candidates.map(x => x.dict());
        doc.bossname = this.bossName;
        doc.account = this.account.typed();
        doc.termofoffice = this.office;

        return doc;
    }

}


class HistoryDocument extends Document {
    constructor(docId, owner, name, account, date, usage, app) {
        super(new BlockCityHistoryInfo(docId), owner);

        this.name = name;
        this.account = new Address(account);
        this.date = date;
        this.usage = usage;
        this.app = app;
    }

    buffer() {
        const bInfo = this.info.buffer();
        const bOwner = this.owner.buffer();
        const bName = Buffer.from(this.name);
        const bAccount = this.account.buffer();
        const bDate = Buffer.from(this.date);
        const bUsage = Buffer.from(this.usage);
        const bApp = Buffer.from(this.app);

        return Buffer.concat([bInfo, bOwner, bName, bAccount, bDate, bUsage, bApp]);
    }

    dict() {
        const doc = {};

        doc._hint = this.hint;
        doc.info = this.info.dict();
        doc.owner = this.owner.typed();
        doc.name = this.name;
        doc.account = this.account.typed();
        doc.date = this.date;
        doc.usage = this.usage;
        doc.application = this.app;

        return doc;
    }
}


module.exports = {
    Document,
    UserDocument,
    LandDocument,
    VoteDocument,
    HistoryDocument,
};