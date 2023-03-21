import Seo from "../../components/functionalComponents/Seo";
import "./cms.scss";
import LoginForm from "../../components/hookComponents/categoryCard/loginForm/LoginForm";
import InputTextField from "../../components/functionalComponents/inputTextField/InputTextField";
import SignupForm from "../../components/hookComponents/signupForm/SignupForm";
import InputPasswordField from "../../components/hookComponents/inputPasswordField/InputPasswordField";

function Cms() {
  return (
    <div>
      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />
    </div>
  );
}

export default Cms;
