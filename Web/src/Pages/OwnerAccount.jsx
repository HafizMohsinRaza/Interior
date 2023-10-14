import ProfessionalAccount from "./ProfessionalAccount";
import FreelancerAccount from "./FreelancerAccount";

const OwnerAccount = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      {role == "Professional" ? <ProfessionalAccount /> : <FreelancerAccount />}
    </>
  );
};

export default OwnerAccount;
