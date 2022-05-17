import { FormControl, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { SizedBox } from "../../components/SizedBox";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { ILoginState } from "./redux-reducers/loginReducer";

export const LoginSreen = () => {
  const state = useSelector((state: any) => state.login) as ILoginState;
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const mailRef: any = useRef();
  const passwordRef: any = useRef();

  const goToRecognition = () => {
    navigate("/faceRecognition");
  };
  const goToLogin = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    // mailRef.current.value = 'karyaortiz@gmail.com';
    // passwordRef.current.value = '123456';
    logIn({
      mail: mailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="d-flex flex-column  p-4">
      <div>
        <button type="button" className="btn btn-light " onClick={goToLogin}>
          Atras
        </button>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center h-full">
        <div
          className="bg-white border p-4 rounded-lg shadow d-flex flex-column"
          style={loginContainer}
        >
          <label className="align-self-center h3">Inicio de sesión</label>
          <SizedBox size={30} />
          <FormControl
            ref={mailRef}
            placeholder="Usuario"
            aria-label="Usuario"
            aria-describedby="basic-addon1"
          />
          <SizedBox size={30} />
          <FormControl
            ref={passwordRef}
            type="password"
            placeholder="Contraseña"
            aria-label="Contraseña"
            aria-describedby="basic-addon1"
          />
          <SizedBox size={40} />
          <div className="row">
            <div className="col-8">
              <button
                className="btn btn-primary w-100"
                onClick={goToRecognition}
              >
                Reconocimiento facial
              </button>
            </div>
            <div className="col-4 ps-0">
              <button
                className="btn btn-success w-100"
                onClick={handleLogin}
                disabled={state.loading}
              >
                {state.loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Acceder"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const loginContainer: React.CSSProperties = {
  width: 400,
};
