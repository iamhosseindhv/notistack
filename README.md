# notistack
> Big hero banner here

> descriotion that says this is an extention to material-ui snackbar and you of course you can customise MUISnackbar.
> Highly customisable notification snackbars that can be stacked on top of each other


> some HQ nice gifs


## Getting Started
Use your prefered package manager:
```
npm install notistack
yarn add notistack 
```

### Usage

1. Wrap your app inside a `SnackbarProvider` component: (see [docs](#docs) for a full list of available props)
```javascript
import { SnackbarProvider } from 'notistack';

<SnackbarProvider maxSnack={3}>
    <App />
</SnackbarProvider>

```



2. Export any component that needs to send notification using `withSnackbar`.

```javascript
import { withSnackbar } from 'notistack';

class MyComponent extends Component {
  
  handleNetworkRequest = () => {
     const { onPresentSnackbar } = this.props; 
     fetchSomeData()
        .then(() => onPresentSnackbar('success', 'Successfully uploaded the file.'))
        .catch(() => onPresentSnackbar('error', 'Failed uploading the file.'));
  };

  render(){
     //...
  };
  
};

export default withSnackbar(MyCompnent);
```
By doing this, you'll have access to the method `onPresentSnackbar` in your props which can be used to send notifications.


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


## Notes
-- link to google material design that says don't stack snackbars (we don't care)


## Author


### Contribution
Open an issue and your problem will be solved.


## License
MIT


## TODO
- [ ] Support for customization of snackbars
- [ ] Some snackbars should get dismissed after timeout and some other should only get dissmissed when user clicks on dismiss/close button.