import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line,
    XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import {
    Users, Calendar, Activity, CheckCircle, AlertTriangle, TrendingUp,
    Sun, Moon, Download, Filter, Clock, DollarSign, Target, Camera,
    AlertCircle, ChevronRight, UserCheck, MessageSquare, Award, Package,
    FileText, Shield, Wrench, FileCheck, Search, Bell, Settings, Image,
    MapPin, Phone, Mail, Briefcase, Star, BarChart3, TrendingDown
} from "lucide-react";

// ===== GOOGLE SHEETS CONFIG =====
const GOOGLE_SHEETS = {
    tasks: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5noqQZXi5ciYwvov6OivXEQzBM0kOLVrgdSpMSnE_RGhFNrx512dpRlfxJBBeCRWOe8IyvMPfEsQW/pub?output=csv", // ضع رابط Google Sheets CSV هنا
    team: "", // ضع رابط Google Sheets CSV للفريق
    budget: "", // ضع رابط Google Sheets CSV للميزانية
    materials: "", // ضع رابط Google Sheets CSV للمواد
    comments: "", // ضع رابط Google Sheets CSV للتعليقات
    safety: "", // ضع رابط Google Sheets CSV للسلامة
    equipment: "", // ضع رابط Google Sheets CSV للمعدات
    timeline: "", // ضع رابط Google Sheets CSV للجدول الزمني
    performance: "", // ضع رابط Google Sheets CSV للأداء
    photos: "", // ضع رابط Google Sheets CSV للصور
    milestones: "", // ضع رابط Google Sheets CSV للمعالم الرئيسية
    risks: "", // ضع رابط Google Sheets CSV للمخاطر
};

// ===== PROJECT CONFIG =====
const projectName = "Kingdom Gate Tower - Low Current Systems";
const projectClient = "Al Fahd Investment - STS";
const projectContract = "SO-23_0941_001_R_08";
const projectStart = new Date(2025, 2, 1);
const projectEnd = new Date(2025, 11, 31);

