# notistack

**Notistack** is an extention to Material-ui [Snackbar](https://material-ui.com/demos/snackbars) that manages snackbars so they can be displayed and stacked on top of one another.
It's **highly customizable** and you can customize it the same way you do for Mui-Snackbars.

    
#### [`Play with online demo here`](http://iamhosseindhv.com/notistack)
  
| Stacking behaviour | Dismiss oldest when reached maxSnack (3 here)| 
| --- | --- |
| <img width="400" src="https://i.imgur.com/MtijvAK.gif"/>    | <img width="400" src="https://i.imgur.com/urX47Wn.gif"/>|



## Getting Started
Use your prefered package manager:
```
npm install notistack
yarn add notistack 
```

### Usage

**1:** Wrap your app inside a `SnackbarProvider` component: (see [docs](#docs) for a full list of available props)
```javascript
import { SnackbarProvider } from 'notistack';

<SnackbarProvider maxSnack={3}>
    <App />
</SnackbarProvider>

```



**2:** Export any component that needs to send notification using `withSnackbar`. By doing this, you'll have access to the method `enqueueSnackbar` in your props which can be used to send snackbars.

```javascript
import { withSnackbar } from 'notistack';

class MyComponent extends Component {
  handleNetworkRequest = () => {
     const { enqueueSnackbar } = this.props; 
     fetchSomeData()
        .then(() => enqueueSnackbar('Successfully fetched the data.'))
        .catch(() => enqueueSnackbar('Failed fetching data.'));
  };

  render(){
     //...
  };
  
};

export default withSnackbar(MyCompnent);
```


### Demo
**You can see the online demo and experiment all the possible configurations [`here`](http://iamhosseindhv.com/notistack).** </br>
Or see the code for a minimal working example: [`codesandbox`](https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/demo??hidenavigation=1&module=%2FApp.js) </br>
[![Edit notistack-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/iamhosseindhv/notistack/tree/master/demo)

## Docs
### **SnackbarProvider**:
All material-ui Snackbar props will get passed down to a Snackbar component. See Material-ui [docs](https://material-ui.com/api/snackbar/) for more info.
```javascript
// Maximum number of snackbars that can be stacked on top of eachother.
maxSnack            type: number          required: true        default: 3

// The little icon that is displayed in a snackbar
iconVariant         type: any             required: false       default: Material design icons

// hide or display icon variant of a snackbar
hideIconVariant     type: boolean         required: false       default: false

// event fired when user clicks on action button (if any)
onClickAction       type: func            required: false       defualt: dismisses the snackbar

// Example of a prop passed to Mui-Snackbar
transitionDuration={{ exit: 380, enter: 400 }}
```
Using material-ui `classes` prop, you can override styles applied to a snackbar based on its variant. For more info see [overriding with classes](https://material-ui.com/customization/overrides/#overriding-with-classes). This accepts the following keys:
```
classes.variantSuccess:       Styles applied to the snackbar if variant is set to 'success'.
classes.variantError:         Styles applied to the snackbar if variant is set to 'error'.
classes.variantWarning:       Styles applied to the snackbar if variant is set to 'warning'.
classes.variantInfo:          Styles applied to the snackbar if variant is set to 'info'.
```

### **withSnackbar**:
When you export your component using `withSnackbar` you'll have access to `enqueueSnackbar` method in your props which basically adds a snackbar to the queue to be displayed to the user. It takes two arguments `message` and an object of `options`.
```javascript
this.props.enqueueSnackbar(message, options)

// text of the snackbar
message         type:string         required: true

// object containing options with the following shape
options:        type:object         required: false 

// type of the snackbar
options.variant type:string         oneOf(['default', 'error', 'success', 'warning', 'info'])

// event fired when user clicks on action button (if any)
options.onClickAction   type: func          required: false       defualt: dismisses the snackbar

// You can pass material-ui Snackbar props here, and they will be applied to this individual snackbar.
// for example, this particular snackbar will be dismissed after 1sec.
options.autoHideDuration: 1000
```
**Note**: `onPresentSnackbar` has been now deprecated. Use `enqueueSnackbar` instead:
```javascript
// ❌ before:
this.props.onPresentSnackbar('variant', 'message')

// ✅ after:
this.props.enqueueSnackbar('message', { variant: 'variant' })
```

### Release notes `v0.3.0`: 
- New prop `hideIconVariant` to hide `iconVariant`.
- Set `variant` of a snackbar to `default` and apply your preferred styles.
- Add actions to a snackbar
- Customise snackbars **individually**, by `options` parameter of `enqueueSnackbar` method.
- Specify styles applied to snackbars when variant is set to success, error, etc


## Contribution
Open an issue and your problem will be solved.


### Notes
Material Design guidelines [suggests](https://material.io/design/components/snackbars.html#behavior) that only one snackbar should be displayed at a time. But I liked to stack them. 😂 So I made notistack.



## Author - Contact
Hossein Dehnokhalaji

<a href="https://www.facebook.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/facebook.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="https://www.instagram.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/instagram.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="https://www.linkedin.com/in/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/linkedin.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="mailto:hossein.dehnavi98@yahoo.com"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/contact.png" alt="Hossein Dehnokhalaji email address" align="right" width="32" height="32"/></a>
