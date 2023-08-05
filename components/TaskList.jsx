import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCircleHalfStroke,
  faFlagCheckered,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const TaskList = () => {
  return (
    <div className="mt-16 prompt_layout">
      <div className="task repeat">
        <div className="task__top">
          <div className="task__title">Words to repeat</div>
        </div>
        <div className="task__bottom">
          <span className="task__text">5 words</span>
          <FontAwesomeIcon className="w-1/3" icon={faRepeat} />
        </div>
      </div>

      <div className="task half">
        <div className="task__top">
          <div className="task__title">Words half learned</div>
        </div>
        <div className="task__bottom">
          <span className="task__text">5 words</span>
          <FontAwesomeIcon className="w-1/3" icon={faCircleHalfStroke} />
        </div>
      </div>

      <div className="task almost">
        <div className="task__top">
          <div className="task__title">Words almost learned</div>
        </div>
        <div className="task__bottom">
          <span className="task__text">5 words</span>
          <FontAwesomeIcon className="w-1/3" icon={faFlagCheckered} />
        </div>
      </div>

      <div className="task new">
        <div className="task__top">
          <div className="task__title">Brand new words</div>
        </div>
        <div className="task__bottom">
          <span className="task__text">5 words</span>
          <FontAwesomeIcon className="w-1/3" icon={faBolt} />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
