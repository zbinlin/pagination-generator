export enum PaginationItemTypes {
    Nav = "nav",
    Num = "num",
}

export type PaginationItem = {
	type: PaginationItemTypes.Nav;
    name: "first" | "last" | "prev" | "next";
    value: number;
    disabled: boolean;
} | {
    type: PaginationItemTypes.Num;
    name: `${number}`;
    value: number;
    current: boolean;
}

/**
 * @param {number} current - current cursor
 * @param {number} total - total pages
 * @param {number} limit - number of pagintation items
 * @returns {PaginationItem[]} page items
 */
export default function paginationGenerator(
    current: number,
    total: number,
    limit: number,
): PaginationItem[];
