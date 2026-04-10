function Field({ children, full = false, label }) {
  return (
    <label className={`field ${full ? 'field-full' : ''}`}>
      <span>{label}</span>
      {children}
    </label>
  )
}

export default Field
