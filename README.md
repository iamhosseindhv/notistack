# notistack
![npm downloads](https://img.shields.io/npm/dm/notistack.svg)
![npm version](https://img.shields.io/npm/v/notistack.svg?label=version)
![npm version](https://img.shields.io/npm/l/notistack.svg)


**Notistack** is a Snackbar library which makes it extremely easy to display notifications on your web apps. It is **highly customizable** and enables **you** to stack snackbars/toasts on top of one another. See [demos](https://iamhosseindhv.com/notistack/demos) for more info. 

    
#### [`Play with online demo here`](https://iamhosseindhv.com/notistack/demos)
  
| Stacking behaviour | Dismiss oldest when reached maxSnack (3 here)| 
| --- | --- |
| <img width="400" src="https://i.imgur.com/MtijvAK.gif"/>    | <img width="400" src="https://i.imgur.com/urX47Wn.gif"/>|


Table of Contents
--
- [How to use](#how-to-use)
- [Online demo](#online-demo)
- [Documentation](#documentation)
- [Redux / Mobx support](#redux-and-mobx-support)
- [Contribution](#contribution)
- [Notes](#notes)
- [Author - Contact me](#author---contact)


## Getting Started
Use your preferred package manager:
```
npm install notistack
yarn add notistack 
```

### How to use

**1:** Wrap your app inside a `SnackbarProvider` component: (see [docs](https://iamhosseindhv.com/notistack/api) for a full list of available props)
<br />
**Note:** If you're using material-ui `ThemeProvider`, make sure `SnackbarProvider` is a child of it.
```jsx
import { SnackbarProvider } from 'notistack';

<SnackbarProvider maxSnack={3}>
    <App />
</SnackbarProvider>

```


**2:** Export any component that needs to send notification using `withSnackbar`. By doing this, you'll have access to methods `enqueueSnackbar` and `closeSnackbar`, where the former can be used to send snackbars.

```javascript
import { withSnackbar } from 'notistack';

class MyComponent extends Component {
  handleNetworkRequest = () => {
     fetchSomeData()
        .then(() => this.props.enqueueSnackbar('Successfully fetched the data.'))
        .catch(() => this.props.enqueueSnackbar('Failed fetching data.'));
  };

  render(){
     //...
  };
  
};

export default withSnackbar(MyComponent);
```


### Online demo
**You can see the online demo and experiment all the possible configurations [`here`](https://iamhosseindhv.com/notistack/demos).**</br>
Or see the code for a minimal working example: [codesandbox](https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/simple-example??hidenavigation=1&module=%2FApp.js) </br>


### Documentation
#### [`Visit the documentation website`](https://iamhosseindhv.com/notistack/api)


### Redux and Mobx support:
notistack is compatible with state management libraries such as Redux and Mobx. See notistack [documentation](https://iamhosseindhv.com/notistack/demos#redux-/-mobx-example) for more info.

### Contribution
Open an issue and your problem will be solved.


#### Notes
Material Design guidelines [suggests](https://material.io/design/components/snackbars.html#behavior) that only one snackbar should be displayed at a time. But I liked to stack them. 😁 So I made notistack. But if you'd like to stick to the guidelines, you can set `maxSnack` to `1` and just take advantage of `enqueueSnackbar` function.


### Author - Contact
Hossein Dehnokhalaji

<a href="https://www.instagram.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/instagram.png" alt="Hossein Dehnokhalaji Instagram profile" align="right" width="32" height="32"/></a>
<a href="https://www.linkedin.com/in/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/linkedin.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="mailto:hossein.dehnavi98@yahoo.com"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/contact.png" alt="Hossein Dehnokhalaji email address" align="right" width="32" height="32"/></a>
