export const onScrollTrigger = (positionY: number, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const onScroll = () => {
    const scrollPositionY = window.scrollY
    if (scrollPositionY > positionY) setState(true)
    else setState(false)
  }
  window.addEventListener('scroll', onScroll)
}
