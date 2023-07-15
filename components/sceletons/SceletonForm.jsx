import React from "react";

const SceletonFrom = () => {
  return (
    <div
      role="status"
      className="w-full max-w-full flex-start flex-col animate-pulse"
    >
      <h1 className="head_text text-left">
        <span className="blue_gradient">Edit Word Card</span>
      </h1>

      <p className="desc text-left max-w-md">
        Expand the WordNexus dictionary by adding a new word card. Share your
        knowledge and contribute to the community by providing a detailed
        description, relevant tags, and even an image. Let's enrich the
        vocabulary together!
      </p>
      <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
          <div className="form_input h-11 rounded-full dark:bg-gray-500 w-20"></div>
        </label>
        <label>
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
          <div className="form_input h-52 rounded-full dark:bg-gray-500 w-20"></div>
        </label>
        <label>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
          </div>
          <div className="form_input h-11 rounded-full dark:bg-gray-500 w-20"></div>
        </label>
        <label>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
          </div>
          <div className="form_input h-11 rounded-full dark:bg-gray-500 w-20"></div>
        </label>
        <label>
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-72"></div>
        </label>
        <div class="flex-end mx-3 mb-5 gap-4">
          <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
          <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SceletonFrom;
