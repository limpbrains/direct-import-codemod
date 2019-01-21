# direct-import-codemod
JS codemod to use with [facebook/jscodeshift](https://github.com/facebook/jscodeshift).

Based on awesome example by @JamieMason
[JamieMason/codemods](https://github.com/JamieMason/codemods).

## Installation

```sh
git clone https://github.com/limpbrains/direct-import-codemod.git
cd direct-import-codemod
npm install
```

## Usage

```
# yarn
yarn direct-import <path-to-file> -- --module '@material-ui/core'

# npm
npm run direct-import <path-to-file> -- --module '@material-ui/core'

# jscodeshift
jscodeshift -t ./transforms/direct-import.js <path-to-file> --module '@material-ui/core'
```

This will replace one import of `@material-ui/core` to number of separate imports

```diff
-import { Button, Dialog } from '@material-ui/core';
+import Button from "@material-ui/core/Button";
+import Dialog from "@material-ui/core/Dialog";
```
