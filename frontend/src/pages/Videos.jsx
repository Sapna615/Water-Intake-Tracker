export default function Videos() {
  const vids = [
    { id: 1, title: 'Importance of Hydration', url: 'https://www.youtube.com/embed/9iMGFqMmUFs' },
    { id: 2, title: 'Water Intake Myths', url: 'https://www.youtube.com/embed/d0yGdNEWdn0' },
    { id: 3, title: 'Health Tips by Doctors', url: 'https://www.youtube.com/embed/VYOjWnS4cMY' }
  ]
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Videos</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {vids.map(v => (
          <div key={v.id} className="bg-white dark:bg-neutral-800 rounded p-3 shadow">
            <div className="font-semibold mb-2">{v.title}</div>
            <div className="aspect-video">
              <iframe className="w-full h-full rounded" src={v.url} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
