

# Migration from v0/v1 to v2

# Motivation
Notistack `v2` primarily focuses on flexibility, scalibity and customisation. There has been numerous issues and pull requests
on the repository asking support for customising snackbars more easily.

So far, customisation was only possible by overriding the existing styles, but this is not always enough. There is only so 
much you can do by overriding styles. Since we can't cover everyone's requirements natively on notistack, in `v2`, we give 
you the tools to build your own snackbars. This is achieved through [`Components`](#8-new-components-prop) prop.


### Breaking changes

1. `content` prop is still supported but marked as deprecated and it will be removed in future releases. If you find yourself using this prop quite often, consider defining your own custom variant/content using [Components](#8-new-components-prop) props. 

2. Drop `ariaAttributes` from props. If you need to pass aria-attributes, use a [custom component](#8-new-components-prop).

3. HTML attributes applied to Snackbar root component should be passed inside `SnackbarProps` prop.
```diff
<SnackbarProvider
-    data-test="test"
+    SnackbarProps={{
+        'data-test': 'test',
+    }}
>
</SnackbarProvider>

enqueueSnackbar('message', {
-    'data-test': 'test',
+    SnackbarProps: {
+       'data-test': 'test',
+    },
})
```
4. Any customisation through Material-UI theme is no longer applied to the elements. This would also mean toggling theme `mode` to **Dark**/Light would not affect the appearance of snackbars. You can easily use a [custom component](#8-new-components-prop) for more control over your snackbars. 
5. Drop support for `resumeHideDuration`, `onEntering` and `onExisting` transition callbacks due to the fact that they are rarely used. Get in touch if this decision affects you to potentially bring them back to life.
6. Exported type `WithSnackbarProps` was kept in type declerations for backwards compatibility. After nearly a year, it has been now deleted and you should use `ProviderContext` type instead.
7. Drop Customisation through `classes.variant(Success|Error|Info|Warning)`. To customise snackbars according to their
variant, use a [custom component](#8-new-components-prop).

#### 8. New `Components` prop
You can now define your own `variant`s and show entirely customsied snackbars. Your custom component accepts all props passed to `enqueueSnackbar` or `SnackbarProvider`, so you have full control over it. On top of that, you'll be able pass additional options in options parameter of `enqueueSnackbar. Example usage:

```jsx
<SnackbarProvider
    Components={{
        error: MyCustomErrorNotification,
        success: MyCustomSuccessNotification,
        reportComplete: MyCustomReportNotification,
    }}
>
</SnackbarProvider>


// ...
enqueueSnackbar('Your report is ready to download', {
   variant: 'reportComplete',
   persist: true,
   allowDownload: true, // <-- pass any additional options
})


const MyCustomReportNotification = (props) => {
    // access notistack props, options and your own options here
    const {
        allowDownload,
        anchorOrigin,
        // ...
    } = props;

    // ...
}
```

