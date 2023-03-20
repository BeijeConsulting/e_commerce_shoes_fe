import Seo from "../../components/functionalComponents/Seo";
import "./cms.scss";
import LoginForm from "../../components/hookComponents/categoryCard/loginForm/LoginForm";
import InputTextField from "../../components/functionalComponents/inputTextField/InputTextField";

function Cms() {
  return (
    <div>
      <Seo
        lang="it"
        title="Pagina principale"
        description="Descrizione pagina principale"
        content="e-commerce"
      />
      <div style={{ marginTop: "100px", marginLeft: "100px", width: "400px" }}>
        <LoginForm />
      </div>
      <InputTextField
        name="password"
        inputLabel="PASSWORD:"
        inputType="password"
        inputPlaceholder="Password"
        labelStyle="default-label password-margin-top"
        inputStyle={`default-input`}
      />
    </div>
  );
}

export default Cms;
