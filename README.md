# notistack
> Big hero banner here
Highly customisable notification snackbars that can be stacked on top of each other

## Usage
Use your prefered package manager:
```
npm install notistack
yarn add notistack 
```

> short usage snippet (
>    a. wrap your (entire) app inside `SnackbarProvider`
>    b. export any component that pushes notification with `withSnackbar` HOC
>    c. now you have access to `onPresentSnackbar` in your component that can be used to push/add notification to the central snackbar.
> )


> some nice gifs

### Demo
You can see the online demo at: `_______`.
To have the demo on your machine, clone this repo:
```
git clone https://github.com/iamhosseindhv/notistack notistack
cd notistack
```
Then do the following commands in the root of the project:
```
npm install
cd demo && npm install
npm start
```


### TODO
- [ ] Support for customization of snackbars
- [ ] Some snackbars should get dismissed after timeout and some other should only get dissmissed when user clicks on dismiss/close button.