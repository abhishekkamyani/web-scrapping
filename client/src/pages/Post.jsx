import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { useLoadingBarProgress } from "../contexts/LoadingBarContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "../utils/httpClient";

export default function Post() {
  const { website } = useParams();
//   const { setProgress } = useLoadingBarProgress();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const link = queryParams.get("link") || selectedWebsite?.categories[0];
  //   console.log(website);
  console.log(link);


  const fetchPost = async () => {
    const response = await httpClient.get(`${website}/post?url=${link}`);
    // setProgress(60);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  };

  const fetchedResult = useQuery({
    queryKey: ["post", link, website],
    queryFn: fetchPost,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  console.log(fetchedResult.data);
//   const post = fetchedResult.data?.post || {};

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (fetchedResult.isLoading) {
    // setProgress(30);
  }

  const queryClient = useQueryClient();


  if (fetchedResult.isLoading) {
    return <div></div>;
  }

  return (
    <div>
    posts
    </div>
  );
}