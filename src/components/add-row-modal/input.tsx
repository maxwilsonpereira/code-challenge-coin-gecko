import classes from './styles.module.scss'

export const AddRowModalInput = ({
  coinId,
  value,
  type,
  placeholder,
  stateSetter,
}: {
  coinId: string
  value: string
  type?: string
  placeholder: string
  stateSetter: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <input
      id={coinId}
      className={classes.input}
      type={type || 'text'}
      value={value}
      placeholder={placeholder}
      onChange={(e) => stateSetter(e.target.value)}
    />
  )
}

export default AddRowModalInput
