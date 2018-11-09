$(function () {
    var cw = document.body.clientWidth;
    if ( cw < 356 ) return;
    var closeHtml = '<span class="close">×</span>';
    var maskHtml = '<div class="mask"></div>';
    var popHtml = '<div class="pop">' +
                '<div class="pop-body">' +
                    '<div class="text">中文资料维护不易，我国人工智能/数据科学的发展离不开你们的支持，你们的支持是我们的动力。</div>' + 
                    '<table>' + 
                        '<thead>' +
                            '<tr>' +
                                '<th style="text-align: center;border: 1px solid #404c58;background: #fff;">支付宝</th>' +
                                '<th style="text-align: center;border: 1px solid #404c58;background: #fff;">微信</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '<tr>' +
                                '<td style="text-align: center;border: 1px solid #404c58;"><a target="_blank" rel="noopener noreferrer" href="/libs/images/wechat-qr.jpg"><img src="/libs/images/wechat-qr.jpg" width="150" style="max-width:100%;"></a></td>' + 
                                '<td style="text-align: center;border: 1px solid #404c58;"><a target="_blank" rel="noopener noreferrer" href="/libs/images/alipay-qr.jpg"><img src="/libs/images/alipay-qr.jpg" width="150" style="max-width:100%;"></a></td>' +
                            '</tr>' + 
                        '</tbody>' +
                    '</table>'
                '</div>' +
                '</div>';
    var maskEl = $(maskHtml);
    var popEl = $(popHtml);
    var closeEl = $(closeHtml);
    popEl.append(closeEl);
    maskEl.append(popEl);
    setTimeout(function() {
        popEl.addClass("show");
    }, 200);
});