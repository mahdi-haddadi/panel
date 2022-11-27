import { Link } from "react-router-dom";
import Badge from "../../components/badge/Badge";
import { blogs } from "../../data/blog";

const Blogs = () => {
  return (
    <div className="blogs">
      {blogs.map((i) => {
        return (
          <div key={i.id} className="p-6 my-4 bg-bg-default hover:bg-slate-500 rounded-lg flex justify-between">
            <div>
              <Link to={`/blog?id=${i.id}`}>
                <h4 className="text-text-primary">{i.title}</h4>
              </Link>
              <p className="text-text-secondary">
                {i.content.split(" ").slice(0, 10).join(" ") + "..."}
              </p>
            </div>
            <div className="text-center">
              <Badge
                className="mx-auto"
                color={`${i.active ? "success" : "danger"}`}
              >
                {}
              </Badge>
              <sub className="text-text-disabled">
                {i.active ? "فعال" : "غیر فعال"}
              </sub>
            </div>
            <div className="text-center">
              <span className="text-text-disabled">{i.createAt}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
