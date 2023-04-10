

# Migration from v0/v1 to v2

# Motivation
Notistack `v2` primarily focuses on flexibility, scalibity and customisation. There has been numerous issues and pull requests
on the repository asking support for customising snackbars more easily.

So far, customisation was only possible by overriding the existing styles, but this is not always enough. There is only so 
much you can do by overriding styles. Since we can't cover everyone's requirements natively on notistack, in `v2`, we give 
you the tools to build your own snackbars. This is achieved through [`Components`](#8-new-components-prop) prop.


### Breaking changes

* `content` prop is still supported but marked as deprecated and it will be removed in future releases. If you find yourself using this prop quite often, consider defining your own custom variant/content using [Components](#8-new-components-prop) props. 

* Drop `ariaAttributes` from props. If you need to pass aria-attributes, use a [custom component](#8-new-components-prop).

* HTML attributes applied to Snackbar root component should be passed inside `SnackbarProps` prop.
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

* Drop support for `resumeHideDuration`, `onEntering` and `onExisting` transition callbacks due to the fact that they are rarely used. Get in touch if this decision affects you to potentially bring them back to life.

* `onClose` won't be called with `reason: 'clickaway'` anymore. Get in touch if you need to detect clickaway's to potentially bring them back to life.

* Drop Customisation through `classes.variant(Success|Error|Info|Warning)`. To customise snackbars according to their
variant, use a [custom component](#8-new-components-prop). [This example](https://github.com/iamhosseindhv/notistack/tree/master/examples/custom-snackbar-example) demonstrates how this is done.

* Any customisation through Material-UI theme is not applied to the elements. This would also mean toggling theme `mode` to **Dark**/**Light** would not affect the appearance of snackbars. You can easily use a [custom component](#8-new-components-prop) to have full control over your snackbars. [`This example`](https://github.com/iamhosseindhv/notistack/tree/master/examples/custom-snackbar-example) demonstrates how your snackbars can react to change of theme mode.

* Drop support for `withSnackbar` Higher-order component (HOC). Consequently, exported type `WithSnackbarProps` was kept in type declerations for backwards compatibility and after over a year, it has been now deleted and you should use `ProviderContext` type instead. You have two options to migrate your code:
  * Option 1: Migrate your code to be functional component and use `useSnackar`.
  * Option 2: Remove `withSnackbar` and import the function(s) you need directly from `notistack`:
```diff
- import { withSnackbar } from 'notistack' 
+ import { enqueueSnackbar, closeSnackbar } from 'notistack' 

class MyButton extends React.Component {
    render() {
-       const { enqueueSnackbar } = this.props
    }
}

- export default withSnackbar(MyButton)
+ export default MyButton
```


####  New `Components` prop
You can now define your own `variant`s and show entirely customsied snackbars. Your custom component accepts all props passed to `enqueueSnackbar` or `SnackbarProvider`, so you have full control over it. On top of that, you'll be able pass additional options in options parameter of `enqueueSnackbar. For Typescript users, be sure to follow [these](https://notistack.com/features/customization#custom-variant-(typescript)) additional steps to make the typings work. Example usage:

```tsx
<SnackbarProvider
    Components={{
        success: MyCustomSuccessNotification,
        reportComplete: ReportComplete,
    }}
>
</SnackbarProvider>

interface ReportCompleteProps extends CustomContentProps {
    allowDownload: boolean;
}

const ReportComplete = React.forwardRef((props: ReportCompleteProps, ref) => {
    const {
        // You have access to notistack props, options 👇🏼
        variant,
        message
        // as well as your own custom props 👇🏼
        allowDownload,
    } = props;

    // 
})

enqueueSnackbar('Your report is ready to download', {
   variant: 'reportComplete',
   persist: true,
   allowDownload: true, // <-- pass any additional options
})

```

