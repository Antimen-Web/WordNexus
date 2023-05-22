import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
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
          <span className="font-satoshi font-semibold text-base text-gra-700">
            Tag
            <span className="font-normal ml-2">(#noun, #family, #parent)</span>
          </span>
              <input
                  value={post.tag}
                  onChange={(e) => setPost({ ...post, tag: e.target.value })}
                  placeholder="#tag"
                  required
                  className="form_input"
              />
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

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-blue-700 rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
