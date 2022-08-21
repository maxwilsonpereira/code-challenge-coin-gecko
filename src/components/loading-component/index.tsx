import classes from './styles.module.scss'

export const LoadingComponent = ({ fade }: { fade?: boolean }) => {
  return (
    <div className={[classes.loadingRoot, fade && classes.fadeIn].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
export default LoadingComponent
