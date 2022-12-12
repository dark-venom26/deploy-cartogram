import './loader.scss';

function Loader({small}) {
  return (
    <div className={small ? `small loader` : `loader`}>
        <div></div>
    </div>
  )
}

export default Loader