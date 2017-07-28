# blogSystem
**nodejs**、**mysql**、**markdown**

自己构建简单博客系统，技术栈如下
- node生成markdown文件,文件内包含基础配置,数据库记录时间           ---*nodefs，mysql,moment*
- 写好内容后，marked解析markdown文件本地生成静态文件，数据库记录对应信息，自定义解析标题函数，生成对应id并保存  ---*marked, webpack*
- nodejs做后台,展示生成的静态文件，同时根据博客id展示对应目录，根据id新建聊天室让用户可以交流 ---*socket.io,express*
