## 0.3.8
###### To be published
Thanks to all contributers who improved notistack by opening an issue/PR. 

**@BornaP @pantharshit00 @ysgk @Ang-YC**


* Fix bug where user couldn't apply css classes to mui-Snackbar `classes.root`. [#11](https://github.com/iamhosseindhv/notistack/issues/11)
* Smaller default icon variants so they don't make snackbars larger in height.
* Support for enqueueing multiple snackbars at once. [#14](https://github.com/iamhosseindhv/notistack/issues/14)
* Better performance when user enqueues too many snackbars at once. [#15](https://github.com/iamhosseindhv/notistack/pull/15)
* Add support to access `SnackbarContext`. [#13](https://github.com/iamhosseindhv/notistack/issues/13)
* Remove material-ui Typography `v2` warnings. [#19](https://github.com/iamhosseindhv/notistack/issues/19)

## 0.3.7
###### Oct 22, 2018

### `notistack@0.3.7`
* **More customisation**: 
  * New prop hideIconVariant to hide iconVariant.
  * Set variant of a snackbar to default, (which is the default value) and you'll have a naked snackbar ready to be customised.
  * Using classes property, specify the styles applied to snackbars when variant is set to success, error, warning or info,

* **Support for actions**:
  * Add action to all of the snackbars, or an individual snackbar.

* **New feature**:
  * Customise snackbars individually, by options parameter of enqueueSnackbar method.

