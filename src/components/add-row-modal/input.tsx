import classes from './styles.module.scss'

export const AddRowModalInput = ({
  value,
  type,
  placeholder,
  stateSetter,
}: {
  value: string
  type?: string
  placeholder: string
  stateSetter: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <input
      className={classes.input}
      type={type || 'text'}
      value={value}
      placeholder={placeholder}
      onChange={(e) => stateSetter(e.target.value)}
    />
  )
}

export default AddRowModalInput
