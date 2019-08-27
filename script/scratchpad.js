/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Ctrl+R),
 * 2. Inspect to bring up an Object Inspector on the result (Ctrl+I), or,
 * 3. Display to insert the result in a comment after the selection. (Ctrl+L)
 *
 * Use it on this page:
 * https://en.wikipedia.org/wiki/List_of_chemical_elements
 */

var table = document.querySelector("table[class~=wikitable]");
var rows = table.querySelectorAll("tbody > tr");

var result = [];

for (const row of rows) {
  const cell1 = row.querySelector("td:nth-child(1)");
  const cell2 = row.querySelector("td:nth-child(2)");
  const cell3 = row.querySelector("td:nth-child(3)");

  if (!cell1 || !cell2 || !cell3) continue;

  result.push([cell1.textContent, cell2.textContent, cell3.textContent]);
}

console.log(JSON.stringify(result));
