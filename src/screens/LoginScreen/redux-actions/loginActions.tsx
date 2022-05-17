export const LOGIN_TOGGLE_LOADING = "@login/toggle_loading";

export const loginToggleLoading = (loading: boolean) => {
  return {
    type: LOGIN_TOGGLE_LOADING,
    payload: {
      loading,
    },
  };
};
