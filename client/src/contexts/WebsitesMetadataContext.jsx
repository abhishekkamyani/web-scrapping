import { createContext, useContext, useEffect, useState } from "react";
import { httpClient } from "../utils/httpClient";
import { useQuery } from "@tanstack/react-query";

const WebsiteMetadataContext = createContext({});

export function WebsitesMetadataProvider({ children }) {
  const fetchWebsitesMetadata = async () => {
    const response = await httpClient.get("websites/metadata");
    return response.data;
  };

  const fetchedResult = useQuery({
    queryKey: ["websites"],
    queryFn: fetchWebsitesMetadata,
    // staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  if (!fetchedResult.isFetched) {
    return <div>Loading</div>;
  }

  return (
    <WebsiteMetadataContext.Provider
      value={{
        websitesMetadata: fetchedResult.data?.metadata,
        isFetched: !fetchedResult.isLoading,
      }}
    >
      {children}
    </WebsiteMetadataContext.Provider>
  );
}

export const useWebsitesMetadata = () => {
  const metadata = useContext(WebsiteMetadataContext);

  if (!metadata) {
    throw new Error(
      "useWebsitesMetadata must be used within an WebsitesMetadataProvider"
    );
  }
  return metadata;
};
