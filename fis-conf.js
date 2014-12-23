//fis-conf.js
fis.config.merge({
    deploy : {
        //使用fis release --dest remote来使用这个配置
        remote : {
            //如果配置了receiver，fis会把文件逐个post到接收端上
            receiver : 'http://www.example.com/path/to/receiver.php',
            //从产出的结果的static目录下找文件
            from : '/static',
            //保存到远端机器的/home/fis/www/static目录下
            //这个参数会跟随post请求一起发送
            to : '/home/fis/www/',
            //通配或正则过滤文件，表示只上传所有的js文件
            include : '**.js',
            //widget目录下的那些文件就不要发布了
            exclude : /\/widget\//i,
            //支持对文件进行字符串替换
            replace : {
                from : 'http://www.online.com',
                to : 'http://www.offline.com'
            }
        },
        //名字随便取的，没有特殊含义
        local : {
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的上一级的output目录中
            to : '../output'
        },
        //也可以是一个数组
        remote2 : [
            {
                //将static目录上传到/home/fis/www/webroot下
                //上传文件路径为/home/fis/www/webroot/static/xxxx
                receiver : 'http://www.example.com/path/to/receiver.php',
                from : '/static',
                to : '/home/fis/www/webroot'
            },
            {
                //将template目录内的文件（不包括template一级）
                //上传到/home/fis/www/tpl下
                //上传文件路径为/home/fis/www/tpl/xxxx
                receiver : 'http://www.example.com/path/to/receiver.php',
                from : '/template',
                to : '/home/fis/www/tpl',
                subOnly : true
            }
        ]
    }
});