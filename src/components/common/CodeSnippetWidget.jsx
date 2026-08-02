import { useState } from 'react'

const files = [
  {
    name: 'ERPStore.ts',
    lang: 'typescript',
    code: `// Enterprise ERP Central Store & Real-Time Sync
import { createSlice, PayloadAction } from '@reduxjs.js/toolkit'

interface ERPState {
  activeUsers: number
  modulesDeployed: string[]
  systemStatus: 'healthy' | 'degraded'
}

const initialState: ERPState = {
  activeUsers: 2450,
  modulesDeployed: ['CRM', 'HRMS', 'Specimen', 'OMR', 'FMS'],
  systemStatus: 'healthy',
}

export const erpSlice = createSlice({
  name: 'erpState',
  initialState,
  reducers: {
    syncMetrics: (state, action: PayloadAction<Partial<ERPState>>) => {
      Object.assign(state, action.payload)
    },
  },
})`,
  },
  {
    name: 'WorkflowEngine.jsx',
    lang: 'jsx',
    code: `// High-Performance Data Table & Workflow Processor
import { useMemo } from 'react'
import { useLenis } from '@/hooks/useLenis'

export function WorkflowEngine({ dataRows }) {
  const processedData = useMemo(() => {
    return dataRows.map(row => ({
      ...row,
      status: row.isApproved ? 'CONFIRMED' : 'PENDING',
      latency: Math.floor(Math.random() * 12) + 18 + 'ms'
    }))
  }, [dataRows])

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4">
      <StatusHeader status="SYSTEM_ONLINE" />
      <VirtualDataGrid items={processedData} />
    </div>
  )
}`,
  },
]

export function CodeSnippetWidget() {
  const [activeFile, setActiveFile] = useState(0)
  const current = files[activeFile]

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#04080e] shadow-2xl overflow-hidden text-left font-mono select-none">
      {/* Code Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        {/* File Tabs */}
        <div className="flex items-center gap-1">
          {files.map((f, i) => (
            <button
              key={f.name}
              onClick={() => setActiveFile(i)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                activeFile === i
                  ? 'bg-white/10 text-white border border-white/10 shadow-sm'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
          TS / React
        </span>
      </div>

      {/* Code Lines Body */}
      <div className="p-4 overflow-x-auto text-[12px] leading-relaxed text-slate-300">
        <pre className="font-mono">
          <code>
            {current.code.split('\n').map((line, idx) => (
              <div key={idx} className="flex items-baseline gap-4 hover:bg-white/[0.03] px-1 rounded">
                <span className="w-6 shrink-0 text-right text-white/20 text-[10px] select-none">{idx + 1}</span>
                <span className={line.startsWith('//') ? 'text-slate-500 italic' : line.includes('import') || line.includes('export') || line.includes('const') || line.includes('return') ? 'text-[#00C6FF]' : line.includes('interface') || line.includes('function') ? 'text-[#00E599]' : 'text-slate-200'}>
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
