import { Provider } from "react-redux";
import { setupStore } from "./Store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={setupStore()}> {children} </Provider>;
}
