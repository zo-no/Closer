function FilterTabs({ label, onChange, options, value }) {
  return (
    <div className="filter-group" aria-label={label}>
      <span>{label}</span>
      <div className="filter-tabs">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={option === value ? 'is-active' : ''}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterTabs
