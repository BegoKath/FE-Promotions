import { Route, Routes } from "react-router-dom";
import { FaceRecognitionScreen } from "../screens/FaceRecognitionScreen/FaceRecognitionScreen";
import { LoginSreen } from "../screens/LoginScreen/LoginSreen";
import { PromotionsScreen } from "../screens/PromotionsScreen/promotionsScreen";
import SilenceScreen from "../screens/SilenceScreen/silenceScreen";
import SpeakScreen from "../screens/SpeakScreen/speakScreen";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/speak" element={<SpeakScreen />} />
      <Route path="/" element={<PromotionsScreen />} />
      <Route path="faceRecognition" element={<FaceRecognitionScreen />} />
      <Route path="/login" element={<LoginSreen />} />
      <Route path="/silence" element={<SilenceScreen />} />
    </Routes>
  );
};
