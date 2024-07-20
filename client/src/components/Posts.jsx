// import Post from "./Post";
// import PostLoader from "./loaders/PostLoader";

import Post from "./Post";
import PostLoader from "./PostLoader";

export default function Posts({ posts, isFetched }) {
  return (
    <div className="relative px-6 lg:px-8 theme-switch-transition">
      <div className="absolute inset-0">
        <div className="h-1/3 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto grid max-w-lg gap-10 lg:max-w-none lg:grid-cols-3 2xl:grid-cols-4">
            {/* {posts?.map((post) => <Post key={post._id} post={post} />)} */}
          {isFetched
            ? posts?.map((post, index) => <Post key={index} post={post} />)
            : Array(4)
                .fill(null)
                .map((_, index) => <PostLoader key={index} />)}
        </div>
      </div>
    </div>
  );
}