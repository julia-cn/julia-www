const fs = require("fs-extra");
const fly = require("flyio");
const cheerio = require("cheerio");
const config = require("./config");

const blogUrl = "https://www.julialang.org/blog/index.html";
const baseUrl = "https://www.julialang.org";


const fromFootHtml = `<footer class="container-fluid footer-menu">
    <div class="container">
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4 footer-menu-item">
          <h6>Download</h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="/downloads/index.html">Julia v1.0</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/downloads/oldreleases.html">Older</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 footer-menu-item">
          <h6>Documentation</h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="https://docs.julialang.org/en/v1/">Julia v1.0</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://docs.julialang.org/en/v1.1-dev/">Julia v1.1-dev</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 footer-menu-item">
          <h6>Packages</h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="https://juliaobserver.com">Julia Observer</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://pkg.julialang.org/pulse.html">Ecosystem Pulse</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 footer-menu-item">
          <h6>Community</h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="https://discourse.julialang.org">Discourse</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://julialang.slack.com/">Slack</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 footer-menu-item">
          <h6>Learning</h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="https://www.youtube.com/JuliaLanguage/">YouTube Channel</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://julialang.org/learning/">Other Resources</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 footer-menu-item">
          <h6>Research</h6>
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" href="/publications/">Publications</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://julia.mit.edu/">MIT</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />
  </footer>


<!-- Google Analytics -->
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-28835595-1', 'auto');
    ga('send', 'pageview');
  </script>
<!-- End Google Analytics -->

<footer class="container-fluid footer-copy">
    <div class="container">
      <div class="row">
        <div class="col-md-10 py-2">
          <p>
            Julia is a NumFocus project. We thank Fastly for their generous infrastructure support.
          </p>
          <p>
            ©2018 JuliaLang. All rights reserved.
          </p>
        </div>
        <div class="col-md-2 py-2">
          <a class="btn btn-success" href="https://www.flipcause.com/widget/widget_home/MjI1Nw==">Donate</a>
        </div>
      </div>
    </div>
  </footer>


  <script src="/libs/js/jquery.min.js"></script>
<script src="/libs/js/bootstrap.min.js"></script>
<script src="/libs/js/platform.js"></script>
<script src="/libs/js/app.js"></script>
<script src="/libs/js/highlight.pack.js"></script>
<script async defer src="https://buttons.github.io/buttons.js"></script>`

const fromMenuHtml = `<!-- main menu -->
<div class="container py-3 py-lg-0">
  <nav class="navbar navbar-expand-lg navbar-light bg-light" id="main-menu">

    <a class="navbar-brand" href="/" id="logo">
      <img src="/libs/img/logo.svg" height="55" width="85" />
    </a>

    <button class="navbar-toggler ml-auto hidden-sm-up float-xs-left" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <!-- li class="nav-item  flex-md-fill text-md-center">
          <a class="nav-link" href="/">Home</a>
        </li -->
        <li class="nav-item  flex-md-fill text-md-center">
          <a class="nav-link" href="/downloads">Download</a>
        </li>
        <li class="nav-item flex-md-fill text-md-center">
          <a class="nav-link" href="//docs.julialang.org">Documentation</a>
        </li>
        <li class="nav-item  active  flex-md-fill text-md-center">
          <a class="nav-link" href="/blog/">Blog</a>
        </li>
        <li class="nav-item  flex-md-fill text-md-center">
          <a class="nav-link" href="/community">Community</a>
        </li>
        <li class="nav-item  flex-md-fill text-md-center">
          <a class="nav-link" href="/learning">Learning</a>
        </li>
        <li class="nav-item  flex-md-fill text-md-center">
          <a class="nav-link" href="/publications">Research</a>
        </li>
        <li class="nav-item donate flex-md-fill text-md-center">
          <a class="btn btn-success" href="https://www.flipcause.com/widget/widget_home/MjI1Nw==">Donate</a>
        </li>
      </ul>
    </div>

  </nav>
</div>
<!-- end main menu -->
`

const main = async function() {
    let res = await fly.get(blogUrl);
    let html = res.data;
    let $ = cheerio.load(html, { decodeEntities: false });
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
        let html = res.data;
        $ = cheerio.load(html, { decodeEntities: false });
        let title = $('title').text();
        let author = $("meta[name='viewport']").attr("content");
        html = html.replace(/\/v2\//g, "/libs/");
        html = html.replace(fromMenuHtml, "  <?php require_once('../_common/nav.html'); ?>");
        html = html.replace(fromFootHtml, "  <?php require_once('../_common/foot.html'); ?>");
        $ = cheerio.load(html, { decodeEntities: false });
        $("head").remove();
        html = $.html();
        html = html.replace("<body>", `<?php 
$title = "${title}";
$keywords = "";
$description = "";
$active_menu = "blog";
require_once('../_common/head.html'); ?>
<body>`);
        html = html.replace(/<!--\?php/g, "<?php");
        html = html.replace(/\?-->/g, "?>");
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