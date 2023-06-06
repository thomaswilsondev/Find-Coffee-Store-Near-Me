//initialize unsplash

import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "10.884970031251576,106.78166906985656",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighbourhood:
        result.location.cross_street.length > 0
          ? result.location.cross_street
          : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};
