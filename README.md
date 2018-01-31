# xp-loadcss
动态导入js，支持promise

### Usage

```js
import loadcss from 'xp-loadcss'

// single file
loadcss('https://cdn.bootcss.com/animate.css/3.5.2/animate.css')
  .then(() => {
    console.log('load success')
  })
  .catch(() => {
    console.log('load error')
  })

// multiple files
loadcss(['https://cdn.bootcss.com/animate.css/3.5.2/animate.css', 'https://cdn.bootcss.com/hover.css/2.1.1/css/hover.css'])
  .then(() => {
    console.log('load success')
  })
  .catch(() => {
    console.log('load error')
  })
```
