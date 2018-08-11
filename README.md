# notistack

> Hero banner here (Material-ui logo and Notistack logo)

**Notistack** is an extention to Material-ui [Snackbar](https://material-ui.com/demos/snackbars) that manages snackbars so they can be displayed and stacked on top of one another.
It's **highly customizable** and you can customize it the same way you do for Mui-Snackbars.

    
| Stacking behaviour | Dissmiss oldest when reached maxSnack (3 here)| 
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



**2:** Export any component that needs to send notification using `withSnackbar`. By doing this, you'll have access to the method `onPresentSnackbar` in your props which can be used to send snackbars.

```javascript
import { withSnackbar } from 'notistack';

class MyComponent extends Component {
  
  handleNetworkRequest = () => {
     const { onPresentSnackbar } = this.props; 
     fetchSomeData()
        .then(() => onPresentSnackbar('success', 'Successfully fetched the data.'))
        .catch(() => onPresentSnackbar('error', 'Failed fetching data.'));
  };

  render(){
     //...
  };
  
};

export default withSnackbar(MyCompnent);
```


### Demo
You can see the online demo at: `_______`.
To play with the demo locally, do the following:
```
git clone https://github.com/iamhosseindhv/notistack
cd notistack

npm install
cd demo && npm install
npm start
```


## Docs


### Notes
-- link to google material design that says don't stack snackbars (we don't care)


### Future
- [ ] Allow snackbar type customization 
- [ ] Some snackbars should get dismissed after timeout and some other should only get dissmissed when user clicks on dismiss/close button.


### Contribution
Open an issue and your problem will be solved.


## Author - Contact
Hossein Dehnokhalaji

<a href="https://www.facebook.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/facebook.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="https://www.instagram.com/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/instagram.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="https://www.linkedin.com/in/iamhosseindhv"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/linkedin.png" alt="Hossein Dehnokhalaji Linkedin profile" align="right" width="32" height="32"/></a>
<a href="mailto:hossein.dehnavi98@yahoo.com"><img src="https://github.com/iamhosseindhv/Rentaly/blob/master/Gifs/contact.png" alt="Hossein Dehnokhalaji email address" align="right" width="32" height="32"/></a>

### License
MIT
> MIT badge at the top of the repo
