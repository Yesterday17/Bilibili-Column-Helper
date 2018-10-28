# Bilibili Column Helper - Bilibili 专栏助手

[![Build Status](https://travis-ci.org/Yesterday17/Bilibili-Column-Helper.svg?branch=master)](https://travis-ci.org/Yesterday17/Bilibili-Column-Helper)
[![Build status](https://ci.appveyor.com/api/projects/status/ima7q96vi3y5y8r0?svg=true)](https://ci.appveyor.com/project/Yesterday17/bilibili-column-helper)
[![codebeat badge](https://codebeat.co/badges/1263b75e-d5e8-4ad0-afe2-9da075ae1cde)](https://codebeat.co/projects/github-com-yesterday17-bilibili-column-helper-master-6e10e5a7-4172-448c-9dee-b3ddf67b0aa4)

## 原理

本程序以 Electron、Vue.js、Marked 以及 CodeMirror 为主要组件编写，旨在以 Markdown 书写目前并不支持 Markdown 的 Bilibili 专栏。  
从原理来看，本程序将要实现的是将 Bilibili 支持的 HTML 特性以原本的方式渲染；而对于不支持的特性（比如表格等），则进行图片的渲染，以达到相同的显示目的。

### 用户隐私

本程序通过 Bilibili 提供的 Ajax 登录界面，实现 Bilibili 账户的登录。账户的使用仅限图片的上传以及专栏内容的上传。

## 合作开发(Contribution)

### 项目与文档

本项目主要基于的开源项目如下表所示：

| ID  | 项目名称      | 项目地址                                      | 文档地址                                                   |
| --- | ------------- | --------------------------------------------- | ---------------------------------------------------------- |
| 01  | Electron      | https://electronjs.org/                       | https://electronjs.org/docs                                |
| 02  | Vue.js        | https://cn.vuejs.org/                         | https://cn.vuejs.org/v2/guide/                             |
| 03  | electron-vue  | https://github.com/SimulatedGREG/electron-vue | https://simulatedgreg.gitbooks.io/electron-vue/content/cn/ |
| 04  | bootstrap-vue | https://bootstrap-vue.js.org/                 | https://bootstrap-vue.js.org/docs                          |

### 构建过程

构建基于 yarn，如果没有安装 yarn 的话就需要执行第一步。在部分系统下（如 Ubuntu 等）使用`npm install -g`时需要带上`sudo`。

```
// 安装
npm install -g yarn
yarn install

// 运行
yarn dev

// 打包
yarn run build
```

# 鸣谢

[Bilibili zhuanlan Markdown-Tool](https://github.com/zihengCat/bilibili-zhuanlan-markdown-tool)

[Icon pack by Icons8](https://icons8.com)
