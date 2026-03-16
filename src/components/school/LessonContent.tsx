'use client'

interface Props {
  content: string
}

export default function LessonContent({ content }: Props) {
  const parseContent = (text: string) => {
    const lines = text.split('\n')
    const elements: React.ReactNode[] = []
    let currentList: string[] = []
    let listType: 'ul' | 'ol' = 'ul'
    let key = 0
    let inCodeBlock = false
    let codeLines: string[] = []
    let inTable = false
    let tableRows: string[][] = []

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={key++} className="list-none my-4 space-y-3 ml-2">
              {currentList.map((item, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-3">
                  <span className="text-purple-400 text-xl mt-0.5">▸</span>
                  <span className="text-gray-100 text-lg italic">{parseInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        } else {
          elements.push(
            <ol key={key++} className="list-none my-4 space-y-3 ml-2">
              {currentList.map((item, idx) => (
                <li key={idx} className="leading-relaxed flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg min-w-[2rem]">{idx + 1}.</span>
                  <span className="text-gray-100 text-lg italic">{parseInline(item)}</span>
                </li>
              ))}
            </ol>
          )
        }
        currentList = []
      }
    }

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={key++} className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse rounded-xl overflow-hidden">
              <tbody>
                {tableRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx === 0 ? 'bg-purple-600/40' : 'bg-white/5 even:bg-white/10'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-purple-400/30 px-5 py-3">
                        {rowIdx === 0 ? (
                          <span className="font-bold text-white text-lg">{parseInline(cell)}</span>
                        ) : (
                          <span className="text-gray-200">{parseInline(cell)}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        tableRows = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmedLine = line.trim()

      // Кодовые блоки ```
      if (trimmedLine.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <div key={key++} className="bg-slate-900/90 rounded-2xl p-5 my-5 font-mono text-lg overflow-x-auto border-2 border-cyan-400/40 shadow-xl shadow-cyan-500/20">
              {codeLines.map((codeLine, idx) => (
                <div key={idx} className="text-cyan-100 whitespace-pre leading-loose">{codeLine || '\u00A0'}</div>
              ))}
            </div>
          )
          codeLines = []
          inCodeBlock = false
        } else {
          flushList()
          flushTable()
          inCodeBlock = true
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Таблицы
      if (trimmedLine.includes('|') && trimmedLine.split('|').length >= 2) {
        if (trimmedLine.match(/^\|?[\s\-:|]+\|?$/)) continue
        flushList()
        inTable = true
        const cells = trimmedLine.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
        if (cells.length > 0) tableRows.push(cells)
        continue
      } else if (inTable) {
        flushTable()
        inTable = false
      }

      if (!trimmedLine) {
        flushList()
        flushTable()
        continue
      }

      // # Главный заголовок
      if (trimmedLine.startsWith('# ') && !trimmedLine.startsWith('## ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(2)
        elements.push(
          <h2 key={key++} className="text-3xl font-black text-white mt-8 mb-5 pb-3 border-b-4 border-gradient-to-r from-purple-500 to-pink-500 flex items-center gap-4 italic">
            {text}
          </h2>
        )
        continue
      }

      // ## Подзаголовок
      if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('### ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(3)
        elements.push(
          <h3 key={key++} className="text-2xl font-bold text-cyan-200 mt-6 mb-4 flex items-center gap-3 italic">
            {text}
          </h3>
        )
        continue
      }

      // ### Под-подзаголовок
      if (trimmedLine.startsWith('### ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(4)
        elements.push(
          <h4 key={key++} className="text-xl font-semibold text-yellow-200 mt-5 mb-3 italic">
            {text}
          </h4>
        )
        continue
      }

      // **Название раздела:** - крупный цветной заголовок
      const sectionMatch = trimmedLine.match(/^\*\*([^*]+):\*\*$/)
      if (sectionMatch) {
        flushList()
        flushTable()
        elements.push(
          <h4 key={key++} className="text-xl font-bold text-pink-300 mt-6 mb-3 bg-gradient-to-r from-pink-500/30 to-purple-500/30 px-5 py-3 rounded-xl border-l-4 border-pink-400 shadow-lg">
            {sectionMatch[1]}:
          </h4>
        )
        continue
      }

      // **Термин** — определение (жирный термин в начале строки)
      const termDefMatch = trimmedLine.match(/^\*\*([^*]+)\*\*\s*[—–-]\s*(.+)$/)
      if (termDefMatch) {
        flushList()
        flushTable()
        elements.push(
          <div key={key++} className="my-4 p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-400/30">
            <span className="text-xl font-bold text-orange-300">{termDefMatch[1]}</span>
            <span className="text-gray-300 text-lg"> — </span>
            <span className="text-gray-100 text-lg">{parseInline(termDefMatch[2])}</span>
          </div>
        )
        continue
      }

      // **Термин:** без продолжения - заголовок
      const termOnlyMatch = trimmedLine.match(/^\*\*([^*]+):\*\*$/)
      if (termOnlyMatch) {
        flushList()
        flushTable()
        elements.push(
          <h4 key={key++} className="text-lg font-bold text-yellow-200 mt-5 mb-2 flex items-center gap-2">
            <span className="text-yellow-400 text-2xl">◆</span>
            {termOnlyMatch[1]}:
          </h4>
        )
        continue
      }

      // **Текст:** в начале строки - подзаголовок
      const boldStartMatch = trimmedLine.match(/^\*\*([^*]+)\*\*:\s*(.*)$/)
      if (boldStartMatch) {
        flushList()
        flushTable()
        elements.push(
          <div key={key++} className="mt-4 mb-2">
            <span className="text-xl font-bold text-emerald-300">{boldStartMatch[1]}:</span>
            {boldStartMatch[2] && (
              <span className="text-gray-200 text-lg ml-2">{parseInline(boldStartMatch[2])}</span>
            )}
          </div>
        )
        continue
      }

      // :- определение
      if (trimmedLine.startsWith(':- ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(3)
        elements.push(
          <div key={key++} className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl p-5 my-4 border-l-4 border-purple-400 shadow-lg">
            <p className="text-gray-50 text-xl leading-relaxed">{parseInline(text)}</p>
          </div>
        )
        continue
      }

      // !! важное
      if (trimmedLine.startsWith('!! ') && !trimmedLine.startsWith('!!! ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(3)
        elements.push(
          <div key={key++} className="bg-yellow-500/20 border-2 border-yellow-400/50 rounded-xl p-5 my-4 flex items-start gap-4 shadow-lg">
            <span className="text-yellow-400 text-3xl">💡</span>
            <p className="text-yellow-50 text-xl leading-relaxed">{parseInline(text)}</p>
          </div>
        )
        continue
      }

      // !!! ключевое
      if (trimmedLine.startsWith('!!! ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(4)
        elements.push(
          <div key={key++} className="bg-gradient-to-r from-pink-600/30 to-orange-600/30 border-2 border-pink-400/50 rounded-xl p-5 my-5 shadow-xl">
            <p className="text-pink-50 font-bold text-2xl leading-relaxed">{parseInline(text)}</p>
          </div>
        )
        continue
      }

      // > пример
      if (trimmedLine.startsWith('> ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(2)
        elements.push(
          <div key={key++} className="bg-emerald-500/15 border-l-4 border-emerald-400 rounded-r-xl p-5 my-4 ml-4 shadow-lg">
            <p className="text-emerald-100 text-lg leading-relaxed italic">{parseInline(text)}</p>
          </div>
        )
        continue
      }

      // + заключение
      if (trimmedLine.startsWith('+ ')) {
        flushList()
        flushTable()
        const text = trimmedLine.substring(2)
        elements.push(
          <div key={key++} className="bg-gradient-to-r from-cyan-600/30 to-teal-600/30 rounded-xl p-5 my-5 border-2 border-cyan-400/40 shadow-lg">
            <p className="text-cyan-50 text-xl leading-relaxed">✨ {parseInline(text)}</p>
          </div>
        )
        continue
      }

      // - маркированный список
      if (trimmedLine.startsWith('- ')) {
        if (listType !== 'ul') flushList()
        listType = 'ul'
        currentList.push(trimmedLine.substring(2))
        continue
      }

      // 1. нумерованный список
      const numMatch = trimmedLine.match(/^(\d+)\.\s/)
      if (numMatch) {
        if (listType !== 'ol') flushList()
        listType = 'ol'
        currentList.push(trimmedLine.substring(numMatch[0].length))
        continue
      }

      // Обычный параграф
      flushList()
      flushTable()
      elements.push(
        <p key={key++} className="text-gray-100 text-xl leading-relaxed my-3 italic">
          {parseInline(trimmedLine)}
        </p>
      )
    }

    flushList()
    flushTable()
    return elements
  }

  const parseInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="text-orange-300 font-bold text-xl">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })
  }

  return (
    <div className="lesson-content text-xl">
      {parseContent(content)}
    </div>
  )
}
