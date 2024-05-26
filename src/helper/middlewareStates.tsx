import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

  export const muiscInfo = atom({
    key: "muiscInfo",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  export const musicIndex = atom({
    key: "musicIndex",
    default: 0,
    effects_UNSTABLE: [persistAtom],
  });

  export const categoryMusics = atom({
    key: "categoryMusics",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  export const generateMusic :any = atom({
    key: "generateMusic",
    default: {},
    effects_UNSTABLE: [persistAtom],
  });

  export const favoriteMusic = atom({
    key: "favoriteMusic",
    default: [],
    effects_UNSTABLE: [persistAtom],
  });
  export const aiMusics = atom({
    key: "aiMusics",
    default: [],
    effects_UNSTABLE: [persistAtom],
  });