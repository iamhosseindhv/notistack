Thanks to all contributers who improved notistack by opening an issue/PR.

### `notistack@1.0.9`
###### May 19, 2021
* **@SimonAmphora** Remove the need to use `!important` to customise variant styles [#215 (comment)](https://github.com/iamhosseindhv/notistack/issues/215#issuecomment-700060481) 

<br />

### `notistack@1.0.8`
###### May 18, 2021
* **@angeshpc91** Fixes issues with centered snackbars on xs screen sizes [#380](https://github.com/iamhosseindhv/notistack/issues/380) 

<br />

### `notistack@1.0.7`
###### May 8, 2021
* **@whytspace** Multiple Snackbars always left aligned [#373](https://github.com/iamhosseindhv/notistack/issues/373) 


<br />


### `notistack@1.0.6`
###### April 18, 2021
* **@rzmz** Snackbars should have equal width on XS screens [#367](https://github.com/iamhosseindhv/notistack/issues/367) 


<br />


### `notistack@1.0.5`
###### February 28, 2021
* Prevent snackbars from having the same width [#356](https://github.com/iamhosseindhv/notistack/pull/356) 


<br />


### `notistack@1.0.4`
###### February 23, 2021
* **@tarazena**: Export missing SnackbarContent for TypeScript [#354](https://github.com/iamhosseindhv/notistack/pull/354) 

<br />


### `notistack@1.0.3`
###### December 23, 2020
* **@gregorysl** **@lephleg** **@joaogardenberg** Add support for React 17 [#339](https://github.com/iamhosseindhv/notistack/pull/339) 


<br />


### `notistack@1.0.2`
###### November 26, 2020
* Add support for MUI v5 [#333](https://github.com/iamhosseindhv/notistack/pull/333) 


<br />


### `notistack@1.0.1`
###### October 6, 2020
* **@thierrysantos**: EnqueueSnackbar supports snackbar with key zero [#318](https://github.com/iamhosseindhv/notistack/pull/318)
* Fix various typescript inconsistencies [#319](https://github.com/iamhosseindhv/notistack/pull/319) 


<br />

### `notistack@1.0.0`
###### August 22, 2020
* Drop `SnackbarContent` component and `ContentProps` props [#297](https://github.com/iamhosseindhv/notistack/pull/297)
#### Breaking Changes
* `className` prop is now used to customise styles applied to the _content_ of snackbar (e.g. backgroundColor).
* If you were using `className` to apply styles to `Snackbar` component, you should now do so using `classes.root`.
```diff
<SnackbarProvider
-  className={classes.snackbar}
+  classes={{
+    root: classes.snackbar
+  }}
>
```

* `ContentProps` prop is not supported anymore. Here are alternative ways to pass the same data to snackbar component. For any other
scenario, you should pass you own [custom content](https://iamhosseindhv.com/notistack/demos#custom-snackbar).
```diff
<SnackbarProvider
-  ContentProps={{
-    action: () => <button>dismiss</button>,
-    'aria-describedby': 'some-value',
-  }}
+  action={() => <button>dismiss</button>}
+  ariaAttributes={{
+    'aria-describedby': 'some-value'
+  }}
>
```
* If you have customised `MuiSnackbarContent` through Material-UI `theme` object, these changes won't automatically
reflect within notistack. You can however, use `className` prop to apply your customisations.

```js
const theme = createMuiTheme({
  overrides: {
    // no effect within notistack
    MuiSnackbarContent: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});
```

<br />

### `notistack@0.9.17`
###### June 10, 2020
* Bug fix and improvments [#277](https://github.com/iamhosseindhv/notistack/issues/277) 
* Alternative for Object.entries to better support IE 11 compat [#284](https://github.com/iamhosseindhv/notistack/pull/284)


<br />

### `notistack@0.9.16`
###### May 17, 2020
* **@lukawsk**: Allow autoHideDuration be null [#273](https://github.com/iamhosseindhv/notistack/pull/273) 


<br />


### `notistack@0.9.15`
###### May 17, 2020
* **@nebojsanb**: Fix bug with displaying snackbars [#270](https://github.com/iamhosseindhv/notistack/issues/270) 
* **@nebojsanb**: Improve bundle size by removing `react-is` dependency [#272](https://github.com/iamhosseindhv/notistack/pull/272)

<br />


### `notistack@0.9.14`
###### May 15, 2020
* Reduce bundle size. Many thanks to @merceyz [#268](https://github.com/iamhosseindhv/notistack/pull/268) [#209](https://github.com/iamhosseindhv/notistack/pull/209) [#163](https://github.com/iamhosseindhv/notistack/issues/163)


<br />


### `notistack@0.9.13`
###### May 12, 2020
* Exclude `tsconfig.json` in the build [#266](https://github.com/iamhosseindhv/notistack/pull/266)



<br />


### `notistack@0.9.12`
###### May 12, 2020
* **@iinitz**: Enforce white text for dark theme [#241](https://github.com/iamhosseindhv/notistack/pull/241)
* **@fbarbare**: Let Mat UI handle the font and border-radius [#262](https://github.com/iamhosseindhv/notistack/pull/262)
* **@tomohiro-iwana @JuanmaMenendez**: Fix bug with snackbar not being centered on `xs` screens [#232](https://github.com/iamhosseindhv/notistack/issues/232)
* Add new `containerRoot` class to `SnackbarContainer` [#263](https://github.com/iamhosseindhv/notistack/pull/263)
* Use filled icons as default icon variant [#265](https://github.com/iamhosseindhv/notistack/pull/265)

<br />

### `notistack@0.9.11`
###### April 20, 2020
* **@mehmetkose @andrewmclagan @oliviertassinari @merceyz**: Reduce Bundle size by using `clsx` instead of `classnames`, Use `babel-plugin-optimize-clsx` [#163](https://github.com/iamhosseindhv/notistack/issues/163)
* **@kikoanis** Fix bug with custom variant `classes` [#251](https://github.com/iamhosseindhv/notistack/issues/251)
* Drop support for Material UI v3



<br />

### `notistack@0.9.10`
###### April 17, 2020
* Migrate codebase to typescript.


<br />


### `notistack@0.9.9`
###### March 6, 2020
* **DASPRiD** Directly return snackbar context in useSnackbar [#223](https://github.com/iamhosseindhv/notistack/pull/223)
* **dalborgo** Add support to set default variant on SnackbarProvider [#180](https://github.com/iamhosseindhv/notistack/issues/180)
* **dalborgo** Deprecate support for `children` in `enqueueSnackbar` options.

<br />


### `notistack@0.9.8`
###### Feb 23, 2020
* **@svish**: Correct enqueueSnackbar typing [#217](https://github.com/iamhosseindhv/notistack/issues/217)
* **@dgczhh**: Make sure `onClose` callback that's been passed through options parameter of `enqueueSnackbar` gets called when snackbar is closed using `closeSnackbar` function [#220](https://github.com/iamhosseindhv/notistack/issues/220)
* **@JoseLion**: Add snackbar key to transition handler parameters. Fix transition handler callback types [#214](https://github.com/iamhosseindhv/notistack/issues/214)


<br />

### `notistack@0.9.7`
###### Dec 1, 2019
* **@PeterMK85**: Add support for React portals [#179](https://github.com/iamhosseindhv/notistack/pull/179)
* **@ly-vo**: Pass `message` (as well as `key`) in `content` prop callback [#198](https://github.com/iamhosseindhv/notistack/issues/198)
* **@simonbos**: Allow safe override of `TransitionProps` [#194](https://github.com/iamhosseindhv/notistack/pull/194)

<br />


### `notistack@0.9.6`
###### Nov 12, 2019
* **@JimmyMultani**: Allow snackbar key `0` to be passed [#187](https://github.com/iamhosseindhv/notistack/pull/187)
* **@williammetcalf**: Allow preventDuplicate prop to be overridden by individual snackbar [#188](https://github.com/iamhosseindhv/notistack/pull/188)
* **@simonbos**: Fix `setState` race condition [#189](https://github.com/iamhosseindhv/notistack/pull/189)
* **@kriim**: `preventDuplicate` by comparing keys (if specified) [#190](https://github.com/iamhosseindhv/notistack/pull/190)


<br />

### `notistack@0.9.5`
###### Oct 16, 2019
* **@mehmetkose @oliviertassinari**: Improve bundle size [#163](https://github.com/iamhosseindhv/notistack/issues/163)
* **@Grabauskas**: Make sure published package is free of trash [#185](https://github.com/iamhosseindhv/notistack/issues/185)

<br />

### `notistack@0.9.4`
###### Oct 10, 2019 
* **@Brettm12345**: Add support to close snackbar on click away [#182](https://github.com/iamhosseindhv/notistack/issues/182) 
* **@Brettm12345**: Add support to globally customize the default snackbar [#180](https://github.com/iamhosseindhv/notistack/issues/180) 

<br />

### `notistack@0.9.3`
###### Oct 6, 2019
* **@FredyC**: Prevent snackbar processing on `SnackbarProvider` unmount [#173](https://github.com/iamhosseindhv/notistack/pull/173)
* **@nick-cromwell**: Allow customising snackbar container styles [#172](https://github.com/iamhosseindhv/notistack/pull/172)

<br />

### `notistack@0.9.2`
###### Sep 24, 2019
**@ryan-gray**: Remove deprecated materila-ui spacing unit [#169](https://github.com/iamhosseindhv/notistack/issues/169) 

<br />

### `notistack@0.9.1`
###### Sep 23, 2019
**@vyushin**: Add support for resizable snackbars [#164](https://github.com/iamhosseindhv/notistack/pull/164)

<br />

### `notistack@0.9.0`
###### Sep 4, 2019
**@ProtectedVoid**: Improves accessibility of snackbars [#153](https://github.com/iamhosseindhv/notistack/issues/153)

<br />

### `notistack@0.8.9`
###### Jul 23, 2019
**@YIZHUANG**: Allow overriding some of `iconVariant`s [#136](https://github.com/iamhosseindhv/notistack/issues/136)


<br />

### `notistack@0.8.8`
###### Jun 29, 2019
**@dgreuel**: Bug fix - add prop-types to dependencies [#139](https://github.com/iamhosseindhv/notistack/issues/139)


<br />

### `notistack@0.8.7`
###### Jun 25, 2019
**@jhrinoa**: Update prop-types versions in package.json [#134](https://github.com/iamhosseindhv/notistack/issues/134)


<br />

### `notistack@0.8.6`
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

