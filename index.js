"use strict";
import puppeteer from "puppeteer";

let browser = await puppeteer.launch({
  headless: false,
});

let page = await browser.newPage();
await page.goto("https://stackoverflow.com/");

let ele = await page.waitForSelector(".s-topbar--logo");
let attributeValue = await page.evaluate((x) => x.getAttribute("href"), ele);
console.log(`attributeValue: ${attributeValue}`); //prints "attributeValue: https://stackoverflow.com"

function getAttribute(ele, attributeName) {
  console.log("inside getAttribute: " + attributeName); //prints "inside getAttribute: href"
  return page.evaluate((x) => x.getAttribute(attributeName), ele); //fails with "Error [ReferenceError]: attributeName is not defined"
}

let ele2 = await page.waitForSelector(".s-topbar--logo");
let attributeValue2 = await getAttribute(ele2, "href");
console.log(`attributeValue2: ${attributeValue2}`);
