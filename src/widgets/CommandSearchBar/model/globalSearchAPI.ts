import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

import { AUTH_DATA } from "shared/const/localstorage";
import { SearchBar } from "./search";
import $api from "shared/api/api";

const getGlobalSearchData = async (search:string):Promise<SearchBar> => {

  const auth = JSON.parse(localStorage.getItem(AUTH_DATA) || "{}");

  if (Object.keys(auth).length === 0) { 
    const response = await axios.get(`https://utask.kstu.kg/educations/api/v1/global-search?search=${search}`);

    return response.data;
  }
else {    
  const response = await $api.get(`v1/global-search?search=${search}`);

  return response.data;
}
// const response = await $api_base_edu.get(`v1/global-search?search=${search}`);
// return response.data;
  };


  export const searchQueries = {
      searchResults: (searchText: string | null) =>
        queryOptions({
          queryKey: ['search',searchText],
          queryFn: () => getGlobalSearchData(searchText as string),
          enabled: !!searchText,
        }),
  };
  