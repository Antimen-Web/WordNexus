import Link from "next/link";
import { useEffect, useState } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [tagsNumber, setTagsNumber] = useState(1);
  const [tags, setTags] = useState(Array(tagsNumber).fill(""));

  const getHandlerTag = (value) => {
    return (event) => {
      const newTags = [...tags];
      newTags[value] = event.target.value;
      setTags(newTags);
    };
  };

  useEffect(() => {
    setTags(Array(tagsNumber).fill(""));
  }, [tagsNumber]);

  useEffect(() => {
    setPost({ ...post, tag: tags });
  }, [tags]);

  const [examplesNumber, setExamplesNumber] = useState(1);
  const [examples, setExamples] = useState(Array(examplesNumber).fill(""));

  const getHandlerExample = (value) => {
    return (event) => {
      const newExamples = [...examples];
      newExamples[value] = event.target.value;
      setExamples(newExamples);
    };
  };

  useEffect(() => {
    setExamples(Array(examplesNumber).fill(""));
  }, [examplesNumber]);

  useEffect(() => {
    setPost({ ...post, examples: examples });
  }, [examples]);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Word Card</span>
      </h1>

      <p className="desc text-left max-w-md">
        Expand the WordNexus dictionary by adding a new word card. Share your
        knowledge and contribute to the community by providing a detailed
        description, relevant tags, and even an image. Let's enrich the
        vocabulary together!
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gra-700">
            Your Word
          </span>
          <input
            value={post.word}
            onChange={(e) => setPost({ ...post, word: e.target.value })}
            placeholder="Any word or phrase"
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gra-700">
            Description of the meaning and examples
          </span>
          <textarea
            value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
            placeholder="Write your word description here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <div className="flex justify-between">
            <span className="font-satoshi font-semibold text-base text-gra-700">
              Tags
              <span className="font-normal ml-2">(#noun)</span>
            </span>

            <select onChange={(e) => setTagsNumber(+e.target.value)}>
              {Array.from({ length: 10 }, (value, index) => (
                <option>{index + 1}</option>
              ))}
            </select>
          </div>

          {tags.map((tag, index) => (
            <input
              value={tags[index]}
              onChange={getHandlerTag(index)}
              placeholder="#tag"
              required
              className="form_input"
            />
          ))}
        </label>

        <label>
          <div className="flex justify-between">
            <span className="font-satoshi font-semibold text-base text-gra-700">
              Examples
              <span className="font-normal ml-2">
                (Sentence or dialogue of 2-3 phrases with this word)
              </span>
            </span>

            <select onChange={(e) => setExamplesNumber(+e.target.value)}>
              {Array.from({ length: 10 }, (value, index) => (
                <option>{index + 1}</option>
              ))}
            </select>
          </div>

          {examples.map((example, index) => (
            <textarea
              value={examples[index]}
              onChange={getHandlerExample(index)}
              placeholder="Example"
              required
              className="form_input"
            />
          ))}
        </label>

        <label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button type="submit" disabled={submitting} className="btn blue">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
