import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    word: "",
    desc: "",
    tag: "",
    image: null,
  });


  useEffect(() => {
    const getCardDetails = async () => {
      const response = await fetch(`/api/card/${cardId}`);
      const data = await response.json();

      setPost({
        word: data.word,
        desc: data.desc,
        tag: data.tag,
      });
    };

    if (cardId) getCardDetails();
  }, [cardId]);

  const updateCard = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("word", post.word);
    formData.append("desc", post.desc);
    formData.append("tag", post.tag);
    formData.append("image", post.image);


    if (!cardId) return alert("Card ID not found");

    try {
      const response = await fetch(`/api/card/${cardId}`, {
        method: "PATCH",
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateCard}
    />
  );
};

export default EditCard;
