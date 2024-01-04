import IslandLayout from "components/IslandLayout/IslandLayout";
import Header from "./components/Header";
import PageLayout from "components/PageLayout/PageLayout";
import LineBreak from "components/LineBreak/LineBreak";
import WhoAreWe from "./components/WhoAreWe";
import IntroVideo from "./components/IntroVideo";
import Headers from "components/Headers";
// import HiveGuidelines from "./components/Guidelines";

const HomePage = () => {
  return (
    <PageLayout sideMenu={true}>
      <div className="home_page_container">
        <IslandLayout>
          <Header />
        </IslandLayout>
        <LineBreak />
        <WhoAreWe />
        <LineBreak />
        <IntroVideo />
        <LineBreak />
        <IslandLayout>
          <div className="home_page_content">
            <div className="home_guidelines">
              <Headers>Guidelines</Headers>
              {/* <HiveGuidelines /> */}
            </div>
          </div>
        </IslandLayout>
      </div>
    </PageLayout>
  );
};

export default HomePage;
