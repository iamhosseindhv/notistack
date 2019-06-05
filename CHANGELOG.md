Thanks to all contributers who improved notistack by opening an issue/PR.

### `notistack@0.9.0`
###### expected publish date (Jul 1, 2019)
**@molynerd**: Add support to update content of snackbar in place [#50](https://github.com/iamhosseindhv/notistack/issues/50)

<br />

### `notistack@0.8.5`
###### Jun 6, 2019
**@eps1lon**: Update peer dependency requirement for material-ui [#119](https://github.com/iamhosseindhv/notistack/issues/119)

<br />

### `notistack@0.8.5`
###### May 22, 2019
**@bcorbold**: Add `types` path to `package.json` for better IDE support [#124](https://github.com/iamhosseindhv/notistack/issues/124)

<br />

### `notistack@0.8.4`
###### May 18, 2019
* Fix minor bug with typescript definitions [`#abd04cf`](https://github.com/iamhosseindhv/notistack/commit/abd04cf3c546faa3e223172addb7673c033e1610)

<br />

### `notistack@0.8.3`
###### May 15, 2019
**@alexisab**: Add support to close all snackbars at once [#122](https://github.com/iamhosseindhv/notistack/issues/122)

<br />

### `notistack@0.8.2`
###### Apr 27, 2019
**@jgodi**: Allow snackbar children to be of type function [#114](https://github.com/iamhosseindhv/notistack/issues/114)

<br />

### `notistack@0.8.0`
###### Apr 26, 2019

**@YBogomolov**
* Add support for multiple action buttons [#107](https://github.com/iamhosseindhv/notistack/issues/107)

<br />

### `notistack@0.7.0`
###### Apr 19, 2019

**@jhrinoa @ds009 @lukejagodzinski**
* Add support for `ref` using `React.forwardRef`[#84](https://github.com/iamhosseindhv/notistack/issues/84)
* Add `hoist-non-react-statics` [#111](https://github.com/iamhosseindhv/notistack/issues/111)
* Capitalise - Rename `withSnackbarProps` interface to `WithSnackbarProps`. [#109](https://github.com/iamhosseindhv/notistack/pull/109)


## `notistack@0.6.1`
###### Apr 1, 2019

Thanks to all contributers who improved notistack by opening an issue/PR.

**@Methuselah96 @VincentLanglet**
* Remove duplicate `ClassNameMap` from `index.d.ts` [#104](https://github.com/iamhosseindhv/notistack/pull/104)

## `notistack@0.6.0`
###### Mar 30, 2019

Thanks to all contributers who improved notistack by opening an issue/PR.

**@ecwyne @Lukas-Kullmann**
* Completely deprecate and delete `onPresentSnackbar` method.
* Add support for hooks `useSnackbar` [#83](https://github.com/iamhosseindhv/notistack/pull/83)
* Add `displayName` to components exported by `withSnackbar` HOC [#100](https://github.com/iamhosseindhv/notistack/issues/100)

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

