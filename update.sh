#!/bin/bash
# 这是个测试脚本传参的测试例子
echo "--------------------------------"
echo "更新博客 参数1 更新代码 参数2"
echo "第二个参数为 commit 信息 必须填写"
echo "--------------------------------"
if [ ! -n "$2" ];then
echo 必须输入更新原因
exit 2
fi

if [ "$1" -eq "2" ];then
    echo "现在为更新代码"

	npm run build
	#获取项目所在目录
	cd /Users/user1/Desktop/hazyzh/appidi0x590ecbp
	git add .
	git commit -m $2
	git push origin master
	ssh root@120.79.2.13
else
	echo "现在为更新博客"

	npm run render
	#获取项目所在目录
	cd /Users/user1/Desktop/hazyzh/appidi0x590ecbp
	git add .
	git commit -m $2
	git push origin master
	ssh root@120.79.2.13
fi
