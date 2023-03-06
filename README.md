<p align="center">
  <a href="https://notistack.com/" rel="noopener" target="_blank"><img width="756" src="https://notistack.com/img/notistack-banner.png" alt="notistack logo"></a></p>
</p>

<div align="center">

**[Notistack](https://notistack.com): Display notifications with call of a function.**

</div>

<div align="center">
Easy to use, customizable, smooth transitions, stack and queue them up!
</div>
<div align="center">
<a href="https://notistack.com">Documentation</a>
<span> · </span>
<a href="https://notistack.com/features/basic">Examples</a>
</br>
</br>

[![npm version](https://img.shields.io/npm/v/notistack.svg?label=version)](https://www.npmjs.com/package/notistack)
[![npm downloads](https://img.shields.io/npm/dm/notistack.svg)](https://www.npmjs.com/package/notistack)
[![package license](https://img.shields.io/npm/l/notistack.svg)](https://www.npmjs.com/package/notistack)

</div>

<div align="center">

| Stacking behaviour | Dismiss oldest when reached maxSnack (3 here)|
| --- | --- |
| <img width="400" src="https://i.imgur.com/MtijvAK.gif"/>    | <img width="400" src="https://i.imgur.com/urX47Wn.gif"/>|

</div>

Table of Contents
--
- [How to use](#how-to-use)
- [Online demo](#online-demo)
- [Documentation](https://notistack.com/api-reference)

## Getting Started

Use your preferred package manager:
```
npm install notistack
yarn add notistack
```

#### Version guide
| Version | Notes 
| --- | --- |
| `v3.x.x` | Latest stable release. Standalone (i.e. not dependent on [material-ui](https://github.com/mui/material-ui)) |
| <= `v2.0.8` | Requires Material-UI v5 as peer dependency. `npm install notistack@2.0.8` |
| <= `1.0.10` | Requires Material-UI <= v4 as peer dependency. `npm install notistack@latest-mui-v4` |



### How to use

Instantiate a `SnackbarProvider` component and start showing snackbars: (see [docs](https://notistack.com/notistack/api-reference) for a full list of available props)

```jsx
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const App = () => {
  return (
    <div>
      <SnackbarProvider />
      <button onClick={() => enqueueSnackbar('That was easy!')}>Show snackbar</button>
    </div>
  );
};
```

Alternatively, You can use `useSnackbar` hook to display Snackbars. Just remember to wrap your app inside of a `SnackbarProvider` to have access to the hook context:

```jsx
import { SnackbarProvider, useSnackbar } from 'notistack';

// wrap your app
<SnackbarProvider>
  <App />
  <MyButton />
</SnackbarProvider>

const MyButton = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return <Button onClick={() => enqueueSnackbar('I love hooks')}>Show snackbar</Button>;
};
```

### Online demo

**Visit the [`documentation website`](https://notistack.com/features/basic) to see all the examples.**</br>
Or play with a minimal working example: [codesandbox](https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/simple-example??hidenavigation=1&module=%2FApp.js) </br>

### Contribution

Open an issue and your problem will be solved.

### Author - Contact

Hossein Dehnokhalaji

<a href="https://www.instagram.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/instagram.png" alt="Hossein Dehnokhalaji Instagram profile" align="right" width="32" height="32"/></a>
<a href="https://www.linkedin.com/in/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/linkedin.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="mailto:hossein.dehnavi98@yahoo.com"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/contact.png" alt="Hossein Dehnokhalaji email address" align="right" width="32" height="32"/></a>
