(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.paginationGenerate = {}));
})(this, (function (exports) { 'use strict';

    const PaginationItemTypes = (function (PaginationItemTypes) {
        PaginationItemTypes["Nav"] = "nav";
        PaginationItemTypes["Num"] = "num";
    })({});

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
    function paginationGenerator(current, total, limit) {
        current = Math.min(total, Math.max(1, current));
        let first = {
            type: "nav",
            name: "first",
            value: 1,
            disabled: current === 1,
        };
        let last = {
            type: "nav",
            name: "last",
            value: total,
            disabled: current === total,
        };
        let prev = {
            type: "nav",
            name: "prev",
            value: Math.max(1, current - 1),
            disabled: current === 1,
        };
        let next = {
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
        let start = 1, end = total;
        let before = [], after = [];
        if (total > limit) {
            before = [first, prev];
            after = [next, last];
            limit -= 4;
            let half = Math.floor(limit / 2);
            if (current <= half) {
                end = limit;
            } else if (current >= total - half) {
                start = total - limit + 1;
            } else {
                start = current - half;
                end = start + limit - 1;
            }
        }
        let pages = [];
        for (let i = start; i <= end; i++) {
            pages.push({
                type: "num",
                name: i,
                value: i,
                current: i === current,
            });
        }
        return before.concat(pages, after);
    }

    exports.PaginationItemTypes = PaginationItemTypes;
    exports.default = paginationGenerator;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
