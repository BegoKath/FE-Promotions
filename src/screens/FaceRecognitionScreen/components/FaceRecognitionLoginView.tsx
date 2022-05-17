import { Spinner } from 'react-bootstrap';
import faceRecognitionLogo from '../../../assets/images/face_recognition.jpg';
import { SizedBox } from '../../../components/SizedBox';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IFaceRecognitionState } from '../redux-reducers/faceRecognitionReducer';

export const FaceRecognitionLoginView = () => {

  const state = useSelector((state: any) => state.faceRecognition) as IFaceRecognitionState;
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  }

  return (
    <div className='position-absolute d-flex flex-column justify-content-center align-items-center bg-white w-100 h-full'>
      <img src={faceRecognitionLogo} width={600} />
      <div>{state.logging ? 'Iniciando sesión' : 'Estamos reconociendo tu rostro'}</div>
      <SizedBox size={20.0} />
      <Spinner animation="border" variant="primary" />
      <SizedBox size={20.0} />
      <button className='btn btn-primary' onClick={goToLogin}>Utilizar usuario y contraseña</button>
    </div>
  )
}
