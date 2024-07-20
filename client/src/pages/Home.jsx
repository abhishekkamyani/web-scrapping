// import Posts from "../components/Posts";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import CategoriesNavbar from "../components/CategoriesNavbar";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useWebsitesMetadata } from "../contexts/WebsitesMetadataContext";
import CategoriesNavbar from "../components/CategoriesNavbar";
import { httpClient } from "../utils/httpClient";
import Posts from "../components/Posts";

export default function Home() {
  const { websitesMetadata } = useWebsitesMetadata();
  const { website } = useParams();
  //   const [selectedWebsite, setSelectedWebsite] = useState(websitesMetadata?.find((data) => data.name === website));
  const selectedWebsite = websitesMetadata?.find(
    (data) => data.name === website
  );
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || selectedWebsite?.categories[0];
  //   console.log(website);
  console.log(category);
  const api = selectedWebsite?.api;
  console.log(api);

  //   useEffect(() => {
  //     let ignore = false;
  //     if (!ignore) {
  //       setSelectedWebsite(
  //         websitesMetadata?.find((data) => data.name === website)
  //       );
  //     }

  //     return () => {
  //       ignore = true;
  //     };
  //   }, [website, websitesMetadata]);

  const fetchPosts = async () => {
    toast.dismiss();
    const response = await httpClient.get(`${api}${category}`);
    if (response.status === 200) {
    //   console.log(response);
      return response.data;
    }
    // return [
    //   {
    //     title: "Artificial Intelligence: Goldman Sachs says no",
    //     link: "https://medium.com/datadriveninvestor/artificial-intelligence-goldman-says-no-65dae6cd9353?source=search_post---------0----------------------------",
    //     summary: "the hype is fading",
    //     avatar:
    //       "https://miro.medium.com/v2/resize:fill:20:20/1*QqB7GMb2rAmYbVYwRuEZlg.jpeg",
    //     author: "Dave Coker",
    //   },
    // ];
  };

  const fetchedResult = useQuery({
    queryKey: ["posts", category],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  console.log(fetchedResult.data);

  // const [paginationData, setPaginationData] = useState({ page: 1, pageSize: 5 });
  useEffect(() => {
    window.scrollTo({ top: 0 });
    toast.dismiss();
    if (fetchedResult.error) {
      toast.error("Posts not found");
    }
  }, [category, fetchedResult.error]);

  return (
    <div className="pb-5">
      <div className="d-flex w-full mb-10">
        {api && (
          <CategoriesNavbar
            categories={selectedWebsite?.categories}
            selectedCategory={category}
          />
        )}
      </div>
      <Posts posts={fetchedResult.data} isFetched={!fetchedResult.isLoading} />
    </div>
  );
}
