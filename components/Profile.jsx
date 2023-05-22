import WordCard from "@components/WordCard";
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
      <>
          <div className="w-full">
              <h1 className="head_text text-left">
                  <span className="blue_gradient">{name} Profile</span>
              </h1>
              <p className="desc text-left">{desc}</p>
          </div>

          <div className="mt-10 prompt_layout w-auto">
            {data.map((post) => (
              <WordCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </div>
      </>
  );
};

export default Profile;
