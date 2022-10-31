import { combineReducers } from "redux";

import user from "./user";
import transaction from "./transaction";
import auth from "./auth";

export default combineReducers({
  user,
  auth,
  transaction,
});
