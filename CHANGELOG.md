## `notistack@0.5.1`
###### Mar 15, 2019

Thanks to all contributers who improved notistack by opening an issue/PR.

**@amakhrov**
* Fix typing for `iconVariant` props [#91](https://github.com/iamhosseindhv/notistack/issues/91)



## `notistack@0.5.0`
###### Mar 5, 2019

Thanks to all contributers who improved notistack by opening an issue/PR.

**@cwbuecheler @mpash @khhan1993 @Fs00 @martinmckenna**
* Rename `InjectedSnackbarProps` to `withSnackbarProps` in type definitions [#59](https://github.com/iamhosseindhv/notistack/issues/59)
* Add new prop `dense` to allow dense margins for snackbars (suitable for mobiles) [#58](https://github.com/iamhosseindhv/notistack/issues/58)
* Improve performance and prevent unnecessary child re-rendering [#39](https://github.com/iamhosseindhv/notistack/issues/39)


## `notistack@0.4.3`
###### Feb 24, 2019

Thanks to all contributers who improved notistack by opening an issue/PR.

**@mckernanin @butchmarshall @VincentLanglet @oliviertassinari**
* Move `classnames` and `prop-types` to `dependencies` [#72](https://github.com/iamhosseindhv/notistack/issues/72)
* Add option to `preventDuplicate` snackbars from getting into the queue. [#67](https://github.com/iamhosseindhv/notistack/pull/67)
* Add option to `persist` a notification until dismissed [#42](https://github.com/iamhosseindhv/notistack/issues/42)
* Add persist option and call `onClose` callback with `reason: maxsnack` when a snackbar is dismissed due to reaching maxSnack [#62](https://github.com/iamhosseindhv/notistack/pull/62)


## `notistack@0.4.2`
###### Feb 5, 2019

Thanks to all contributers who improved notistack by opening an issue/PR.

**@zsh1313 @james-cordeiro @xiromoreira**
* Return `event` and `reason` in onClose callback [#46](https://github.com/iamhosseindhv/notistack/issues/46)
* Add support to close snackbars programmatically [#20](https://github.com/iamhosseindhv/notistack/issues/20)


## `notistack@0.4.1`
###### Dec 10, 2018

Thanks to all contributers who improved notistack by opening an issue/PR.

**@james-cordeiro @steinbergh @sethduncan @martinmckenna**
* Allow snackbar messages of type node to be passed in enqueueSnackbar [#34](https://github.com/iamhosseindhv/notistack/pull/34)
* Allow snackbars with different heights to be stacked without overlapping on others [#35](https://github.com/iamhosseindhv/notistack/issues/35)
* Improve typings [#37](https://github.com/iamhosseindhv/notistack/pull/37)



## `notistack@0.4.0`
###### Nov 29, 2018

* Fix issue where we couldn't add custom variant icon of type string (like emojies).


## `notistack@0.3.9`
###### Nov 20, 2018

Thanks to all contributers who improved notistack by opening an issue/PR. 

**@nowaalex @nocksapp @nijk @ysgk**
* Add support for `onExited` and `onClose` props. [#21](https://github.com/iamhosseindhv/notistack/pull/21)
* Add support to pass `children` via `enqueueSnackbar`. [#23](https://github.com/iamhosseindhv/notistack/pull/23)
* Support for enqueueing multiple snackbars at once. [#14](https://github.com/iamhosseindhv/notistack/issues/14)
* Fix bug "Uncaught Error". [#26](https://github.com/iamhosseindhv/notistack/issues/26)


## `notistack@0.3.8`
###### Nov 19, 2018

Thanks to all contributers who improved notistack by opening an issue/PR. 

**@BornaP @pantharshit00**
* Fix bug where user couldn't apply css classes to mui-Snackbar `classes.root`. [#11](https://github.com/iamhosseindhv/notistack/issues/11)
* Smaller default icon variants so they don't make snackbars larger in height.
* Remove material-ui Typography `v2` warnings. [#19](https://github.com/iamhosseindhv/notistack/issues/19)

## `notistack@0.3.7`
###### Oct 22, 2018

* **More customisation**: 
  * New prop hideIconVariant to hide iconVariant.
  * Set variant of a snackbar to default, (which is the default value) and you'll have a naked snackbar ready to be customised.
  * Using classes property, specify the styles applied to snackbars when variant is set to success, error, warning or info,

* **Support for actions**:
  * Add action to all of the snackbars, or an individual snackbar.

* **New feature**:
  * Customise snackbars individually, by options parameter of enqueueSnackbar method.

