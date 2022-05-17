import { useEffect, useRef } from 'react';
import { Loading } from '../../components/Loading';
import { FaceRecognitionLoginView } from './components/FaceRecognitionLoginView';
import { useFace } from '../../hooks/useFace';

export const FaceRecognitionScreen = () => {

  useEffect(() => {
    handleChanges();
    initializeScreen();
  }, [])

  const canvasFaceRef: any = useRef();
  const canvasPhotoRef: any = useRef();
  const imgRef: any = useRef();
  const webcamRef: any = useRef();

  const width = 720;
  const height = 500;

  const {
    state,
    clearFaceDraw,
    clearPhoto,
    handleChanges,
    initializeScreen,
    saveFace,
    startCamera,
    startRecognizing,
    takePhoto,
  } = useFace({ canvasFaceRef, canvasPhotoRef, height, webcamRef, width });

  const VideoOrImage = () => {
    if (state.photoSrc) {
      clearFaceDraw();
      setTimeout(() => startRecognizing(imgRef.current), 100);
      return (
        <img
          ref={imgRef}
          width={width}
          height={height}
          src={state.photoSrc}
        />
      );
    } else {
      clearPhoto();
      setTimeout(() => startCamera(), 100);
      return (
        <video
          ref={webcamRef}
          width={width}
          height={height}
          autoPlay
          muted
        />
      );

    }
  }

  return (
    <div className='d-flex flex-column container h-full align-items-center justify-content-center'>
      {
        state.loading
          ? <Loading />
          : state.failed
            ? <button className='btn btn-primary' onClick={initializeScreen}>
              Volver a cargar
            </button>
            : <>
              <div className='d-flex rounded-lg overflow-hidden bg-black'>
                <canvas
                  ref={canvasPhotoRef}
                  className='position-absolute rounded-lg'
                  width={width}
                  height={height}
                />
                <VideoOrImage />
                <canvas
                  ref={canvasFaceRef}
                  className='position-absolute'
                  width={width}
                  height={height}
                />
              </div>
              <div className="my-3 text-center">
                {
                  !state.photoSrc && state.allUserFaces.length === 0
                    ? 'Mire fijamente la pantalla y cuando esté listo presione el botón azul'
                    : state.photoSrc && `Foto ${state.allUserFaces.length > 0 ? state.allUserFaces[0].descriptors.length + 1 : 1}/3`
                }
                <div>
                  {
                    !state.photoSrc && state.allUserFaces.length > 0
                      ? state.allUserFaces[0].descriptors.length === 1
                        ? 'Gira la cabeza ligeramente hacia la derecha'
                        : state.allUserFaces[0].descriptors.length === 2 && 'Ahora gira la cabeza ligeramente hacia la izquierda'
                      : <></>
                  }
                </div>
              </div>
              <div className='d-flex my-2'>
                {
                  state.photoSrc && <button
                    className='btn btn-success mx-2'
                    onClick={saveFace}
                  >
                    Guardar
                  </button>
                }
                <button
                  className='btn btn-primary'
                  onClick={takePhoto}
                >
                  {state.photoSrc ? 'Volver a tomar' : 'Tomar foto'}
                </button>
              </div>
              {state.showLoginView && <FaceRecognitionLoginView />}
            </>
      }
    </div>
  );
}
