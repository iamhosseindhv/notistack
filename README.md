<p align="center">
  <a href="https://notistack.com/" rel="noopener" target="_blank"><img width="756" src="https://notistack.com/img/notistack-banner.png" alt="notistack logo"></a></p>
</p>

<div align="center">

[**Notistack**](https://notistack.com) is a notification library which makes it extremely easy to display notifications on your web apps. It is highly customizable and enables you to stack snackbars/toasts on top of one another.
</br>
**Visit the [documentation website](https://notistack.com/examples) for demos**.

[![npm version](https://img.shields.io/npm/v/notistack.svg?label=version)](https://www.npmjs.com/package/notistack)
[![npm downloads](https://img.shields.io/npm/dm/notistack.svg)](https://www.npmjs.com/package/notistack)
[![package license](https://img.shields.io/npm/l/notistack.svg)](https://www.npmjs.com/package/notistack)


</div>



| Stacking behaviour | Dismiss oldest when reached maxSnack (3 here)|
| --- | --- |
| <img width="400" src="https://i.imgur.com/MtijvAK.gif"/>    | <img width="400" src="https://i.imgur.com/urX47Wn.gif"/>|

Table of Contents
--
- [How to use](#how-to-use)
- [Online demo](#online-demo)
- [Documentation](https://notistack.com/notistack/api-reference)

## Getting Started

Use your preferred package manager:

```
npm install notistack
yarn add notistack
```

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

```javascript
import { SnackbarProvider, useSnackbar } from 'notistack';

// wrap your app
<SnackbarProvider>
    <App />
    <MyButton />
</SnackbarProvider>;

const MyButton = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return <Button onClick={() => enqueueSnackbar('I love hooks')}>Show snackbar</Button>;
};
```

### Online demo

**Visit the [`documentation website`](https://notistack.com/examples) to see all the examples.**</br>
Or play with a minimal working example: [codesandbox](https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/simple-example??hidenavigation=1&module=%2FApp.js) </br>

### Contribution

Open an issue and your problem will be solved.

### Author - Contact

Hossein Dehnokhalaji

<a href="https://www.instagram.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/instagram.png" alt="Hossein Dehnokhalaji Instagram profile" align="right" width="32" height="32"/></a>
<a href="https://www.linkedin.com/in/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/linkedin.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="mailto:hossein.dehnavi98@yahoo.com"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/contact.png" alt="Hossein Dehnokhalaji email address" align="right" width="32" height="32"/></a>
