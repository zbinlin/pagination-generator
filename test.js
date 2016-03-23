"use strict";
/* eslint-env mocha */

const expect = require("chai").expect;
const pagination = require(".");

describe("test pagination function", function () {
    it("返回第 1 页，如果输入的页数少于第 1 页", function () {
        expect(pagination(0, 10, 10)[0].value).to.be.equal(1);
    });
    it("返回最后一页，如果输入的页数大于实际的页数", function () {
        expect(pagination(100, 10, 10).reverse()[0].value).to.be.equal(10);
    });
    it("返回“前一页”、“后一页”，如果只显示 2 项", function () {
        expect(pagination(1, 10, 2).length).to.be.equal(2);
        expect(pagination(1, 10, 2)[0]).to.be.eql({
            type: "nav",
            name: "prev",
            value: 1,
            disabled: true,
        });
        expect(pagination(1, 10, 2)[1]).to.be.eql({
            type: "nav",
            name: "next",
            value: 1,
            disabled: false,
        });
        expect(pagination(3, 10, 2)[0]).to.be.eql({
            type: "nav",
            name: "prev",
            value: 2,
            disabled: false,
        });
        expect(pagination(10, 10, 2)[1]).to.be.eql({
            type: "nav",
            name: "next",
            value: 10,
            disabled: true,
        });
    });
    it("返回“前一页”、“当前页”、“后一页”，如果只显示 3 项", function () {
        expect(pagination(5, 10, 3)[1]).to.be.eql({
            type: "num",
            name: 5,
            value: 5,
            current: true,
        });
    });
    it("返回“首页”、“前一页”、“后一页”、“末页”，如果只显示 4 项", function () {
        expect(pagination(1, 10, 4).length).to.be.equal(4);
        expect(pagination(1, 10, 4)[0].name).to.be.equal("first");
        expect(pagination(1, 10, 4)[1].name).to.be.equal("prev");
        expect(pagination(1, 10, 4)[2].name).to.be.equal("next");
        expect(pagination(1, 10, 4)[3].name).to.be.equal("last");
    });
    it("返回所有的数字项，如果实际的页数少于等于需要显示页数", function () {
        expect(pagination(1, 10, 10).length).to.be.equal(10);
        expect(pagination(1, 8, 10).length).to.be.equal(8);
        expect(pagination(1, 10, 10)[0].value).to.be.equal(1);
        expect(pagination(1, 10, 10)[9].value).to.be.equal(10);
    });
    it("显示“首页”、“前一页”、“后一页”、“末页”以及剩余的数字项，如果需要显示的项多于 5 项", function () {
        const e1 = ["first", "prev", 1, 2, 3, 4, 5, "next", "last"];
        expect(getNames(
            pagination(2, 10, 9)
        )).to.be.eql(e1);

        expect(getCurrentValue(
            pagination(2, 10, 9)
        )).to.be.equal(2);

        const e2 = ["first", "prev", 3, 4, 5, 6, 7, "next", "last"];
        expect(getNames(
            pagination(5, 10, 9)
        )).to.be.eql(e2);

        expect(getCurrentValue(
            pagination(5, 10, 9)
        )).to.be.equal(5);

        const e3 = ["first", "prev", 6, 7, 8, 9, 10, "next", "last"];
        expect(getNames(
            pagination(9, 10, 9)
        )).to.be.eql(e3);

        expect(getCurrentValue(
            pagination(9, 10, 9)
        )).to.be.equal(9);
    });

    function getNames(ary) {
        return ary.map(item => item.name);
    }
    function getCurrentValue(ary) {
        return ary.filter(item => item.current)[0].value;
    }
});
