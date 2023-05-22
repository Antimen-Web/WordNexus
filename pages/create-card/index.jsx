import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateCard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    word: "",
    desc: "",
    tag: "",
    image: null,
  });

  const createCard = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("userId", session?.user.id);
    formData.append("word", post.word);
    formData.append("desc", post.desc);
    formData.append("tag", post.tag);
    formData.append("image", post.image);

    try {
      const response = await fetch("/api/card/new", {
        method: "POST",
        body: formData,
      });


      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createCard}
      />
  );
};

export default CreateCard;