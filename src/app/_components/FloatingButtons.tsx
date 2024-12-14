'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function FloatingButtons() {
  const buttons = [
    { icon: "➕", label: "发闲置" },
    { icon: "💬", label: "消息" },
    { icon: "🔄", label: "反馈" },
  ]

  return (
    <TooltipProvider>
      <div className="fixed right-8 top-1/3 z-50">
        <div className="bg-white rounded-[30px] shadow-lg p-3 flex flex-col gap-4 relative before:content-[''] before:absolute before:inset-0 before:rounded-[30px] before:bg-gradient-to-b before:from-gray-100 before:to-white before:z-[-1]">
          {buttons.map((button, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <span className="text-lg">{button.icon}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={5}>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
} 