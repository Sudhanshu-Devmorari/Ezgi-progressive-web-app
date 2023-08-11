import axios from "axios";
import { headers } from "./AuthorizationBearer";

export const DateAPI = async (categoryType, selectedLeague) => {
  console.log("Category  selectedLeague", categoryType, selectedLeague);

  try {
    await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesDateList?type=${categoryType}&league=${selectedLeague}`,
      { headers }
    );
  } catch (error) {}
};
