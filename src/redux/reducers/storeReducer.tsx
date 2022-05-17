import { IAdvertising } from "../../interfaces/IAdvertising";
import { IReduxAction } from "../../interfaces/IReduxAction";
import { STORE_LOAD_ADVERTISING, STORE_TOGGLE_LOADING } from "../actions/storeActions";

export interface IStoreState {
  loading: boolean;
  advertising: IAdvertising[];
}

const initialState: IStoreState = {
  loading: false,
  advertising: [],
}

export const storeReducer = (state: IStoreState = initialState, action: IReduxAction): IStoreState => {
  switch (action.type) {
    case STORE_TOGGLE_LOADING:
      const { loading } = action.payload;
      return {
        ...state,
        loading
      };
    case STORE_LOAD_ADVERTISING:
      const { advertising } = action.payload;
      return {
        ...state,
        advertising,
      }
    default:
      return state;
  }
}
