import { IAdvertising } from '../../interfaces/IAdvertising';

export const STORE_TOGGLE_LOADING = '@store/toggle_loading';
export const STORE_LOAD_ADVERTISING = '@store/load_advertising';

export const storeToggleLoading = (loading: boolean) => {
  return {
    type: STORE_TOGGLE_LOADING,
    payload: {
      loading,
    }
  }
}

export const storeLoadAdvertising = (advertising: IAdvertising[]) => {
  return {
    type: STORE_LOAD_ADVERTISING,
    payload: {
      advertising,
    }
  }
}