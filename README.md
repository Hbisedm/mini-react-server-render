# 服务端渲染

## CSR

> 需要加载一个很大的JS文件，并且渲染页面需要很长时间。

1. 客户端浏览器发送HTTP请求，
2. 服务器接收到请求，
3. 服务器解析请求，
4. 服务器处理请求，
5. 服务器返回HTTP响应，
6. 客户端浏览器接收HTTP响应，
7. 客户端浏览器解析HTTP响应，
8. 客户端浏览器渲染页面，
9. 完成页面的展示。

## SSR

> `server.js`

1. 先打包好客户端JS，
2. 然后在服务端渲染的时候，把客户端JS注入到服务端的HTML模板中，
3. 然后服务端把渲染好的HTML字符串返回给客户端，
4. 客户端浏览器接收到HTML字符串，
5. 然后解析HTML字符串，
6. 然后把HTML字符串渲染成DOM树，
7. 然后把DOM树渲染成页面，
8. 完成页面的展示。
9. hydrateRoot()方法可以把客户端渲染好的DOM树和服务端渲染好的DOM树进行融合，使得客户端和服务端渲染的HTML结构保持一致。实现更加流畅的用户体验。（事件绑定）

## SSG

> `build.js`

就是静态站点生成器，就是把HTML页面生成静态文件，然后部署到服务器上，这样用户访问页面的时候，就直接访问静态文件，不需要再经过服务端渲染。

## ISR

> `isr.js`

Incremental Static Regeneration，增量式静态重生成，就是在服务端渲染的基础上，只渲染发生变化的部分，减少渲染时间，提升用户体验。
