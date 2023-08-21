import axios from "axios";
import { headers } from "./AuthorizationBearer";

export const DateAPI = async (categoryType, selectedLeague) => {
  console.log("Category  selectedLeague", categoryType, selectedLeague);

  try {
    const res = await axios.get(
        `https://www.nosyapi.com/apiv2/bets/getMatchesDateList?type=${categoryType}&league=${selectedLeague}`,
      { headers }
    );
    console.log(res,"MMM");
    return res.data;
  } catch (error) {}
};
