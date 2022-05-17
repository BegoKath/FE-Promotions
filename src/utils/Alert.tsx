import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Theme } from "../theme/Theme";

export class Alert {
  static mySwal = withReactContent(Swal);

  static showError = async (message: string) => {
    await this.mySwal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: message,
      confirmButtonColor: Theme.colors.primaryColor,
    });
  };

  static showSuccess = async (message: string) => {
    await this.mySwal.fire({
      icon: "success",
      title: "Genial",
      text: message,
      confirmButtonColor: Theme.colors.primaryColor,
    });
  };
}
