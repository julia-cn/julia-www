const fs = require("fs-extra");
const fly = require("flyio");
const cheerio = require("cheerio");
const config = require("./config");

const blogUrl = "https://www.julialang.org/blog/index.html";
const baseUrl = "https://www.julialang.org";
let $ = {};

const main = async function() {
    let res = await fly.get(blogUrl);
    let html = res.data;
    $ = cheerio.load(html, { decodeEntities: false });
    console.log("抓取完成");
    let items = $(".col-lg-4.col-md-12.blog");
    let blogArr = [];
    items.each((i, elem) => {
        let href = $(elem).find("a").attr("href");
        blogArr.push({
            url: baseUrl + href,
            newFileName: href.substring(6).split("/").join("-") + ".html"
        });
    });
    for (let index = 0; index < blogArr.length; index++) {
        const item = blogArr[index];
        const outPath = config.dir + item.newFileName;
        console.log("准备抓取：", item.url);
        const res = await fly.get(item.url);
        const html = res.data;
        if ( !fs.existsSync(outPath) ) {
            fs.outputFileSync(outPath, html);
        } else {
            console.log("文件已存在");
        }
    }
}
main();

/**

let items = $(".col-lg-4.col-md-12.blog");
$.each(items, function() {
    let href = $(this).find("a").attr("href");
    let newFileName = href.substring(6).split("/").join("-");
    $(this).find("a").attr("href", "/blog/" + newFileName);
});

 */