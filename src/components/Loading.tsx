import { Spinner } from 'react-bootstrap'
import { SizedBox } from './SizedBox'

export const Loading = () => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <Spinner animation="grow" variant="primary" />
      <SizedBox size={20.0} />
      <label>Cargando...</label>
    </div>
  )
}
