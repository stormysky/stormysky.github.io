---
layout: post
title: 使用Jekyll搭建博客
description: "Jekyll可以将纯文本转化为静态网站和博客"
modified: 2018-01-01
tags: [Jekyll]
comments: false
image:
  feature: 
  credit: 
  creditlink: 
---

## 1.Jekyll是什么？##


> **Jekyll** 可以简单的生成静态博客站点。它有一个模版目录，其中包含原始文本格式的文档，通过 **Markdown** （或者 Textile） 以及 **Liquid** 转化成一个完整的可发布的静态网站。**Jekyll** 也可以运行在 **GitHub** 上，也就是说，你可以使用 GitHub 的服务来搭建你的项目页面、博客或者网站。

## 2.准备工作 ##
 - [Ruby download](https://www.ruby-lang.org/en/downloads/)(建议下载2.2版本以上，防止依赖包报错)
 - [RubyGem download](https://rubygems.org/pages/download/)
 
下载安装之后，终端输入，即可安装Jeyll：

	gem install jekyll

> (官方文档并不建议你在 **Windows** 平台上安装 **Jekyll**, 但是不妨碍安装使用。)


## 3.使用Jekyll ##
这里我们下载喜欢的**Jekyll模板**之后解压到目录，之后使用命令：

	jekyll build -s 模板项目目录 -d 要生成的目录地址
	jekyll s --watch  模板项目目录 -d 要生成的目录地址

然后就可以在本地看到效果。在本地调试十分适合这样子做。
下面是Jekyll的主要目录结构。

	.
	├── _config.yml
	├── _drafts
	|   ├── begin-with-the-crazy-ideas.textile
	|   └── on-simplicity-in-technology.markdown
	├── _includes
	|   ├── footer.html
	|   └── header.html
	├── _layouts
	|   ├── default.html
	|   └── post.html
	├── _posts
	|   ├── 2007-10-29-why-every-programmer-should-play-nethack.textile
	|   └── 2009-04-26-barcamp-boston-4-roundup.textile
	├── _site
	└── index.html

使用模板的好处就是适合快速入手Jekyll。之后就是看是否需要进行模板修改和升级。


### 目录结构


| Header1 | Header2 | 
|:--------|:-------:|
| _config.yml  | 保存配置数据。可以用site.xxx调用 | 
|---
| _drafts      | 存放未发布文章的目录  |
|---
| _includes    | 可以包含目录调用文件 \{ %include xxx% \}  |
|---
| _layouts     | 包裹在文章外部的模板目录。布局可以在YAML头信息中根据不同文章进行选择。  |
|---
| _posts       | 博客文章所在目录，命名格式 时间(2013-05-22)-名字.md(or .textile)  |
|---
| _site        | 生成目录，放在github中时，最好配置.gitignore中  |
{: rules="groups"}


1.安装Timezone:

	应该输入:gem install tzinfo-data timezone
	以免出现“No source of timezone data could be found. ”

2.ssl证书问题

	出现问题描述大致如下：
	SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed

**解决方法：**

首先准备好数字证书cert.pem, 下载地址：

	https://curl.haxx.se/ca/cacert.pem

#### Linux
	export SSL_CERT_FILE=/usr/local/etc/openssl/certs/cert.pem

#### Windows

	set SSL_CERT_FILE=xxxxxx\cacert.pem


[refer to Stackoverflow](https://stackoverflow.com/questions/4528101/ssl-connect-returned-1-errno-0-state-sslv3-read-server-certificate-b-certificat)