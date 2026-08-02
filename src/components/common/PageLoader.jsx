function PageLoader({ label }) {
  return (
    <div className="section-padding">
      <div className="mx-auto w-full max-w-5xl py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-10 w-1/2 rounded-full bg-white/10" />
          <div className="h-4 w-2/3 rounded-full bg-white/10" />
          <p className="pt-4 text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
