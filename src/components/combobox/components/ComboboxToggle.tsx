import { ReactNode } from "react"

interface Props {
  children:ReactNode,
  toggleCombobox?:any
}

const ComboboxToggle = ({children,toggleCombobox}:Props) => {
  return (
    <div className="combobox-toggle" onClick={toggleCombobox}>{children}</div>
  )
}

export default ComboboxToggle