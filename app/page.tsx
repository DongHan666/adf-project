'use client';

import { useState } from 'react';

export default function ADF001() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '欢迎来到 ADF-001 创意孵化中心 v1.7\n我是你的 AI 导演。\n\n告诉我一句话你的创意，我会孵化项目并支持专业角色设计。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBible, setCurrentBible] = useState('');
  const [showRoleDesign, setShowRoleDesign] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);

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
      const response = `【导演观察】${currentInput}\n\n【爆款评分】86分\n\n【导演建议】强化视觉钩子和角色弧光。\n\n${bible}`;
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  const generateProjectBible = (idea: string) => {
    return `【Project Bible 正式版】\n\n项目名称：末日重生\n类型：末日 + 系统流\n平台：抖音 9:16 竖屏\n\n下一步：进入角色设计。`;
  };

  const startRoleDesign = () => {
    setShowRoleDesign(true);
    const defaultRoles = [
      { name: "林辰", roleType: "主角", age: 28, height: "185cm", appearance: "运动员体型，左臂明显刀疤，锐利眼神，短黑发，废土作战服", personality: "冷静、坚韧、腹黑、保护欲强", currentGoal: "找到重生真相", finalGoal: "改变末日命运", weakness: "对过去的执念" }
    ];
    setRoles(defaultRoles);
  };

  const addNewRole = () => {
    const newRole = { name: "新配角", roleType: "配角", age: 26, height: "172cm", appearance: "", personality: "", currentGoal: "", finalGoal: "", weakness: "" };
    setRoles([...roles, newRole]);
  };

  const updateRole = (index: number, field: string, value: string) => {
    const newRoles = [...roles];
    newRoles[index][field] = value;
    setRoles(newRoles);
  };

  const generateImagePrompt = (role: any) => {
    const prompt = `一个${role.age}岁亚洲${role.roleType.includes('主角') ? '男性' : '女性'}，名叫${role.name}，${role.appearance}，${role.personality}的表情，废土电影风格，高细节，电影光影，8k --ar 3:4`;
    navigator.clipboard.writeText(prompt);
    alert(`✅ ${role.name} 生图 Prompt 已复制！`);
  };

  const exportAllRoles = () => {
    if (roles.length === 0) return alert('暂无角色');
    let content = `# ADF 角色圣经 v1.7\n\n`;
    roles.forEach((role, i) => {
      content += `## ${role.name} (${role.roleType})\n`;
      content += `年龄：${role.age}岁 | 身高：${role.height}\n`;
      content += `外貌：${role.appearance}\n`;
      content += `性格：${role.personality}\n`;
      content += `当前目标：${role.currentGoal}\n`;
      content += `最终目标：${role.finalGoal}\n`;
      content += `最大弱点：${role.weakness}\n\n`;
    });
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ADF_角色圣经.md';
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ 完整角色圣经已导出！');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-2 text-center">ADF - AI 戏剧工厂</h1>
        <p className="text-xl text-zinc-400 mb-10 text-center">AI 影视导演 · 创意孵化中心 v1.7</p>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* 左侧聊天区 */}
          <div className="col-span-7 bg-zinc-900 rounded-3xl flex flex-col border border-zinc-700 overflow-hidden">
            <div className="flex-1 p-8 overflow-y-auto space-y-8">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-6 rounded-3xl ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                    <pre className="whitespace-pre-wrap text-[15px]">{msg.content}</pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-zinc-700 bg-zinc-950">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="输入你的创意，例如：我想做一个末日重生故事..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500"
                />
                <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="bg-emerald-500 hover:bg-emerald-600 px-12 rounded-2xl font-medium">
                  发送
                </button>
              </div>
            </div>
          </div>

          {/* 右侧角色设计区 */}
          <div className="col-span-5 bg-zinc-900 rounded-3xl flex flex-col border border-zinc-700 overflow-hidden">
            <div className="p-6 border-b border-zinc-700 flex justify-between items-center bg-zinc-950">
              <h3 className="text-xl font-bold">角色圣经</h3>
              <button onClick={addNewRole} className="bg-zinc-700 hover:bg-zinc-600 px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                + 新角色
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!showRoleDesign ? (
                <div className="h-full flex items-center justify-center text-zinc-500 text-center">
                  项目立项后点击下方按钮开始角色设计
                </div>
              ) : (
                roles.map((role, index) => (
                  <div key={index} className="bg-zinc-800/70 p-6 rounded-2xl border border-zinc-700">
                    <div className="flex justify-between mb-4">
                      <input value={role.name} onChange={(e) => updateRole(index, 'name', e.target.value)} className="bg-transparent text-2xl font-bold focus:outline-none border-b border-zinc-600 w-2/3" />
                      <span className="text-xs px-3 py-1 bg-zinc-700 rounded-full self-start">{role.roleType}</span>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>年龄 <input value={role.age} onChange={(e) => updateRole(index, 'age', e.target.value)} className="bg-zinc-900 w-full px-3 py-2 rounded" /></div>
                        <div>身高 <input value={role.height} onChange={(e) => updateRole(index, 'height', e.target.value)} className="bg-zinc-900 w-full px-3 py-2 rounded" /></div>
                      </div>
                      <div>外貌 <input value={role.appearance} onChange={(e) => updateRole(index, 'appearance', e.target.value)} className="bg-zinc-900 w-full px-3 py-2 rounded" /></div>
                      <div>性格 <input value={role.personality} onChange={(e) => updateRole(index, 'personality', e.target.value)} className="bg-zinc-900 w-full px-3 py-2 rounded" /></div>
                      <div>当前目标 <input value={role.currentGoal} onChange={(e) => updateRole(index, 'currentGoal', e.target.value)} className="bg-zinc-900 w-full px-3 py-2 rounded" /></div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button onClick={() => generateImagePrompt(role)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl text-sm">生图 Prompt</button>
                      <button onClick={() => {/* 描述 */ alert('角色详细描述功能开发中')}} className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl text-sm">角色描述</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {showRoleDesign && (
              <div className="p-6 border-t border-zinc-700 bg-zinc-950">
                <button onClick={exportAllRoles} className="w-full bg-white text-black py-4 rounded-2xl font-medium hover:bg-zinc-200">
                  📥 导出完整角色圣经 (Markdown)
                </button>
              </div>
            )}

            {!showRoleDesign && currentBible && (
              <div className="p-6 border-t border-zinc-700 bg-zinc-950">
                <button onClick={startRoleDesign} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-medium">
                  🎭 进入角色设计阶段
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}