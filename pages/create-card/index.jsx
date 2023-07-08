import { useState } from "react";
import { useSession } from "next-auth/react";

import Form from "@components/Form";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectCards } from "@redux/cards/selectors";
import { createCard } from "@redux/cards/slice";

const CreateCard = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const { oneCard } = useAppSelector(selectCards);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("userId", session?.user.id);
    formData.append("word", oneCard.word);
    formData.append("desc", oneCard.desc);
    formData.append("tag", oneCard.tag);
    formData.append("examples", oneCard.examples);
    formData.append("image", oneCard.image);
    formData.append("level", oneCard.level);
    formData.append("levelProgress", oneCard.levelProgress);

    dispatch(createCard({ formData }));
  };

  return (
    <Form
      type="Create"
      post={oneCard}
      submitting={submitting}
      handleSubmit={handleCreate}
    />
  );
};

export default CreateCard;
