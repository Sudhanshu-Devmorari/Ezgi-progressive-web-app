import axios from "axios";
import { headers } from "./AuthorizationBearer";

export const LeagueAPI = async (categoryType, selectedCountry) => {
  console.log("Category  categoryType", categoryType, selectedCountry);

  try {
    await axios.get(
      `https://www.nosyapi.com/apiv2/bets/getMatchesLeague?type=${categoryType}&country=${selectedCountry}`,
      { headers }
    );
  } catch (error) {}
};
