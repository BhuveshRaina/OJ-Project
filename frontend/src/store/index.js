import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import authReducer   from "./authSlice";
import editorReducer from "./editorSlice";

const dayMs = 24 * 60 * 60 * 1000;

const pruneExpired = createTransform(
  (inbound) => inbound,      
  (outbound) => {             
    if (!outbound || !outbound.snippets) return { snippets: {} };

    const now   = Date.now();
    const fresh = { snippets: {} };

    for (const prob in outbound.snippets) {
      for (const lang in outbound.snippets[prob]) {
        const entry = outbound.snippets[prob][lang];
        if (now - entry.savedAt < dayMs) {
          fresh.snippets[prob] = fresh.snippets[prob] || {};
          fresh.snippets[prob][lang] = entry;
        }
      }
    }
    return fresh;
  },
  { whitelist: ["editor"] }  
);

const rootReducer = combineReducers({
  auth:   authReducer,
  editor: editorReducer,
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [pruneExpired],
  whitelist: ["auth", "editor"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);
