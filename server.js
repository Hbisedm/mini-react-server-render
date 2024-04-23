import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {join} from 'path'
import { readdirSync } from 'fs';

const app = express();
app.use(express.static('public'))

const pagesDir = join(process.cwd(), "/pages")
const pages = readdirSync(pagesDir).map(page => page.split('.')[0])

console.log('pagesDir::', pagesDir);
console.log('pages::', pages);

app.get(/.*$/, async (req, res)=> {
  const path = req.path.split('/')[1]
  const page = path ? path: 'index'

  if(pages.includes(page)) {
    const file  = await import(`./pages/${page}.js`)
    const Component = file.default

    let propsObj = {}
    if(file.getServerSideProps) {
      const {props} = await file.getServerSideProps({query: req.query})
      propsObj = props
    }
    const content = renderToString(<Component {...propsObj} />)

    res.send(`
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <div id="root">
          ${content}
        </div>
        <script>
        window.__DATA__ = ${JSON.stringify({
          props: propsObj,
          page: page
        })}
      </script>
        <script src="/client.bundle.js"></script>
      </body>

    </html>
    `)
  }else {
    return res.status(200).json({ message: `${page} not found in ${pages}` });
  }


})

app.listen(3000, ()=> console.log('Server is running on port 3000'))