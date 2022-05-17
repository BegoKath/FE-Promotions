import { IReduxAction } from "../../../interfaces/IReduxAction";
import { LOGIN_TOGGLE_LOADING } from "../redux-actions/loginActions";

export interface ILoginState {
  loading: boolean;
}

const initialState: ILoginState = {
  loading: false,
};

export const loginReducer = (
  state: ILoginState = initialState,
  action: IReduxAction
): ILoginState => {
  switch (action.type) {
    case LOGIN_TOGGLE_LOADING:
      const { loading } = action.payload;
      return {
        loading,
      };
    default:
      return state;
  }
};
