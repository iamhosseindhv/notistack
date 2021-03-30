

# Migration from v0 / v1 to v2

# Motivation
Notistack `v2` primarily focuses on flexibility, scalibity and customisation. There has been numerous issues and pull requests
on the repository asking support for customising snackbars more easily.

So far, customisation was only possible by overriding the existing styles, but this is not always enough. There is only so 
much you can do by overriding styles. Since we can't cover everyone's requirements natively on notistack, in `v2`, we give 
you the tools to build your own snackbars. This is achieved through `Components` prop.


### Breaking changes

1. Drop `content` prop for SnackbarProvider. You can still pass `content` in the options parameter
of `enqueueSnackbar` to display a one-off custom snackbar. If you find yourself using this prop quite often, consider defining your own custom variant/content using [Components]() props. After which you show your own snackbar in the following way:
```jsx
<SnackbarProvider
    Components={{
         reportComplete: MyCustomReportNotification,
    }}
>
</SnackbarProvider>


// ...
enqueueSnackbar('Your report is ready to download', {
   variant: 'reportComplete',
   persist: true,
   allowDownload: true,
})
```

1. Drop `ariaAttributes` from props. If you need to pass aria-attributes, use a [custom component]().
2. HTML attributes applied to Snackbar root component should be passed inside `SnackbarProps` prop.
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
3. Any customisation through Material-UI theme is no longer applied to the elements. This would also mean toggling theme `mode` to **Dark**/Light would not affect the appearance of snackbars. You can easily use a [custom component]() for more control over your snackbars. 
3. Drop support for `resumeHideDuration`, `onEntering` and `onExisting` transition callbacks due to the fact that they are rarely used. Get in touch if this decision affects you to potentially bring them back to life.
4. Exported type `WithSnackbarProps` was kept in type declerations for backwards compatibility. After nearly a year, it has been now deleted and you should use `ProviderContext` type instead.
7. Drop Customisation through `classes.variant(Success|Error|Info|Warning)`. To customise snackbars according to their
variant, use a [custom component]().
5. RTL support? TODO:
