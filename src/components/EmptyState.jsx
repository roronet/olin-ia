export default function EmptyState({ titulo, children }) {
  return (
    <div className="estado-vacio">
      <strong>{titulo}</strong>
      {children && <p>{children}</p>}
    </div>
  )
}
