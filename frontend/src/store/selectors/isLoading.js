import { selector } from "recoil";
import { userState } from "../atom/user";

export const isUserLoading = selector({
  key: "isLoadingState",
  get: ({ get }) => {
    const state = get(userState);
    return state.isLoading;
  },
});
