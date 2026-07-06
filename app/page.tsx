'use client';

import { useState } from 'react';

export default function ADF001() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '欢迎来到 ADF-001 创意孵化中心 v1.4\n我是你的 AI 导演。\n\n告诉我一句话你的创意，我会孵化项目并支持完整角色设计。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBible, setCurrentBible] = useState('');
  const [showRoleDesign, setShowRoleDesign] = useState(false);
  const [currentRole, setCurrentRole] = useState<any>(null);

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

      const response = `【导演观察】${currentInput}\n\n【导演判断】潜力良好。\n\n【爆款评分】85分\n\n【导演建议】强化视觉钩子和冲突。\n\n${bible}`;

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  const generateProjectBible = (idea: string) => {
    return `【Project Bible 正式版】

项目名称：末日重生
类型：末日 + 系统流
平台：抖音 9:16 竖屏

核心卖点：前3秒强视觉钩子 + 主角觉醒

下一步：点击下方按钮进入**角色设计**。`;
  };

  const startRoleDesign = () => {
    setShowRoleDesign(true);
    setCurrentRole({
      name: "林辰",
      age: 28,
      height: "185cm",
      appearance: "运动员体型，左臂有明显刀疤，锐利眼神，短黑发，废土风格作战服",
      personality: "冷静、坚韧、腹黑、保护欲强",
      currentGoal: "找到重生真相，保护重要的人",
      finalGoal: "改变末日命运",
      weakness: "对过去的执念",
      keyAction: "左臂疤痕觉醒时瞳孔收缩，握紧武器"
    });
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: '【角色设计模式已开启】\n\n主角模板已生成。请告诉我需要调整哪些属性，或直接确认生成角色 Prompt。' 
    }]);
  };

  const generateRolePrompt = () => {
    if (!currentRole) return;
    const prompt = `一个28岁亚洲男性，名叫${currentRole.name}，身高${currentRole.height}，运动员体型，左臂有明显刀疤，锐利眼神，短黑发，${currentRole.appearance}，${currentRole.personality}的表情，${currentRole.keyAction}，废土电影风格，高细节，电影光影，8k`;
    
    alert(`✅ 角色 Prompt 已生成！\n\n${prompt}\n\n已复制到剪贴板（开发中）`);
    navigator.clipboard.writeText(prompt);
  };

  const exportBible = () => {
    if (!currentBible) return alert('请先生成 Project Bible');
    const content = `# ADF Project Bible\n\n${currentBible}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ADF_Project_Bible.md';
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ 已导出！');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">ADF - AI 戏剧工厂</h1>
        <p className="text-xl text-zinc-400 mb-8">AI 影视导演 · 创意孵化中心 v1.4</p>

        <div className="bg-zinc-900 rounded-3xl h-[800px] flex flex-col overflow-hidden border border-zinc-700">
          <div className="flex-1 p-8 overflow-y-auto space-y-8 text-[15px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                  <pre className="whitespace-pre-wrap">{msg.content}</pre>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-emerald-400">导演思考中...</div>}
          </div>

          <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="输入你的创意，例如：我想做一个末日重生故事..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none"
              />
              <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="bg-emerald-500 px-10 rounded-2xl font-medium">
                发送
              </button>
            </div>

            {currentBible && (
              <button onClick={exportBible} className="w-full bg-white text-black py-4 rounded-2xl font-medium">
                📥 导出 Project Bible
              </button>
            )}

            {!showRoleDesign && currentBible && (
              <button 
                onClick={startRoleDesign}
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-medium"
              >
                🎭 进入角色设计阶段
              </button>
            )}

            {showRoleDesign && currentRole && (
              <div className="bg-zinc-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold">角色圣经 - {currentRole.name}</h3>
                <pre className="text-sm whitespace-pre-wrap text-zinc-300 bg-zinc-900 p-4 rounded-xl">
                  年龄：{currentRole.age}岁 | 身高：{currentRole.height}
                  外貌：{currentRole.appearance}
                  性格：{currentRole.personality}
                  当前目标：{currentRole.currentGoal}
                  最终目标：{currentRole.finalGoal}
                  最大弱点：{currentRole.weakness}
                </pre>
                <button 
                  onClick={generateRolePrompt}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-medium"
                >
                  生成角色 Prompt（用于生图）
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}