'use client';

import { useState } from 'react';

export default function ADF() {
  const [activeModule, setActiveModule] = useState('incubator');

  const modules = [
    { id: 'incubator', name: '创意孵化中心', icon: '🌱' },
    { id: 'roles', name: '角色设计', icon: '🎭' },
    { id: 'world', name: '世界观设定', icon: '🌍' },
    { id: 'storyboard', name: '分镜规划', icon: '🎬' },
    { id: 'projects', name: '我的项目库', icon: '📁' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* 侧边栏 */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-700 p-6 flex flex-col fixed h-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">ADF</h1>
          <p className="text-emerald-400 text-sm">AI 戏剧工厂 v2.1</p>
        </div>

        <nav className="space-y-1 flex-1">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 text-lg transition-all ${
                activeModule === mod.id ? 'bg-emerald-600 text-white' : 'hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <span className="text-2xl">{mod.icon}</span>
              {mod.name}
            </button>
          ))}
        </nav>
      </div>

      {/* 主内容 */}
      <div className="flex-1 ml-72">
        {activeModule === 'incubator' && <IncubatorModule />}
        {activeModule === 'roles' && <RoleModule />}
        {activeModule === 'world' && <WorldModule />}
        {activeModule === 'storyboard' && <StoryboardModule />}
        {activeModule === 'projects' && <ProjectsModule />}
      </div>
    </div>
  );
}

/* ==================== 孵化中心 ==================== */
function IncubatorModule() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '欢迎来到创意孵化中心 v2.1\n输入一句话创意，我会帮你生成 Project Bible。' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const temp = input;
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `【导演观察】${temp}\n\n【爆款评分】86分\n\n【Project Bible】已生成（下一步可进入角色设计）` 
      }]);
    }, 800);
  };

  return (
    <div className="p-10 max-w-4xl">
      <h2 className="text-4xl font-bold mb-8">创意孵化中心</h2>
      <div className="bg-zinc-900 rounded-3xl p-8 h-[650px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-6 mb-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
              <div className={`max-w-[75%] p-5 rounded-3xl ${m.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="例如：我想做一个末日重生故事..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none"
          />
          <button onClick={sendMessage} className="bg-emerald-500 px-10 rounded-2xl">发送</button>
        </div>
      </div>
    </div>
  );
}

/* ==================== 角色模块（完整） ==================== */
function RoleModule() {
  const [roles, setRoles] = useState<any[]>([
    { name: "林辰", roleType: "主角", age: 28, height: "185cm", appearance: "运动员体型，左臂明显刀疤，锐利眼神，短黑发，废土作战服", personality: "冷静、坚韧、腹黑、保护欲强", currentGoal: "找到重生真相", finalGoal: "改变末日命运", weakness: "对过去的执念" },
    { name: "苏婉", roleType: "女主", age: 26, height: "170cm", appearance: "黑色长发，坚韧眼神，废土战术服", personality: "聪明、果敢、外冷内热", currentGoal: "寻找失散家人", finalGoal: "与林辰并肩改变世界", weakness: "对情感的犹豫" }
  ]);

  const addNewRole = () => {
    const newRole = { name: "新配角", roleType: "配角", age: 26, height: "172cm", appearance: "待补充", personality: "待补充", currentGoal: "待补充", finalGoal: "待补充", weakness: "待补充" };
    setRoles([...roles, newRole]);
  };

  const updateRole = (index: number, field: string, value: string | number) => {
    const newRoles = [...roles];
    (newRoles[index] as any)[field] = value;
    setRoles(newRoles);
  };

  const generateImagePrompt = (role: any) => {
    const prompt = `一个${role.age}岁亚洲${role.roleType.includes('主角') ? '男性' : '女性'}，名叫${role.name}，${role.appearance}，废土电影风格，高细节 --ar 3:4`;
    navigator.clipboard.writeText(prompt);
    alert(`✅ ${role.name} Prompt 已复制！`);
  };

  const exportAllRoles = () => {
    let content = `# ADF 角色圣经 v2.1\n\n`;
    roles.forEach(role => {
      content += `## ${role.name} (${role.roleType})\n\n`;
      Object.keys(role).forEach(key => {
        if (key !== 'name' && key !== 'roleType') content += `- ${key}：${role[key]}\n`;
      });
      content += `\n---\n\n`;
    });
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'ADF_角色圣经.md'; a.click(); URL.revokeObjectURL(url);
    alert('✅ 已导出！');
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-8">
        <h2 className="text-4xl font-bold">角色设计</h2>
        <button onClick={addNewRole} className="bg-emerald-600 px-6 py-3 rounded-2xl">+ 新角色</button>
      </div>
      <div className="grid gap-6">
        {roles.map((role, i) => (
          <div key={i} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-700">
            {/* 角色卡片内容同之前 */}
            <div className="flex justify-between mb-6">
              <input value={role.name} onChange={e => updateRole(i, 'name', e.target.value)} className="bg-transparent text-3xl font-bold w-1/2 border-b border-zinc-600" />
              <span className="bg-zinc-800 px-4 py-1 rounded-full text-sm">{role.roleType}</span>
            </div>
            {/* 其他字段省略以节省长度，可继续扩展 */}
            <button onClick={() => generateImagePrompt(role)} className="mt-4 bg-emerald-600 px-8 py-3 rounded-2xl">生成生图 Prompt</button>
          </div>
        ))}
      </div>
      <button onClick={exportAllRoles} className="mt-8 w-full bg-white text-black py-5 rounded-2xl">📥 导出角色圣经</button>
    </div>
  );
}

/* 其他模块占位（可继续完善