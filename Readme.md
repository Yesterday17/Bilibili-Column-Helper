# Bilibili Column Helper - Bilibili 专栏助手

[![Build Status](https://travis-ci.org/Yesterday17/Bilibili-Column-Helper.svg?branch=master)](https://travis-ci.org/Yesterday17/Bilibili-Column-Helper)

## 原理

本程序以 Electron、Vue.js、Marked 以及 CodeMirror 为主要组件编写，旨在以 Markdown 书写目前并不支持 Markdown 的 Bilibili 专栏。  
从原理来看，本程序将要实现的是将 Bilibili 支持的 HTML 特性以原本的方式渲染；而对于不支持的特性（比如表格等），则进行图片的渲染，以达到相同的显示目的。

---

## 用户隐私

本程序通过 Bilibili 提供的 Ajax 登录界面，实现 Bilibili 账户的登录。账户的使用仅限图片的上传以及专栏内容的上传。

---

## 鸣谢

暂无（逃
