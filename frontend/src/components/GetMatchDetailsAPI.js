import axios from "axios";
import { headers } from "./AuthorizationBearer";

export const MatchDetailsAPI = async (categoryType, selectedLeague, selectedDate) => {
  console.log("Category  selectedLeague", categoryType, selectedLeague, selectedDate);

  try {
    await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesListv9?type=${categoryType}&league=${selectedLeague}&t=${selectedDate}`,
      { headers }
    );
  } catch (error) {}
};
