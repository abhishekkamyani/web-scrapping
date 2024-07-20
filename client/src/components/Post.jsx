import { Link } from "react-router-dom";
// import ImageLoader from "./loaders/ImageLoader";
function Post({ post }) {
  const { author } = post;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg outline outline-1">
      <div className="flex-shrink-0 relative">
        <img
          src={post.cover}
          alt="Blog cover"
          className="h-48 w-full object-cover object-center"
        />
        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <Link to={`../post?link=${post.link}`} className="mt-2 block">
            <p className="text-xl capitalize font-semibold text-gray-900 line-clamp-2">{post.title}</p>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">
              {post.summary}
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          {author && (
            <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 object-cover object-center rounded-full"
                  src={post.avatar}
                  alt="Author avatar"
                  loaderClassName="rounded-full"
                />
            </div>
          )}

          <div className="ml-3 w-full">
            {author && (
              <p className="text-sm font-medium text-gray-900 capitalize">
                {post.author}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
