import { SnackbarProvider, useSnackbar } from "notistack";
import "./styles.css";
import ReportComplete from "./ReportComplete";

const Child = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <button
      style={{ margin: "0 16px" }}
      onClick={() =>
        enqueueSnackbar("You're report is ready", { variant: "reportComplete" })
      }
    >
      Show snackbar
    </button>
  );
};

declare module "notistack" {
  interface VariantOverrides {
    reportComplete: true;
  }
}

export default function App() {
  return (
    <SnackbarProvider
      Components={{
        reportComplete: ReportComplete
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Child />
      </div>
    </SnackbarProvider>
  );
}
