export const delayHandler = (timer: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve('')
    }, timer)
  )
