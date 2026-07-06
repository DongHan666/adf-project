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
      {/* 侧边栏导航 */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-700 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">ADF</h1>
          <p className="text-zinc-400 text-sm">AI 戏剧工厂</p>
        </div>

        <nav className="space-y-2 flex-1">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`w-full text-left px-5 py-4 rounded-2xl flex items-center gap-3 text-lg transition-all ${
                activeModule === mod.id 
                  ? 'bg-emerald-600 text-white' 
                  : 'hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <span className="text-2xl">{mod.icon}</span>
              {mod.name}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-zinc-700 text-xs text-zinc-500">
          v2.0 模块框架<br />
          严格遵循 ADF 创作标准
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-auto">
        {activeModule === 'incubator' && <IncubatorModule />}
        {activeModule === 'roles' && <RoleModule />}
        {activeModule === 'world' && <WorldModule />}
        {activeModule === 'storyboard' && <StoryboardModule />}
        {activeModule === 'projects' && <ProjectsModule />}
      </div>
    </div>
  );
}

/* ==================== 各模块组件 ==================== */

function IncubatorModule() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: '欢迎来到创意孵化中心\n输入创意开始孵化项目。' }]);
  const [input, setInput] = useState('');

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">创意孵化中心</h2>
      {/* 这里放之前的聊天界面逻辑 */}
      <div className="bg-zinc-900 rounded-3xl p-8 min-h-[600px]">
        {/* 聊天内容占位 */}
        <p className="text-zinc-400">孵化中心聊天界面（可继续扩展）</p>
      </div>
    </div>
  );
}

function RoleModule() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">角色设计</h2>
      <div className="bg-zinc-900 rounded-3xl p-8">
        <p>角色圣经模块（当前功能已实现）</p>
        {/* 这里后续可以把之前的角色代码放进来 */}
      </div>
    </div>
  );
}

function WorldModule() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">世界观设定</h2>
      <div className="bg-zinc-900 rounded-3xl p-10 text-center">
        <p className="text-2xl mb-6">🌍 世界观模块开发中</p>
        <p className="text-zinc-400">后续将在这里设计末日背景、规则系统、关键地点等</p>
      </div>
    </div>
  );
}

function StoryboardModule() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">分镜规划</h2>
      <div className="bg-zinc-900 rounded-3xl p-10 text-center text-zinc-400">
        分镜 + Prompt 引擎开发中...
      </div>
    </div>
  );
}

function ProjectsModule() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">我的项目库</h2>
      <div className="bg-zinc-900 rounded-3xl p-10 text-center text-zinc-400">
        项目保存与管理功能开发中...
      </div>
    </div>
  );
}