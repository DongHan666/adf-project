'use client';

import { useState } from 'react';

export default function ADF001() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '欢迎来到 ADF-001 创意孵化中心 v1.1\n我是你的 AI 导演。\n\n告诉我一句话你的创意，我会进行爆款分析并生成 Project Bible。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBible, setCurrentBible] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const bible = generateProjectBible(currentInput);
      setCurrentBible(bible);

      const response = `【导演观察】${currentInput}\n\n【导演判断】这是一个有视觉和冲突潜力的方向。\n\n【爆款评分】83分（高潜力）\n\n【导演建议】严格遵守画面优先、冲突驱动，建议强化前3秒钩子。\n\n${bible}`;

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateProjectBible = (idea: string) => {
    return `【Project Bible 正式版】

项目名称：末日重生
类型：末日 + 系统流
平台：抖音 9:16 竖屏
风格：废土电影感

核心卖点：
- 前3秒强视觉钩子：陨石坠落 + 主角左臂疤痕觉醒
- 情感价值：重生后的生存挣扎与逆袭
- 系列潜力：支持多季扩展

爆款判断：
- 钩子强度：优秀
- 冲突密度：良好
- 传播潜力：高

下一步：你想采用爽文升级流还是黑暗求生流？`;
  };

  const exportBible = () => {
    if (!currentBible) {
      alert('请先生成 Project Bible');
      return;
    }
    const content = `# ADF Project Bible\n\n${currentBible}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ADF_Project_Bible.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Project Bible 已成功导出！');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">ADF - AI 戏剧工厂</h1>
        <p className="text-xl text-zinc-400 mb-8">AI 影视导演 · 创意孵化中心 v1.1</p>

        <div className="bg-zinc-900 rounded-3xl h-[720px] flex flex-col overflow-hidden border border-zinc-700">
          <div className="flex-1 p-8 overflow-y-auto space-y-8">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                  <pre className="whitespace-pre-wrap leading-relaxed">{msg.content}</pre>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-emerald-400">导演正在分析爆款潜力...</div>}
          </div>

          <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="输入你的创意，例如：我想做一个末日重生故事..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 px-10 rounded-2xl font-medium"
              >
                发送
              </button>
            </div>

            {currentBible && (
              <button
                onClick={exportBible}
                className="w-full bg-white text-black py-4 rounded-2xl font-medium hover:bg-zinc-200 flex items-center justify-center gap-2"
              >
                📥 导出完整 Project Bible (Markdown)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}