import { useHiveContext } from "context/Hive/hive";
import { useRouter } from "next/navigation";

const NavLogo = () => {
  const hiveState = useHiveContext();

  const router = useRouter();

  const handleLogoClick = () => {
    hiveState.hiveDetails?.communityGuidelines
      ? window.open(hiveState.hiveDetails.communityGuidelines, "_self")
      : router.push("/home");
  };

  return (
    <div className="logo_section">
      <img
        src={hiveState.hiveDetails?.communityWebLogo || ""}
        alt=""
        className="hive_logo cursor-pointer"
        onClick={handleLogoClick}
      />
    </div>
  );
};

export default NavLogo;
