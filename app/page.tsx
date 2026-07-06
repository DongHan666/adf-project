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
          <p className="text-zinc-400 text-sm">AI 戏剧工厂 v2.0</p>
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

      {/* 主内容区域 */}
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

/* ==================== 孵化中心模块 ==================== */
function IncubatorModule() {
  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-8">创意孵化中心</h2>
      <div className="bg-zinc-900 rounded-3xl p-10 text-center text-zinc-400 min-h-[600px]">
        孵化中心聊天 + Project Bible 功能开发中...
      </div>
    </div>
  );
}

/* ==================== 角色设计模块（完整版） ==================== */
function RoleModule() {
  const [roles, setRoles] = useState([
    { name: "林辰", roleType: "主角", age: 28, height: "185cm", appearance: "运动员体型，左臂明显刀疤，锐利眼神，短黑发，废土作战服", personality: "冷静、坚韧、腹黑、保护欲强", currentGoal: "找到重生真相", finalGoal: "改变末日命运", weakness: "对过去的执念" },
    { name: "苏婉", roleType: "女主", age: 26, height: "170cm", appearance: "黑色长发，坚韧眼神，废土战术服", personality: "聪明、果敢、外冷内热", currentGoal: "寻找失散家人", finalGoal: "与林辰并肩改变世界", weakness: "对情感的犹豫" },
    { name: "老周", roleType: "导师", age: 45, height: "178cm", appearance: "胡须花白，独眼，机械义肢", personality: "经验丰富、可靠、话少", currentGoal: "守护幸存者营地", finalGoal: "找到末日真相", weakness: "身体伤病" }
  ]);

  const addNewRole = () => {
    const newRole = { name: "新配角", roleType: "配角", age: 26, height: "172cm", appearance: "待补充", personality: "待补充", currentGoal: "待补充", finalGoal: "待补充", weakness: "待补充" };
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
    let content = `# ADF 角色圣经 v2.0\n生成时间：${new Date().toLocaleString('zh-CN')}\n\n`;
    roles.forEach(role => {
      content += `## ${role.name} (${role.roleType})\n\n`;
      content += `- 年龄：${role.age}岁\n- 身高：${role.height}\n- 外貌：${role.appearance}\n- 性格：${role.personality}\n- 当前目标：${role.currentGoal}\n- 最终目标：${role.finalGoal}\n- 最大弱点：${role.weakness}\n\n---\n\n`;
    });
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ADF_角色圣经.md';
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ 角色圣经已导出！');
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">角色设计</h2>
        <button onClick={addNewRole} className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-2xl flex items-center gap-2">
          + 添加新角色
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {roles.map((role, index) => (
          <div key={index} className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <div className="flex justify-between mb-6">
              <input
                value={role.name}
                onChange={(e) => updateRole(index, 'name', e.target.value)}
                className="bg-transparent text-3xl font-bold focus:outline-none border-b border-zinc-600 w-1/2"
              />
              <span className="px-4 py-1 bg-zinc-800 rounded-full text-sm self-start">{role.roleType}</span>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>年龄 <input value={role.age} onChange={(e) => updateRole(index, 'age', e.target.value)} className="bg-zinc-800 w-full px-4 py-2 rounded-xl" /></div>
              <div>身高 <input value={role.height} onChange={(e) => updateRole(index, 'height', e.target.value)} className="bg-zinc-800 w-full px-4 py-2 rounded-xl" /></div>
              <div className="col-span-2">外貌 <input value={role.appearance} onChange={(e) => updateRole(index, 'appearance', e.target.value)} className="bg-zinc-800 w-full px-4 py-2 rounded-xl" /></div>
              <div className="col-span-2">性格 <input value={role.personality} onChange={(e) => updateRole(index, 'personality', e.target.value)} className="bg-zinc-800 w-full px-4 py-2 rounded-xl" /></div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => generateImagePrompt(role)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl">生成生图 Prompt</button>
              <button onClick={() => alert('角色详细描述开发中')} className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-4 rounded-2xl">生成角色描述</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={exportAllRoles} className="mt-8 w-full bg-white text-black py-5 rounded-2xl font-medium hover:bg-zinc-200">
        📥 导出完整角色圣经 (Markdown)
      </button>
    </div>
  );
}

/* 其他模块占位 */
function WorldModule() { return <div className="p-10"><h2 className="text-4xl font-bold">世界观设定</h2><div className="bg-zinc-900 rounded-3xl p-20 text-center text-2xl text-zinc-500">开发中...</div></div>; }
function StoryboardModule() { return <div className="p-10"><h2 className="text-4xl font-bold">分镜规划</h2><div className="bg-zinc-900 rounded-3xl p-20 text-center text-2xl text-zinc-500">开发中...</div></div>; }
function ProjectsModule() { return <div className="p-10"><h2 className="text-4xl font-bold">我的项目库</h2><div className="bg-zinc-900 rounded-3xl p-20 text-center text-2xl text-zinc-500">开发中...</div></div>; }