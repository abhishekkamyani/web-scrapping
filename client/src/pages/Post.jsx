import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { useLoadingBarProgress } from "../contexts/LoadingBarContext";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../utils/httpClient";

export default function Post() {
  const { website } = useParams();
  //   const { setProgress } = useLoadingBarProgress();
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
  const post = fetchedResult.data || {};

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (fetchedResult.isLoading) {
    // setProgress(30);
  }

  // const queryClient = useQueryClient();

  if (fetchedResult.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased">
      <div className="flex flex-col md:flex-row gap-10 px-5 md:px-10 lg:px-20">
        <article className="w-full md:w-3/4 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              <Link target="_blank" to={post.url}>
                {post.title}
              </Link>
            </h1>
            <address className="flex items-center justify-center sm:justify-between flex-wrap gap-y-3 mt-12 mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                {/* Avatar */}
                <img
                  className="mr-4 w-16 h-16 object-cover rounded-full"
                  src={post.avatar}
                  alt="Author Avatar"
                />
                <div>
                  <h4 className="text-xl font-bold capitalize text-gray-900 dark:text-white">
                    {post.author}
                  </h4>
                </div>
              </div>
            </address>
          </header>

          {/* <figure>
            <img
              src={post.blogCover}
              style={{ maxHeight: "500px" }}
              alt="blog cover"
            />
          </figure> */}

          <section className="mt-20">{post.description?.map(data=> <div>{data} <br /></div>)}</section>
        </article>
      </div>
    </main>
  );
}