export default function App() {
    const [view, setView] = useState("Overview");
    const [darkMode, setDarkMode] = useState(false);
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterOwner, setFilterOwner] = useState("All");
    const [filterTeam, setFilterTeam] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [loading, setLoading] = useState(true);

    // State for all data
    const [tasksData, setTasksData] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [budgetData, setBudgetData] = useState([]);
    const [materialsData, setMaterialsData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [safetyData, setSafetyData] = useState([]);
    const [equipmentData, setEquipmentData] = useState([]);
    const [timelineData, setTimelineData] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [photosData, setPhotosData] = useState([]);
    const [milestonesData, setMilestonesData] = useState([]);
    const [risksData, setRisksData] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Helper function to parse CSV
    const parseCSV = (text) => {
        const lines = text.split("\n").filter(line => line.trim() !== "");
        if (lines.length === 0) return [];

        const headers = lines[0].split(",").map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = line.split(",");
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index]?.trim() || "";
            });
            return obj;
        });
    };

    // Fetch data from Google Sheets
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Tasks
                if (GOOGLE_SHEETS.tasks) {
                    const res = await fetch(GOOGLE_SHEETS.tasks);
                    const text = await res.text();
                    setTasksData(parseCSV(text));
                }

                // Fetch Team
                if (GOOGLE_SHEETS.team) {
                    const res = await fetch(GOOGLE_SHEETS.team);
                    const text = await res.text();
                    setTeamData(parseCSV(text));
                }

                // Fetch Budget
                if (GOOGLE_SHEETS.budget) {
                    const res = await fetch(GOOGLE_SHEETS.budget);
                    const text = await res.text();
                    const data = parseCSV(text).map(d => ({
                        ...d,
                        allocated: Number(d.allocated) || 0,
                        spent: Number(d.spent) || 0,
                        remaining: Number(d.remaining) || 0
                    }));
                    setBudgetData(data);
                }

                // Fetch Materials
                if (GOOGLE_SHEETS.materials) {
                    const res = await fetch(GOOGLE_SHEETS.materials);
                    const text = await res.text();
                    setMaterialsData(parseCSV(text));
                }

                // Fetch Comments
                if (GOOGLE_SHEETS.comments) {
                    const res = await fetch(GOOGLE_SHEETS.comments);
                    const text = await res.text();
                    setCommentsData(parseCSV(text));
                }

                // Fetch Safety
                if (GOOGLE_SHEETS.safety) {
                    const res = await fetch(GOOGLE_SHEETS.safety);
                    const text = await res.text();
                    setSafetyData(parseCSV(text));
                }

                // Fetch Equipment
                if (GOOGLE_SHEETS.equipment) {
                    const res = await fetch(GOOGLE_SHEETS.equipment);
                    const text = await res.text();
                    setEquipmentData(parseCSV(text));
                }

                // Fetch Timeline
                if (GOOGLE_SHEETS.timeline) {
                    const res = await fetch(GOOGLE_SHEETS.timeline);
                    const text = await res.text();
                    const data = parseCSV(text).map(d => ({
                        ...d,
                        planned: Number(d.planned) || 0,
                        actual: Number(d.actual) || 0
                    }));
                    setTimelineData(data);
                }

                // Fetch Performance
                if (GOOGLE_SHEETS.performance) {
                    const res = await fetch(GOOGLE_SHEETS.performance);
                    const text = await res.text();
                    const data = parseCSV(text).map(d => ({
                        ...d,
                        productivity: Number(d.productivity) || 0,
                        quality: Number(d.quality) || 0,
                        teamwork: Number(d.teamwork) || 0,
                        reliability: Number(d.reliability) || 0
                    }));
                    setPerformanceData(data);
                }

                // Fetch Photos
                if (GOOGLE_SHEETS.photos) {
                    const res = await fetch(GOOGLE_SHEETS.photos);
                    const text = await res.text();
                    setPhotosData(parseCSV(text));
                }

                // Fetch Milestones
                if (GOOGLE_SHEETS.milestones) {
                    const res = await fetch(GOOGLE_SHEETS.milestones);
                    const text = await res.text();
                    setMilestonesData(parseCSV(text));
                }

                // Fetch Risks
                if (GOOGLE_SHEETS.risks) {
                    const res = await fetch(GOOGLE_SHEETS.risks);
                    const text = await res.text();
                    const data = parseCSV(text).map(d => ({
                        ...d,
                        probability: Number(d.probability) || 0,
                        impact: Number(d.impact) || 0
                    }));
                    setRisksData(data);
                }

            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
            setLoading(false);
        };

        fetchData();

        // Auto-generate notifications
        setNotifications([
            { id: 1, type: "warning", message: "3 tasks approaching deadline", time: "2 hours ago" },
            { id: 2, type: "info", message: "Weekly progress meeting on Monday 9AM", time: "5 hours ago" },
            { id: 3, type: "success", message: "Phase 1 milestone completed", time: "1 day ago" },
        ]);
    }, []);

    // Filter and calculate stats
    const filteredTasks = tasksData.filter(task => {
        const statusMatch = filterStatus === "All" || task.status === filterStatus;
        const ownerMatch = filterOwner === "All" || task.assigned_to === filterOwner;
        const searchMatch = searchQuery === "" ||
            task.system?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.phase?.toLowerCase().includes(searchQuery.toLowerCase());
        return statusMatch && ownerMatch && searchMatch;
    });

    const filteredPerformance = performanceData.filter(member =>
        filterTeam === "All" || member.team === filterTeam
    );

    const totalTasks = tasksData.length;
    const completedTasks = tasksData.filter(t => t.status === "Completed").length;
    const inProgressTasks = tasksData.filter(t => t.status === "In Progress").length;
    const notStartedTasks = tasksData.filter(t => t.status === "Not Started").length;
    const avgProgress = tasksData.reduce((sum, t) => sum + (Number(t.progress) || 0), 0) / totalTasks || 0;

    const totalBudget = budgetData.reduce((sum, c) => sum + c.allocated, 0);
    const totalSpent = budgetData.reduce((sum, c) => sum + c.spent, 0);
    const budgetRemaining = totalBudget - totalSpent;

    const daysRemaining = Math.ceil((projectEnd - new Date()) / (1000 * 60 * 60 * 24));

    const theme = darkMode
        ? { bg: "bg-gray-900", card: "bg-gray-800", text: "text-gray-100", border: "border-gray-700", hover: "hover:bg-gray-700" }
        : { bg: "bg-gradient-to-br from-gray-50 to-blue-50", card: "bg-white", text: "text-gray-900", border: "border-gray-200", hover: "hover:bg-gray-50" };

    const exportToPDF = () => window.print();

    const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, alert }) => (
        <div className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border} transform transition-all hover:scale-105 hover:shadow-xl relative`}>
            {alert && <AlertCircle className="absolute top-2 right-2 text-red-500" size={20} />}
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
                    <Icon className="text-white" size={24} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.startsWith('+') ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {trend}
                    </div>
                )}
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
            <p className={`text-3xl font-bold ${theme.text} mb-1`}>{value}</p>
            {subtitle && <p className="text-gray-400 text-xs">{subtitle}</p>}
        </div>
    );

    const StatusBadge = ({ status }) => {
        const colors = {
            "Completed": "bg-green-500",
            "In Progress": "bg-blue-500",
            "Not Started": "bg-orange-500"
        };
        return <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${colors[status] || 'bg-gray-500'}`}>{status}</span>;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading Project Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
            {/* Header */}
            <div className={`${theme.card} shadow-lg border-b ${theme.border}`}>
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {projectName}
                            </h1>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />Client: {projectClient}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Briefcase size={14} />Contract: {projectContract}
                                </span>
                                <span className="flex items-center gap-1 text-blue-600 font-semibold">
                                    <Clock size={14} />{daysRemaining} days remaining
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <button onClick={() => setShowNotifications(!showNotifications)}
                                    className={`p-3 rounded-lg ${theme.card} border ${theme.border} relative hover:shadow-md transition-all`}>
                                    <Bell size={20} />
                                    {notifications.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                            {notifications.length}
                                        </span>
                                    )}
                                </button>
                                {showNotifications && (
                                    <div className={`absolute right-0 mt-2 w-80 ${theme.card} rounded-lg shadow-xl border ${theme.border} z-50 overflow-hidden`}>
                                        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
                                            <h3 className="font-bold text-white">Notifications</h3>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map(notif => (
                                                <div key={notif.id} className={`p-4 border-b border-gray-100 ${theme.hover} cursor-pointer transition-all`}>
                                                    <div className="flex items-start gap-3">
                                                        <div className={`w-2 h-2 rounded-full mt-2 ${notif.type === 'warning' ? 'bg-orange-500' :
                                                            notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                                            }`} />
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium">{notif.message}</p>
                                                            <span className="text-xs text-gray-500">{notif.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setDarkMode(!darkMode)}
                                className={`p-3 rounded-lg ${theme.card} border ${theme.border} hover:shadow-md transition-all`}>
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button onClick={exportToPDF}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all">
                                <Download size={20} />Export PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-7xl mx-auto px-6 mt-6">
                <div className="flex-1 relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tasks, systems, team members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme.border} ${theme.card} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 border-b border-gray-300 overflow-x-auto">
                    {["Overview", "Tasks", "Team", "Performance", "Budget", "Materials", "Equipment", "Safety", "Photos", "Milestones", "Risks", "Comments"].map(tab => (
                        <button key={tab} onClick={() => setView(tab)}
                            className={`px-6 py-3 font-semibold border-b-2 whitespace-nowrap transition-all ${view === tab
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {view === "Overview" && (
                    <div className="space-y-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard icon={Target} title="Overall Progress" value={`${avgProgress.toFixed(1)}%`}
                                subtitle={`${completedTasks}/${totalTasks} completed`} color="from-blue-500 to-blue-600" trend="+5%" />
                            <StatCard icon={DollarSign} title="Budget Spent" value={`SAR ${(totalSpent / 1000).toFixed(0)}K`}
                                subtitle={`${(budgetRemaining / 1000).toFixed(0)}K remaining`} color="from-green-500 to-green-600" trend="-2%" />
                            <StatCard icon={Activity} title="Active Tasks" value={inProgressTasks}
                                subtitle={`${notStartedTasks} pending`} color="from-orange-500 to-red-600" trend="+3%" />
                            <StatCard icon={Users} title="Team Size" value={teamData.length || 0}
                                subtitle={`${performanceData.length || 0} tracked`} color="from-purple-500 to-purple-600" />
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border} lg:col-span-2`}>
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                                    <Calendar className="text-purple-600" size={24} />Timeline - Planned vs Actual
                                </h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <AreaChart data={timelineData}>
                                        <defs>
                                            <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis domain={[0, 100]} />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="planned" stroke="#94a3b8" fillOpacity={1} fill="url(#colorPlanned)" name="Planned" />
                                        <Area type="monotone" dataKey="actual" stroke="#10b981" fillOpacity={1} fill="url(#colorActual)" name="Actual" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border}`}>
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                                    <Activity className="text-blue-600" size={24} />Task Status Distribution
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: "Completed", value: completedTasks },
                                                { name: "In Progress", value: inProgressTasks },
                                                { name: "Not Started", value: notStartedTasks }
                                            ]}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                        >
                                            {[0, 1, 2].map((_, i) => <Cell key={i} fill={["#10b981", "#3b82f6", "#f59e0b"][i]} />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border}`}>
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                                    <DollarSign className="text-green-600" size={24} />Budget Overview
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={budgetData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" angle={-15} textAnchor="end" height={100} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="spent" fill="#10b981" name="Spent" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Milestones Section */}
                        {milestonesData.length > 0 && (
                            <div className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border}`}>
                                <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
                                    <Star className="text-yellow-500" size={24} />Project Milestones
                                </h3>
                                <div className="relative">
                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                                    <div className="space-y-6">
                                        {milestonesData.map((milestone, i) => (
                                            <div key={i} className="relative pl-12">
                                                <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${milestone.status === "Completed" ? "bg-green-500" :
                                                    milestone.status === "In Progress" ? "bg-blue-500" : "bg-gray-300"
                                                    }`}>
                                                    {milestone.status === "Completed" && <CheckCircle className="text-white" size={16} />}
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-bold text-lg">{milestone.name}</h4>
                                                            <p className="text-sm text-gray-600">{milestone.description}</p>
                                                            <span className="text-xs text-gray-500 mt-1 inline-block">{milestone.date}</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${milestone.status === "Completed" ? "bg-green-100 text-green-800" :
                                                            milestone.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                                            }`}>
                                                            {milestone.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {view === "Tasks" && (
                    <div className="space-y-6">
                        {/* Filters */}
                        <div className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border}`}>
                            <button onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 text-lg font-semibold mb-4 hover:text-blue-600 transition-colors">
                                <Filter size={20} /> Filters
                                <ChevronRight className={`transform transition-transform ${showFilters ? "rotate-90" : ""}`} size={20} />
                            </button>

                            {showFilters && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Status</label>
                                        <select onChange={e => setFilterStatus(e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} focus:ring-2 focus:ring-blue-500`}>
                                            <option>All</option>
                                            <option>Completed</option>
                                            <option>In Progress</option>
                                            <option>Not Started</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Assigned To</label>
                                        <select onChange={e => setFilterOwner(e.target.value)}
                                            className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} focus:ring-2 focus:ring-blue-500`}>
                                            <option>All</option>
                                            {[...new Set(tasksData.map(t => t.assigned_to))].map(owner => (
                                                <option key={owner}>{owner}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Priority</label>
                                        <select className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} focus:ring-2 focus:ring-blue-500`}>
                                            <option>All</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tasks Table */}
                        <div className={`${theme.card} rounded-xl shadow-lg border ${theme.border} overflow-hidden`}>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Block</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">System</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Phase</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Assigned To</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Progress</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredTasks.map(task => (
                                            <tr key={task.id} className={`${theme.hover} transition-all`}>
                                                <td className="px-6 py-4 font-mono text-sm font-semibold">{task.id}</td>
                                                <td className="px-6 py-4">{task.block}</td>
                                                <td className="px-6 py-4 font-medium">{task.system}</td>
                                                <td className="px-6 py-4 text-sm">{task.phase}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${task.assigned_to === "Lakshmi" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                                                        }`}>
                                                        {task.assigned_to}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                                                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                                                                style={{ width: `${task.progress}%` }} />
                                                        </div>
                                                        <span className="text-sm font-semibold min-w-[3rem] text-right">{task.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4"><StatusBadge status={task.status} /></td>
                                                <td className="px-6 py-4 text-sm">{task.duration_days} days</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {view === "Team" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {teamData.map((member, i) => (
                                <div key={i} className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border} hover:shadow-xl transition-all`}>
                                    <div className="flex items-start gap-4 mb-6">
                                        {/* Profile Image */}
                                        <div className="relative">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-blue-500">
                                                    {member.name?.split(' ').map(n => n[0]).join('')}
                                                </div>
                                            )}
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                                        </div>

                                        {/* Member Info */}
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                            <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold flex items-center gap-1">
                                                    <Mail size={12} />{member.email}
                                                </span>
                                                {member.phone && (
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
                                                        <Phone size={12} />{member.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    {member.skills && (
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                                                <Award size={16} className="text-yellow-500" />Skills & Expertise:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {member.skills.split(',').map((skill, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                                                        {skill.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Systems Responsible */}
                                    {member.systems && (
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                                                <Briefcase size={16} className="text-blue-500" />Responsible Systems:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {member.systems.split(',').map((sys, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                                                        {sys.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-blue-600">{member.tasksCompleted || 0}</p>
                                            <p className="text-xs text-gray-600">Completed</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-orange-600">{member.tasksInProgress || 0}</p>
                                            <p className="text-xs text-gray-600">In Progress</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-600">{member.performanceScore || 0}%</p>
                                            <p className="text-xs text-gray-600">Performance</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === "Performance" && (
                    <div className="space-y-6">
                        <div className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border}`}>
                            <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                                <Filter size={20} /> Team Filter
                            </div>
                            <select onChange={e => setFilterTeam(e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} focus:ring-2 focus:ring-blue-500`}>
                                <option>All</option>
                                {[...new Set(performanceData.map(m => m.team))].map(team => (
                                    <option key={team}>{team}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredPerformance.map(member => (
                                <div key={member.name} className={`${theme.card} rounded-xl p-6 shadow-lg border ${theme.border}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{member.name}</h3>
                                                <span className="text-sm text-gray-500">{member.team} Team</span>
                                            </div>
                                        </div>
                                        <Award className="text-yellow-500" size={40} />
                                    </div>

                                    <ResponsiveContainer width="100%" height={280}>
                                        <RadarChart data={[
                                            { metric: "Productivity", value: member.productivity },
                                            { metric: "Quality", value: member.quality },
                                            { metric: "Teamwork", value: member.teamwork },
                                            { metric: "Reliability", value: member.reliability },
                                        ]}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="metric" />
                                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                                            <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                                            <Tooltip />
                                        </RadarChart>
                                    </ResponsiveContainer>

                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                                            <p className="text-3xl font-bold text-blue-600">{member.productivity}%</p>
                                            <p className="text-xs text-gray-600 mt-1">Productivity</p>
                                        </div>
                                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                                            <p className="text-3xl font-bold text-green-600">{member.quality}%</p>
                                            <p className="text-xs text-gray-600 mt-1">Quality</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add similar views for Budget, Materials, Equipment, Safety, Photos, Milestones, Risks, Comments */}
                {/* (Code continues with all other views following the same pattern...) */}

            </div>

            {/* Footer */}
            <div className={`${theme.card} border-t ${theme.border} mt-12`}>
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <FileText className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Report Generated By</p>
                                <p className="font-bold text-lg">Bakri Mohammed</p>
                                <p className="text-sm text-gray-600">Project Management Department</p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-500">Generated on</p>
                            <p className="font-semibold text-lg">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-xs text-gray-400 mt-1">{projectName}</p>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">© 2025 Project Management Dashboard - All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
}