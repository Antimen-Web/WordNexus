import { useSession } from "next-auth/react";
import CardList from "@components/CardList";
import TaskList from "@components/TaskList";

const Study = () => {
  const { data: session } = useSession();
  const allWords = session?.user.allWords;
  console.log(allWords);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center blue_gradient">Learning words</h1>
      <p className="desc text-center">
        Here you can execute word learning tasks
      </p>

      <TaskList />
    </section>
  );
};

export default Study;
