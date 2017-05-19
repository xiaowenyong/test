/**
 * Created by Administrator on 2017/5/19.
 */
(function () {
    //初始化
     function init() {
         //实例化
         var recoder = new Recoder();
         //获得开始按钮元素，开始点击事件
         document.querySelector('.recoderButton').onclick = function () {
             recoder.recoder();
         };
         //获得停止按钮元素，停止点击事件
         document.querySelector('.stopRecoderButton').onclick = function () {
             recoder.stop();
         };
     }
    init()
})();