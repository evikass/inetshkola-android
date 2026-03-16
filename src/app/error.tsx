'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-purple-900">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Что-то пошло не так</h2>
        <p className="text-purple-200 mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  )
}
