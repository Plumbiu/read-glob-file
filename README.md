# read-glob-file

Read all files in the specified folder

## Install

```bash
npm i read-glob-file
```

## Usage

### `readGlobFile`

Read Txt or other file, By Default, the result's key is the file path.

```ts
import { readGlobFile } from 'read-glob-file'

const fileContent = readGlobFIle('./', 'a.txt')
console.log(fileContent) // { 'a.txt': 'xxx', 'src/a.txt: 'xxx' }
```

**Read JSON file:**

```ts
import { readGlobFile } from 'read-glob-file'

const fileContent = readGlobFIle('./', 'a.json', {
  type: 'json',
  /**
   * name option is to indicate the key of result
   */
  name: 'name'
})
console.log(fileContent)
```

Example:

```json
{
  "name": "example",
  "content": "hello"
}
```

The output should be:

```ts
fileContent = {
  example: {
    name: 'example',
    content: 'hello'
  }
}
```

> if json file doesn't have `name`, the key will be file path.

**Ignore dirs:**

```ts
import { readGlobFile } from 'read-glob-file'

const fileContent = readGlobFIle('./', 'a.txt', {
  excludedDir: 'node_modules'
})
console.log(fileContent)
```

the `excludeDir` option support [minimatch](https://github.com/isaacs/minimatch#readme), see [@rollup/plugintuils](https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter) to get more infomation.

**Indicate depth:**

```ts
import { readGlobFile } from 'read-glob-file'

const fileContent = readGlobFIle('./', 'a.txt', {
  // This will ignore dir in the './'  and only read 'a.txt' in the './'
  depth: 0
})
console.log(fileContent)
```

