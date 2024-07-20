// import Posts from "../components/Posts";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import CategoriesNavbar from "../components/CategoriesNavbar";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useWebsitesMetadata } from "../contexts/WebsitesMetadataContext";
import CategoriesNavbar from "../components/CategoriesNavbar";

export default function Home() {
  const { websitesMetadata } = useWebsitesMetadata();
  const { website } = useParams();
  const [selectedWebsite, setSelectedWebsite] = useState();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "";
  //   console.log(website);
  //   console.log(category);
  const api = selectedWebsite?.api;
  console.log(api);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
        setSelectedWebsite(websitesMetadata?.find((data) => data.name === website));
    }

    return () => {
      ignore = true;
    };
  }, [website,  websitesMetadata]);

  const fetchPosts = async () => {
    toast.dismiss();
    const response = await axios.get(
      "no"
      //   `${SERVER_URL}/api/post/all?pageSize=${pageSize}&page=${page}&category=${category}`
    );
    if (response.status === 200) {
      return response.data;
    }
  };

  const fetchedResult = useQuery({
    queryKey: ["posts", category],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

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
            categories = {selectedWebsite?.categories}
            selectedCategory={category}
          />
        )}
      </div>
      {/* <Posts posts={fetchedResult.data?.posts} isFetched={!fetchedResult.isLoading} /> */}
    </div>
  );
}
