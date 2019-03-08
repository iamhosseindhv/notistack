# notistack
![npm downloads](https://img.shields.io/npm/dm/notistack.svg)
![npm version](https://img.shields.io/npm/v/notistack.svg?label=version)
![npm version](https://img.shields.io/npm/l/notistack.svg)


**Notistack** is an extention to Material-UI [Snackbar](https://material-ui.com/demos/snackbars). notistack makes it extremely easy to display snackbars (so you don't have to deal with open/close state of them), and also enables **you** to stack snackbars on top of one another. It's **highly customizable** and you can customize snackbars the same way you do for Mui-Snackbars.

    
#### [`Play with online demo here`](https://iamhosseindhv.com/notistack)
  
| Stacking behaviour | Dismiss oldest when reached maxSnack (3 here)| 
| --- | --- |
| <img width="400" src="https://i.imgur.com/MtijvAK.gif"/>    | <img width="400" src="https://i.imgur.com/urX47Wn.gif"/>|


Table of Contents
--
- [How to use](#how-to-use)
- [Online demo](#online-demo)
- [Documentation](#documentation)
    - [`SnackbarProvider`](#snackbarprovider)
    - [`withSnackbar`](#withsnackbar)
    - [Redux support](#redux-support)
- [Contribution](#contribution)
- [Notes](#notes)
- [Author - Contact me](#author---contact)


## Getting Started
Use your prefered package manager:
```
npm install notistack
yarn add notistack 
```

## How to use

**1:** Wrap your app inside a `SnackbarProvider` component: (see [docs](#documentation) for a full list of available props)
```javascript
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


## Online demo
**You can see the online demo and experiment all the possible configurations [`here`](https://iamhosseindhv.com/notistack).**</br>
Or see the code for a minimal working example: [codesandbox](https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/examples/simple-example??hidenavigation=1&module=%2FApp.js) </br>


## Documentation
#### [`See full docs here`](https://iamhosseindhv.com/notistack)

### **SnackbarProvider**:
All material-ui Snackbar props will get passed down to a Snackbar component. See Material-ui [docs](https://material-ui.com/api/snackbar/) for more info.
```javascript
// Maximum number of snackbars that can be stacked on top of eachother.
maxSnack            type: number          required: false        default: 3

// The little icon that is displayed in a snackbar
iconVariant         type: any             required: false       default: Material design icons

// Hide or display icon variant of a snackbar
hideIconVariant     type: boolean         required: false       default: false

// Event fired when user clicks on action button (if any)
onClickAction       type: func            required: false       default: Dismiss the snackbar

// Do not allow snackbars with the same message to be displayed multiple times
preventDuplicate    type: boolean         required: false       default: false

// Denser margins for snackbars. Recommended to be used on mobile devices
dense               type: boolean         required: false       default: false

// Example of a Mui-Snackbar prop
transitionDuration={{ exit: 380, enter: 400 }}
```
Using material-ui `classes` prop, you can override styles applied to a snackbar based on its variant. For more info see [overriding with classes](https://material-ui.com/customization/overrides/#overriding-with-classes). This accepts the following keys:
```
classes.variantSuccess:       Styles applied to the snackbar if variant is set to 'success'.
classes.variantError:                                                   is set to 'error'.
classes.variantWarning:                                                 is set to 'warning'.
classes.variantInfo:                                                    is set to 'info'.
```

### **withSnackbar**:
When you export your component using `withSnackbar`, you'll have access to `enqueueSnackbar` and `closeSnackbar` methods in your props. 

#### `enqueueSnackbar`
Adds a snackbar to the queue to be displayed to the user. It takes two arguments `message` and an object of `options` and returns a key that is used to reference that snackbar later on. (e.g. to dismiss it programmatically)

```javascript
const key = this.props.enqueueSnackbar(message, options)

// text of the snackbar
message                 type:string         required: true

// object containing options with the following shape
options:                type:object         required: false 

// type of the snackbar
options.variant         type:string         oneOf(['default', 'error', 'success', 'warning', 'info'])

// keep a snackbar in the view and prevent auto dismissal
options.persist         type:boolean        required: false

// hide or display this message if it's the same of the previous one
options.preventDuplicate type:boolean        required: false

// You can pass any material-ui Snackbar prop here, and they will be applied to this 
// individual snackbar. For example, this particular snackbar will get dismissed after 1 second.
options.autoHideDuration: 1000
```
**Note**: `onPresentSnackbar` has been now deprecated. Use `enqueueSnackbar` instead:
```javascript
// ❌ before:
this.props.onPresentSnackbar('variant', 'message')

// ✅ after:
this.props.enqueueSnackbar('message', { variant: 'variant' })
```

#### `closeSnackbar`
Dismiss snackbar with the given key.
```javascript
this.props.closeSnackbar(key)

// id returned by enqueueSnackbar - in order to reference a snackbar
key             type: string|number     required: true
```

### Redux support:
You can use notistack to send snackbars from reducers. See notistack [documentation](https://iamhosseindhv.com/notistack#redux-example) for more info.

## Contribution
Open an issue and your problem will be solved.


### Notes
Material Design guidelines [suggests](https://material.io/design/components/snackbars.html#behavior) that only one snackbar should be displayed at a time. But I liked to stack them. 😁 So I made notistack. But if you'd like to stick to the guidelines, you can set `maxSnack` to `1` and just take advantage of `enqueueSnackbar` function.


## Author - Contact
Hossein Dehnokhalaji

<a href="https://www.facebook.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/facebook.png" alt="Hossein Dehnokhalaji Facebook profile" align="right" width="32" height="32"/></a>
<a href="https://www.instagram.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/instagram.png" alt="Hossein Dehnokhalaji Instagram profile" align="right" width="32" height="32"/></a>
<a href="https://www.linkedin.com/in/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/linkedin.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="mailto:hossein.dehnavi98@yahoo.com"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/contact.png" alt="Hossein Dehnokhalaji email address" align="right" width="32" height="32"/></a>
