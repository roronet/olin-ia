// Franja introductoria de cada página interna: imagen de fondo bajo un velo marino.
export default function PageHero({ titulo, children, imagen }) {
  return (
    <section className="franja" style={imagen ? { '--franja-imagen': `url(${imagen})` } : undefined}>
      <div className="franja__interior">
        <h1>{titulo}</h1>
        {children}
      </div>
    </section>
  )
}
