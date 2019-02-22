

#### Adding XiaoZao Analytics to Your Site

``` html
<script>
(function(i,s,o,g,r,a,m){i['XiaoZaoAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)};
a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})
(window,document,'script','xiaozao_analytics_0.0.4.js','xa');
</script>
```

###### The above code does four main things:

 1. Creates a script element that starts asynchronously downloading the
    analytics.js JavaScript library from Here

 2. Initializes a global **xa** function (called the xa() command queue)
    that allows you to schedule commands to be run once the analytics.js
    library is loaded and ready to go

#### API DOC

###### Basic Data
| Field Name | Required |  Description |
| :------------: | :------------: | ------------ |
| cid        | true     |  客户端 ID 此字段的值应为一个随机 UUID  |
| uid        |          |  用户 ID 小灶号 |
| ua         |          |  user-agent|
| cs         |          |  渠道来源 用于外部入口 场景例如推二维码、广告、第三方公众号推广小程、 公众号、小程序、模板客服消息、社群|
| an         |          |  业务跟踪 用于业务跟踪 场景例如feed流、分享、生成特定的跟踪链接|
| aid        |          |  业务跟踪参数 用于业务跟踪中需要跟随的参数 例如feed流开始时间、分享人 |
| sr         |          |  屏幕分辨率|
| de         |          |  文档编码|
| sd         |          |  屏幕颜色深度|
| vp         |          |  指定浏览器/设备的可视区域大小|
| ul         |          |  用户语言|
| t	         |          |  匹配类型 必须是“pageview”、“event”、“exception”、“timing”中的一个。|
| utc        |          |  计时匹配类型 对于timing匹配类型是必填项 |
| utv        |          |  计时变量名称 对于timing匹配类型是必填项 |
| utt        |          |  计时时间 对于timing匹配类型是必填项 |
| utl        |          |  计时标签 |
| plt        |          |  网页加载时间 |
| dns        |          |  DNS 时间 |
| pdt        |          |  网页下载时间 |
| rrt        |          |  重定向响应时间 |
| tcp        |          |  TCP 连接时间 |
| srt        |          |  服务器响应时间 |
| dit        |          |  DOM 互动时间 |
| clt        |          |  内容加载时间 |
| tmt        | true     |  触发时间   |
| cmt        | true     |  上报时间   |
| exd        |          |  异常说明 对于exception匹配类型是必填项 |
| exf        |          |  异常级别 对于exception匹配类型是必填项 |
| ter        | true     |  终端   |
| app        | true     |  应用   |
| ver        | true     |  版本   |
| xid        |          |  实验id |

###### PageView Data
| Field Name | Required |  Description |
| :------------: | :------------: | ------------ |
| dl         |          |  文档位置网址 对于pageview匹配类型是必填项|
| dh         |          |  文档主机名 对于pageview匹配类型是必填项|
| dp         |          |  文档路径 对于pageview匹配类型是必填项|
| dt         |          |  文档标题|

###### Event Data
| Field Name | Required |  Description |
| :------------: | :------------: | ------------ |
| ec    	 |          |  事件类别 对于event匹配类型是必填项|
| ea    	 |          |  事件操作 对于event匹配类型是必填项|
| el    	 |          |  事件标签|
| ev    	 |          |  事件价值|


#### Creating Trackers
**==Please Fucking Set User Info In Sdk In XiaoZao Page #F44336==**

```
xa('set', 'basic', { uid: '', app: '' })
```

```
xa('send', 'pageview');
```

```
xa('send', 'event', { ec: 'click', el: 'anywhere' }, ['']);
```

#### XiaoZao Analytics set the following cookies:

| Cookie Name | Expiration Time |  Description |
| :------------: | :------------: | ------------ |
| _xa_cid | 1 years | Used to distinguish users. |


#### Defualt Trackers

| type | ec | ea | el | ev |  Description |
| :------------: | :------------: |:------------: |:------------: |:------------: | ------------ |
| event | leave |	|stay_time |	 | 页面停留时长(ms) |

### Search

###### aliyun
