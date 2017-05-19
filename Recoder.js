/**
 * Created by Administrator on 2017/5/19.
 */
(function () {
    //构造函数
    function Recoder() {
        //缓存数组
        this.buffers = [];
        //调用getMediaStream方法
        this.getMediaStream();
    }
    //获得媒体流
    Recoder.prototype.getMediaStream = function () {
        //获取视频
        var config = {video:true};
        //成功
        var self = this;
        function success(stream) {
            //获得媒体对象，这里是获得额视频对象
            self.mediaRecorder = new MediaRecorder(stream);
            //监听一个事件  dataavilable是每次监听的媒体流
            self.mediaRecoder.addEventListener("dataavailable",function (event) {
                //buffers缓存  push像数组结尾添加一个元素，并返回新的长度
                self.buffers.push(event.data);
                console.log(event);
            });
            //得到有效数据的时候给他一个监听的事件
            self.addEventListener();
        }
        //失败
        function fail(error) {
            console.log(error);
        }
        //获得媒体流 then()获取到成功 catch()失败的 将成功或者失败的方法写在外面
        //这里是getUserMedia返回的then和catch
        //navigator领航的 mediaDevices媒体设备
        //获得的媒体返回成功或者失败
        navigator.mediaDevices.getUserMedia(config).then(success).catch(fail);
        //监听方法
        Recoder.prototype.addEventListener = function () {
            var self = this;
            this.mediaRecoder.addEventListener("stop",function () {
                //把缓存数组转化成二进制一个对象 "video/webm"规定格式、
                //blob文件对象
                var blob = new Blob(self.buffers,{mimeType:"video/mp4"});
                //得到url
                var url = URL.createObjectURL(blob);
                //将录完的像保存到video便签进行播放
                var video = document.createElement("video");//创建一个video元素
                video.src = url;//video文件路径
                document.body.appendChild(video);//将创建的video标签放在body
                video.autoplay = true;//自动播放
                //当视频播放结束后删除video元素
                video.onended = function () {
                    //removeChild删除某个节点
                    document.body.removeChild(this)
                };
                var downloadButton = document.createElement('a');//创建一个a元素用来下载
                downloadButton.textContent = "下载";//a元素的文本内容
                downloadButton.href = url;//链接路径
                downloadButton.download = url;//下载路径
                document.body.appendChild(downloadButton);//在body内创建

            });

        };
        //开始
        Recoder.prototype.start = function () {
            //判断是否正在录制
            if (this.mediaRecoder.start == "recording"){
                return;
            }
            this.mediaRecoder.start();
        };
        //继续录制
        Recoder.prototype.recoder = function () {
            //判断是否暂停
            if (this.mediaRecoder.start == "paused"){
                //从新开始
                this.mediaRecoder.resume();
            }else {
                this.start();
            }
        };
        //暂停的方法
        Recoder.prototype.pause = function () {
            this.mediaRecoder.pause();
        };
        //停止的方法
        Recoder.prototype.stop = function () {
            this.mediaRecoder.stop();
        }
    };
    //全局化
    window.Recoder = Recoder;
})();