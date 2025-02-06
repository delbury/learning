# Next.js
基于 React 的 SSR 框架

## 作用
加快首屏渲染，利于 SEO

## 渲染方式
- SSG
  
  在构建时，生成静态 HTML 文件，适合动态数据性不高的场景

  `getStaticProps` `getStaticPaths`

- SSR

  在每次请求时，由服务器动态生成

  `getServerSideProps`

- ISR

  增量渲染