"use strict";

/**
 * @type PaginationItem
 * @param {Object} item
 * @param {string} item.type - enum: "nav", "num"
 * @param {string} item.name
 * @param {number} item.value
 * @param {boolean} [item.disabled]
 * @param {boolean} [item.current]
 */

/**
 * @param {number} current - current cursor
 * @param {number} total - total pages
 * @param {number} limit - number of pagintation items
 * @return {PaginationItem[]}
 */
module.exports = function pagination(current, total, limit) {
    current = Math.min(total, Math.max(1, current));
    var first = {
        type: "nav",
        name: "first",
        value: 1,
        disabled: current === 1,
    };
    var last = {
        type: "nav",
        name: "last",
        value: total,
        disabled: current === total,
    };
    var prev = {
        type: "nav",
        name: "prev",
        value: Math.max(1, current - 1),
        disabled: current === 1,
    };
    var next = {
        type: "nav",
        name: "next",
        value: Math.min(current + 1, total),
        disabled: current === total,
    };
    if (limit < 3) {
        return [prev, next];
    } else if (limit < 4) {
        return [prev, {
            type: "num",
            name: current,
            value: current,
            current: true,
        }, next];
    } else if (limit < 5) {
        return [first, prev, next, last];
    }
    var start = 1, end = total;
    var before = [], after = [];
    if (total > limit) {
        before = [first, prev];
        after = [next, last];
        limit -= 4;
        var half = Math.floor(limit / 2);
        if (current <= half) {
            end = limit;
        } else if (current >= total - half) {
            start = total - limit + 1;
        } else {
            start = current - half;
            end = start + limit - 1;
        }
    }
    var pages = [];
    for (var i = start; i <= end; i++) {
        pages.push({
            type: "num",
            name: i,
            value: i,
            current: i === current,
        });
    }
    return before.concat(pages, after);
};
