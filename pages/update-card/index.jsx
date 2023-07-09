import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { fetchOneCard, updateCard } from "@redux/cards/slice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectCards } from "@redux/cards/selectors";
import SceletonCard from "@components/SceletonCard";

const EditCard = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const cardId = searchParams.get("id");
  const { oneCard, oneCardStatus } = useAppSelector(selectCards);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cardId) dispatch(fetchOneCard({ cardId }));
  }, [cardId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("word", oneCard.word);
    formData.append("desc", oneCard.desc);
    formData.append("tag", oneCard.tag);
    formData.append("examples", oneCard.examples);
    formData.append("image", oneCard.image);

    dispatch(updateCard({ formData, cardId }));
  };

  return (
    <>
      {oneCardStatus === "pending" ? (
        [...Array(1)].map((_, i) => <SceletonCard key={i} />)
      ) : (
        <Form
          type="Edit"
          post={oneCard}
          submitting={submitting}
          handleSubmit={handleUpdate}
        />
      )}
    </>
  );
};

export default EditCard;
