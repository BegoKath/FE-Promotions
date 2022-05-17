import { Globals } from "../global/Globals";
import { ILoginResponse } from "../interfaces/ILoginResponse";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../services/LoginService";
import md5 from "crypto-js/md5";
import { useDispatch } from "react-redux";
import { IApiResponse } from "../interfaces/IApiResponse";
import { Alert } from "../utils/Alert";
import { loginToggleLoading } from "../screens/LoginScreen/redux-actions/loginActions";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logIn = async (props: { mail: string; password: string }) => {
    const { mail, password } = props;
    dispatch(loginToggleLoading(true));
    const res = await LoginService.logIn({
      mail: mail,
      password: md5(password).toString(),
    });
    handleResponse(res);
  };

  const logInWithId = async (idUser: number) => {
    dispatch(loginToggleLoading(true));
    const res = await LoginService.logInWithId(idUser);
    handleResponse(res);
  };

  const handleResponse = (res: IApiResponse) => {
    dispatch(loginToggleLoading(false));
    if (!res.correctProcess) {
      Alert.showError(res.message);
    } else {
      const data = res.data as ILoginResponse;
      if (data.authToken) Globals.setAuthToken = data.authToken;
      if (data.idCliente) Globals.setIdUser = data.idCliente.toString();
      if (data.nombre) Globals.setUserName = data.nombre;
      navigate("/speak", {
        replace: true,
      });
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return {
    logIn,
    logInWithId,
    logOut,
  };
};
