"use client";
import IslandLayout from "components/IslandLayout";
import Headers from "components/Headers";
import { useHiveContext } from "context/Hive/hive";

const WhoAreWe = () => {
  const hive = useHiveContext();

  return (
    <IslandLayout>
      <div className="home_page_content">
        <div className="home_description">
          <Headers>Who Are We</Headers>
          <p>
            {hive.hiveDetails?.longDescription ||
              "Digital hives often have features like forums, chat rooms, blogs, and other tools for communication and collaboration. They can be used for a variety of purposes, such as networking, knowledge-sharing, and socializing."}
          </p>
        </div>
      </div>
    </IslandLayout>
  );
};

export default WhoAreWe;
