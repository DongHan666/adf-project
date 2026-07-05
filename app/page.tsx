'use client';

import { useState } from 'react';

export default function ADF001() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '欢迎来到 ADF-001 创意孵化中心 v1.0\n我是你的 AI 导演。\n\n告诉我一句话你的创意，我会严格按照《ADF 创作标准》帮你孵化项目。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let response = `【导演观察】${currentInput}\n\n`;

      // 核心逻辑：符合你的标准
      response += `【导演判断】这是一个有视觉和冲突潜力的方向。\n\n`;
      response += `【导演建议】严格遵守画面优先、冲突驱动原则，建议加入强视觉钩子（如爆炸、觉醒时刻）。\n\n`;

      // 生成结构化 Project Bible
      response += `【Project Bible 正式草稿】\n\n`;
      response += `项目名称：${currentInput.includes('末日') ? '末日重生' : '未命名项目'}\n`;
      response += `类型：末日 + 系统流\n`;
      response += `风格：废土电影感\n`;
      response += `平台：抖音 9:16 竖屏\n`;
      response += `核心冲突：主角左臂疤痕的觉醒与生存压力\n`;
      response += `视觉钩子：前3秒陨石坠落 + 爆炸\n\n`;
      response += `下一步确认：你想采用**爽文升级**还是**黑暗求生**版本？`;

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">ADF - AI 戏剧工厂</h1>
        <p className="text-xl text-zinc-400 mb-8">AI 影视导演 · 创意孵化中心 v1.0</p>

        <div className="bg-zinc-900 rounded-3xl h-[700px] flex flex-col overflow-hidden border border-zinc-700">
          <div className="flex-1 p-8 overflow-y-auto space-y-8 text-[15px] leading-relaxed">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800 border-l-4 border-emerald-500'}`}>
                  <pre className="whitespace-pre-wrap">{msg.content}</pre>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-emerald-400">导演正在严格按标准孵化...</div>}
          </div>

          <div className="p-6 border-t border-zinc-800 bg-zinc-950">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="输入你的创意，例如：我想做一个末日重生故事..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 placeholder:text-zinc-500"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 px-10 rounded-2xl font-medium transition-colors"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}