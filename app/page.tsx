'use client';

import { useState } from 'react';

export default function ADF001() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '欢迎来到 ADF-001 创意孵化中心 v1.6\n我是你的 AI 导演。\n\n告诉我一句话你的创意，我会孵化项目并支持专业角色设计。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBible, setCurrentBible] = useState('');
  const [showRoleDesign, setShowRoleDesign] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

      const response = `【导演观察】${currentInput}\n\n【爆款评分】86分\n\n【导演建议】建议强化视觉钩子和角色弧光。\n\n${bible}`;

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1200);
  };

  const generateProjectBible = (idea: string) => {
    return `【Project Bible 正式版】

项目名称：末日重生
类型：末日 + 系统流
平台：抖音 9:16 竖屏

核心卖点：强视觉钩子 + 情感重生

下一步：点击下方按钮进入**角色设计**阶段。`;
  };

  const startRoleDesign = () => {
    setShowRoleDesign(true);
    const defaultRoles = [
      {
        name: "林辰",
        roleType: "主角",
        age: 28,
        height: "185cm",
        appearance: "运动员体型，左臂有明显刀疤，锐利眼神，短黑发，废土风格作战服",
        personality: "冷静、坚韧、腹黑、保护欲强",
        currentGoal: "找到重生真相，保护重要的人",
        finalGoal: "改变末日命运",
        weakness: "对过去的执念",
        keyAction: "左臂疤痕觉醒时瞳孔收缩，握紧武器"
      }
    ];
    setRoles(defaultRoles);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: '【角色设计模式已开启】\n\n主角模板已生成。你可以编辑角色，或添加新角色。' 
    }]);
  };

  // 生成生图 Prompt
  const generateImagePrompt = (role: any) => {
    const prompt = `一个${role.age}岁亚洲${role.roleType === '主角' ? '男性' : '女性'}，名叫${role.name}，身高${role.height}，${role.appearance}，${role.personality}的表情，${role.keyAction || ''}，废土电影风格，高细节，电影光影，8k --ar 3:4`;
    navigator.clipboard.writeText(prompt);
    alert(`✅ ${role.name} 生图 Prompt 已复制！\n\n${prompt}`);
  };

  // 生成角色描述 Prompt（给 AI 写故事用）
  const generateCharacterPrompt = (role: any) => {
    const prompt = `角色名称：${role.name}\n年龄：${role.age}岁\n外貌：${role.appearance}\n性格：${role.personality}\n当前目标：${role.currentGoal}\n最终目标：${role.finalGoal}\n最大弱点：${role.weakness}\n标志性动作：${role.keyAction || '无'}`;
    navigator.clipboard.writeText(prompt);
    alert(`✅ ${role.name} 角色描述已复制！可用于写剧本或生成分镜。`);
  };

  const addNewRole = () => {
    const newRole = {
      name: "新角色",
      roleType: "配角",
      age: 25,
      height: "170cm",
      appearance: "待补充",
      personality: "待补充",
      currentGoal: "待补充",
      finalGoal: "待补充",
      weakness: "待补充",
      keyAction: ""
    };
    setRoles([...roles, newRole]);
    setEditingIndex(roles.length);
  };

  const updateRole = (index: number, field: string, value: string) => {
    const newRoles = [...roles];
    newRoles[index][field] = value;
    setRoles(newRoles);
  };

  const exportBible = () => {
    if (!currentBible) return alert('请先生成 Project Bible');
    const content = `# ADF Project Bible v1.6\n\n${currentBible}`;
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
        <p className="text-xl text-zinc-400 mb-8">AI 影视导演 · 创意孵化中心 v1.6</p>

        <div className="bg-zinc-900 rounded-3xl h-[840px] flex flex-col overflow-hidden border border-zinc-700">
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
              <button onClick={startRoleDesign} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-medium">
                🎭 进入角色设计阶段
              </button>
            )}

            {showRoleDesign && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">角色圣经</h3>
                  <button onClick={addNewRole} className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-xl text-sm">
                    + 添加新角色
                  </button>
                </div>

                {roles.map((role, index) => (
                  <div key={index} className="bg-zinc-800 p-6 rounded-2xl">
                    <div className="flex justify-between mb-4">
                      <input
                        value={role.name}
                        onChange={(e) => updateRole(index, 'name', e.target.value)}
                        className="bg-transparent text-xl font-bold border-b border-zinc-600 focus:outline-none"
                      />
                      <span className="text-sm text-zinc-400">{role.roleType}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                      <div>年龄：<input value={role.age} onChange={(e) => updateRole(index, 'age', e.target.value)} className="bg-zinc-900 px-2 rounded" /></div>
                      <div>身高：<input value={role.height} onChange={(e) => updateRole(index, 'height', e.target.value)} className="bg-zinc-900 px-2 rounded" /></div>
                      <div className="col-span-2">外貌：<input value={role.appearance} onChange={(e) => updateRole(index, 'appearance', e.target.value)} className="bg-zinc-900 w-full px-2 rounded" /></div>
                      <div className="col-span-2">性格：<input value={role.personality} onChange={(e) => updateRole(index, 'personality', e.target.value)} className="bg-zinc-900 w-full px-2 rounded" /></div>
                      <div className="col-span-2">当前目标：<input value={role.currentGoal} onChange={(e) => updateRole(index, 'currentGoal', e.target.value)} className="bg-zinc-900 w-full px-2 rounded" /></div>
                      <div className="col-span-2">最终目标：<input value={role.finalGoal} onChange={(e) => updateRole(index, 'finalGoal', e.target.value)} className="bg-zinc-900 w-full px-2 rounded" /></div>
                      <div className="col-span-2">最大弱点：<input value={role.weakness} onChange={(e) => updateRole(index, 'weakness', e.target.value)} className="bg-zinc-900 w-full px-2 rounded" /></div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button onClick={() => generateImagePrompt(role)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl text-sm">
                        生成生图 Prompt
                      </button>
                      <button onClick={() => generateCharacterPrompt(role)} className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-3 rounded-xl text-sm">
                        生成角色描述
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}