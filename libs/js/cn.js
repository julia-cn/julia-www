$(function () {
    var pop = '<div class="pop">' +
                '<div class="pop-body">' +
                    '<div class="text"></div>' + 
                    '<table>' + 
                        '<thead>' +
                            '<tr>' +
                                '<th align="center">支付宝</th>' +
                                '<th align="center">微信</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '<tr>' +
                                '<td align="center"><a target="_blank" rel="noopener noreferrer" href="/libs/images/wechat-qr.jpg"><img src="/libs/images/wechat-qr.jpg" width="150" style="max-width:100%;"></a></td>' + 
                                '<td align="center"><a target="_blank" rel="noopener noreferrer" href="/libs/images/alipay-qr.jpg"><img src="/libs/images/alipay-qr.jpg" width="150" style="max-width:100%;"></a></td>' +
                            '</tr>' + 
                        '</tbody>' +
                    '</table>'
                '</div>' +
                '</div>';
    console.log(pop);
});