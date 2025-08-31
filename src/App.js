import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, Users, MessageSquare, CheckSquare, Calendar, Settings, Search, Bell, Filter, X, Edit2, Trash2, User, Hash, Lock, Volume2, Phone, Video, MoreVertical, Smile, Paperclip, AtSign, UserPlus, CalendarPlus } from 'lucide-react';

const OfficeApp = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [activeChannel, setActiveChannel] = useState('genel');
  const [channels] = useState([
    { id: 'genel', name: 'genel', type: 'public', unread: 3 },
    { id: 'tasarim', name: 'tasarım', type: 'public', unread: 1 },
    { id: 'gelistirme', name: 'geliştirme', type: 'public', unread: 0 },
    { id: 'marketing', name: 'marketing', type: 'private', unread: 0 }
  ]);
  
  const [channelMessages, setChannelMessages] = useState({
    genel: [
      { id: 1, user: 'İclal hanım', message: 'Yeni proje toplantısı yarın saat 14:00\'da', time: '10:30', avatar: 'İH', reactions: ['👍', '✅'] },
      { id: 2, user: 'Yusuf bey', message: 'Tasarım dosyalarını paylaştım, inceleyebilir misiniz?', time: '11:15', avatar: 'YB', reactions: ['👀'] },
      { id: 3, user: 'Efe bey', message: 'Bug fix\'ler tamamlandı, test edebilirsiniz', time: '12:45', avatar: 'EB', reactions: ['🚀', '👏'] }
    ],
    tasarim: [
      { id: 4, user: 'Yusuf bey', message: 'Yeni mockup\'lar hazır, Figma\'da paylaştım', time: '09:20', avatar: 'YB' }
    ],
    gelistirme: [
      { id: 5, user: 'Efe bey', message: 'API endpoint\'leri güncellendi', time: '14:15', avatar: 'EB' }
    ],
    marketing: []
  });

  const [messages, setMessages] = useState(channelMessages[activeChannel] || []);
  const [newMessage, setNewMessage] = useState('');
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Web Sitesi Yenileme',
      status: 'Devam Ediyor',
      progress: 75,
      team: ['İH', 'YB', 'EB'],
      tasks: [
        { id: 1, title: 'Ana sayfa tasarımı', status: 'Tamamlandı', assignee: 'İH' },
        { id: 2, title: 'Backend API geliştirme', status: 'Devam Ediyor', assignee: 'YB' },
        { id: 3, title: 'Mobil responsive', status: 'Beklemede', assignee: 'EB' }
      ]
    },
    {
      id: 2,
      name: 'Mobil Uygulama',
      status: 'Planlama',
      progress: 25,
      team: ['YB', 'EB'],
      tasks: [
        { id: 4, title: 'Wireframe oluşturma', status: 'Devam Ediyor', assignee: 'YB' },
        { id: 5, title: 'Teknik analiz', status: 'Beklemede', assignee: 'EB' }
      ]
    }
  ]);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [teamMembers, setTeamMembers] = useState([
    { id: 'İH', name: 'İclal hanım', role: 'Frontend Developer', online: true, avatar: 'İH', email: 'iclal@sirket.com', phone: '+90 555 123 4567' },
    { id: 'YB', name: 'Yusuf bey', role: 'UI/UX Designer', online: true, avatar: 'YB', email: 'yusuf@sirket.com', phone: '+90 555 234 5678' },
    { id: 'EB', name: 'Efe bey', role: 'Backend Developer', online: false, avatar: 'EB', email: 'efe@sirket.com', phone: '+90 555 345 6789' },
    { id: 'TM', name: 'Siz', role: 'Project Manager', online: true, avatar: 'TM', email: 'siz@sirket.com', phone: '+90 555 456 7890' }
  ]);
  
  const [events, setEvents] = useState([
    { id: 1, title: 'Proje Toplantısı', date: '2025-10-15', time: '14:00', participants: ['İH', 'YB', 'EB'], description: 'Haftalık proje değerlendirmesi' },
    { id: 2, title: 'Müşteri Sunumu', date: '2025-10-18', time: '10:30', participants: ['YB', 'EB'], description: 'Yeni tasarım sunumu' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '', phone: '' });
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '' });
  const [userProfile, setUserProfile] = useState({
    name: 'Siz',
    role: 'Project Manager',
    email: 'siz@sirket.com',
    phone: '+90 555 456 7890',
    status: 'Aktif olarak çalışıyor',
    timezone: 'GMT+3'
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(channelMessages[activeChannel] || []);
  }, [activeChannel, channelMessages]);

  useEffect(() => {
    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: 'Siz',
        message: newMessage,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'TM',
        isOwn: true,
        reactions: []
      };
      
      const updatedChannelMessages = {
        ...channelMessages,
        [activeChannel]: [...(channelMessages[activeChannel] || []), message]
      };
      
      setChannelMessages(updatedChannelMessages);
      setMessages([...messages, message]);
      setNewMessage('');
      setNotifications(prev => prev + 1);
    }
  };

  const addTask = () => {
    if (newTask.trim() && selectedProject) {
      const task = {
        id: Date.now(),
        title: newTask,
        status: 'Beklemede',
        assignee: 'TM'
      };
      const updatedProjects = projects.map(project => 
        project.id === selectedProject.id 
          ? { 
              ...project, 
              tasks: [...project.tasks, task],
              progress: calculateProjectProgress([...project.tasks, task])
            }
          : project
      );
      setProjects(updatedProjects);
      setNewTask('');
      setShowTaskModal(false);
    }
  };

  const updateTask = (taskId, updates) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        );
        
        return {
          ...project,
          tasks: updatedTasks,
          progress: calculateProjectProgress(updatedTasks)
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setEditingTask(null);
    setEditTaskTitle('');
  };

  const deleteTask = (taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.filter(task => task.id !== taskId);
        
        return {
          ...project,
          tasks: updatedTasks,
          progress: calculateProjectProgress(updatedTasks)
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
  };

  const calculateProjectProgress = (tasks) => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.status === 'Tamamlandı').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const toggleTaskStatus = (taskId, currentStatus) => {
    let newStatus;
    if (currentStatus === 'Tamamlandı') {
      newStatus = 'Beklemede';
    } else if (currentStatus === 'Devam Ediyor') {
      newStatus = 'Tamamlandı';
    } else {
      newStatus = 'Devam Ediyor';
    }
    
    updateTask(taskId, { status: newStatus });
  };

  const addNewProject = () => {
    if (newProjectName.trim()) {
      const newProject = {
        id: Date.now(),
        name: newProjectName,
        status: 'Planlama',
        progress: 0,
        team: ['TM'],
        tasks: []
      };
      
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setShowNewProjectModal(false);
      setSelectedProject(newProject);
    }
  };

  const addNewMember = () => {
    if (newMember.name.trim() && newMember.role.trim()) {
      const member = {
        id: newMember.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
        phone: newMember.phone,
        online: false,
        avatar: newMember.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      setTeamMembers([...teamMembers, member]);
      setNewMember({ name: '', role: '', email: '', phone: '' });
      setShowAddMemberModal(false);
    }
  };

  const addNewEvent = () => {
    if (newEvent.title.trim() && newEvent.date && newEvent.time) {
      const event = {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        description: newEvent.description,
        participants: ['TM']
      };
      
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', time: '', description: '' });
      setShowAddEventModal(false);
    }
  };

  const updateProfile = (updates) => {
    setUserProfile({ ...userProfile, ...updates });
    setShowProfileModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Tamamlandı': return 'bg-green-100 text-green-800';
      case 'Devam Ediyor': return 'bg-blue-100 text-blue-800';
      case 'Beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'Planlama': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderChat = () => (
    <div className="flex h-full">
      {/* Channels Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Ofis Takımı</h2>
          <p className="text-sm text-gray-300">ofis.sirket.com</p>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">KANALLAR</h3>
              <button className="text-gray-400 hover:text-white">
                <Plus size={16} />
              </button>
            </div>
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center justify-between p-2 rounded text-left transition-colors ${
                  activeChannel === channel.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {channel.type === 'private' ? <Lock size={16} /> : <Hash size={16} />}
                  <span className="text-sm">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">DOĞRUDAN MESAJLAR</h3>
            {teamMembers.filter(m => m.id !== 'TM').map(member => (
              <button
                key={member.id}
                className="w-full flex items-center space-x-2 p-2 rounded text-left text-gray-300 hover:bg-gray-700 transition-colors"
              >
                <div className="relative">
                  <div className="w-6 h-6 rounded bg-gray-500 flex items-center justify-center text-xs">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    member.online ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <span className="text-sm">{member.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {channels.find(c => c.id === activeChannel)?.type === 'private' ? <Lock size={20} /> : <Hash size={20} />}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{channels.find(c => c.id === activeChannel)?.name}</h2>
              <p className="text-sm text-gray-500">{teamMembers.filter(m => m.online).length} aktif üye</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Phone size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Video size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-2xl ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!msg.isOwn && (
                  <div className="w-10 h-10 rounded bg-gray-500 flex items-center justify-center text-white text-sm font-medium">
                    {msg.avatar}
                  </div>
                )}
                <div className="group">
                  <div className={`rounded-lg px-4 py-2 ${msg.isOwn ? 'bg-blue-500 text-white' : 'bg-white border hover:shadow-sm'}`}>
                    {!msg.isOwn && <p className="text-xs font-medium mb-1 text-gray-600">{msg.user}</p>}
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex space-x-1 mt-1">
                      {msg.reactions.map((reaction, idx) => (
                        <span key={idx} className="bg-white border rounded-full px-2 py-1 text-xs cursor-pointer hover:bg-gray-50">
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t px-6 py-4">
          <div className="border border-gray-300 rounded-lg">
            <div className="flex items-center p-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={`#${channels.find(c => c.id === activeChannel)?.name} kanalına mesaj gönder`}
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Paperclip size={18} />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <AtSign size={18} />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Smile size={18} />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-2 rounded transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="h-full overflow-hidden">
      {/* Projects Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Projeler</h2>
          <p className="text-sm text-gray-500">{projects.length} aktif proje</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Proje ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Filter size={20} />
          </button>
          <button 
            onClick={() => setShowNewProjectModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Yeni Proje</span>
          </button>
        </div>
      </div>

      <div className="flex h-full">
        {/* Projects List */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedProject?.id === project.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>İlerleme</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <div key={index} className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs border-2 border-white">
                        {member}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{project.tasks.length} görev</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="flex-1 bg-gray-50">
          {selectedProject ? (
            <div className="h-full overflow-y-auto">
              <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedProject.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedProject.tasks.filter(t => t.status === 'Tamamlandı').length} / {selectedProject.tasks.length} görev tamamlandı
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Görev Ekle</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-medium text-gray-800 mb-4">Görevler</h4>
                <div className="space-y-3">
                  {selectedProject.tasks.map((task) => (
                    <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            className="rounded" 
                            checked={task.status === 'Tamamlandı'}
                            onChange={() => toggleTaskStatus(task.id, task.status)}
                          />
                          <div>
                            {editingTask === task.id ? (
                              <input
                                type="text"
                                value={editTaskTitle}
                                onChange={(e) => setEditTaskTitle(e.target.value)}
                                onBlur={() => updateTask(task.id, { title: editTaskTitle })}
                                onKeyPress={(e) => e.key === 'Enter' && updateTask(task.id, { title: editTaskTitle })}
                                className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
                                autoFocus
                              />
                            ) : (
                              <h5 
                                className="font-medium text-gray-800 cursor-pointer"
                                onClick={() => {
                                  setEditingTask(task.id);
                                  setEditTaskTitle(task.title);
                                }}
                              >
                                {task.title}
                              </h5>
                            )}
                            <p className="text-sm text-gray-500">Atanan: {task.assignee}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                          <button 
                            className="p-1 text-gray-400 hover:text-gray-600"
                            onClick={() => {
                              setEditingTask(task.id);
                              setEditTaskTitle(task.title);
                            }}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            className="p-1 text-gray-400 hover:text-red-600"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {selectedProject.tasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckSquare size={32} className="mx-auto mb-2 text-gray-300" />
                      <p>Henüz görev eklenmemiş</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <CheckSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Proje detaylarını görmek için bir proje seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Yeni Görev Ekle</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Görev başlığı..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="flex space-x-2">
              <button
                onClick={addTask}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
              >
                Ekle
              </button>
              <button
                onClick={() => setShowTaskModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Yeni Proje Oluştur</h3>
              <button onClick={() => setShowNewProjectModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Proje adı..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && addNewProject()}
            />
            <div className="flex space-x-2">
              <button
                onClick={addNewProject}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
              >
                Oluştur
              </button>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTeam = () => (
    <div className="h-full overflow-y-auto p-6">
      <div className="bg-white rounded-lg border mb-6">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Takım Üyeleri</h2>
          <p className="text-sm text-gray-500">{teamMembers.length} takım üyesi</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-medium">
                  {member.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${member.online ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-500">{member.online ? 'Çevrimiçi' : 'Çevrimdışı'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="h-full overflow-y-auto p-6">
      <div className="bg-white rounded-lg border mb-6">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Takvim</h2>
          <p className="text-sm text-gray-500">Yaklaşan etkinlikler</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-blue-100 text-blue-800 p-3 rounded-lg mr-4">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('tr-TR')} • {event.time}
                  </p>
                  <div className="flex -space-x-2 mt-2">
                    {event.participants.map(participant => (
                      <div key={participant} className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs border-2 border-white">
                        {participant}
                      </div>
                    ))}
                  </div>
                </div>
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  Detay
                </button>
              </div>
            ))}
            
            {events.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
                <p>Yaklaşan etkinlik bulunmuyor</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
          O
        </div>
        
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            activeTab === 'chat' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <MessageSquare size={20} />
        </button>
        
        <button
          onClick={() => setActiveTab('projects')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            activeTab === 'projects' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <CheckSquare size={20} />
        </button>
        
        <button
          onClick={() => setActiveTab('team')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            activeTab === 'team' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Users size={20} />
        </button>
        
        <button
          onClick={() => setActiveTab('calendar')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            activeTab === 'calendar' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <Calendar size={20} />
        </button>

        <div className="flex-1"></div>
        
        <div className="relative">
          <button 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            onClick={() => setNotifications(0)}
          >
            <Bell size={20} />
          </button>
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>
        
        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700 text-white">
          <User size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === 'chat' && renderChat()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'calendar' && renderCalendar()}
      </div>
    </div>
  );
};

export default OfficeApp;