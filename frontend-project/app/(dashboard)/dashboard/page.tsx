"use client"

import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, Wind, Eye, Gauge, TrendingUp, Settings } from "lucide-react"

const temperatureData = [
  { time: "00:00", temp: 22, humidity: 65 },
  { time: "04:00", temp: 20, humidity: 72 },
  { time: "08:00", temp: 24, humidity: 58 },
  { time: "12:00", temp: 28, humidity: 45 },
  { time: "16:00", temp: 26, humidity: 52 },
  { time: "20:00", temp: 23, humidity: 68 },
]

const rainProbabilityData = [
  { day: "Mon", probability: 10 },
  { day: "Tue", probability: 25 },
  { day: "Wed", probability: 60 },
  { day: "Thu", probability: 75 },
  { day: "Fri", probability: 40 },
  { day: "Sat", probability: 15 },
  { day: "Sun", probability: 5 },
]

const weatherRecords = [
  {
    date: "2025-11-29 14:30",
    location: "São Paulo, SP",
    condition: "Partly Cloudy",
    temp: 28,
    humidity: 45,
  },
  {
    date: "2025-11-29 13:00",
    location: "São Paulo, SP",
    condition: "Sunny",
    temp: 29,
    humidity: 42,
  },
  {
    date: "2025-11-29 11:30",
    location: "São Paulo, SP",
    condition: "Sunny",
    temp: 26,
    humidity: 55,
  },
]

const COLORS = ["#1a8b7e", "#0ea5e9", "#f59e0b", "#ef4444"]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Painel meteorológico</h1>
          <p className="text-muted-foreground mt-1">Toritama, PE - Informações meteorológicas em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Exportar CSV</Button>
          <Button className="bg-primary hover:bg-primary/90">Exportar XLSX</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Current Temperature</p>
            <p className="text-4xl font-bold text-foreground mt-2">28°C</p>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> +2% from average
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl">
            <Gauge className="w-6 h-6 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Humidity</p>
            <p className="text-4xl font-bold text-foreground mt-2">45%</p>
            <p className="text-sm text-green-600 mt-2">Comfortable level</p>
          </div>
          <div className="bg-emerald-100 p-4 rounded-xl">
            <Droplet className="w-6 h-6 text-emerald-500" />
          </div>
        </Card>

        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Wind Speed</p>
            <p className="text-4xl font-bold text-foreground mt-2">12 km/h</p>
            <p className="text-sm text-muted-foreground mt-2">Light breeze</p>
          </div>
          <div className="bg-orange-100 p-4 rounded-xl">
            <Wind className="w-6 h-6 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Visibility</p>
            <p className="text-4xl font-bold text-foreground mt-2">10 km</p>
            <p className="text-sm text-muted-foreground mt-2">Excellent visibility</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl">
            <Eye className="w-6 h-6 text-purple-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-slate-900 border-0 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-6">Temperature Trend</h2>
          <p className="text-sm text-slate-400 mb-4">(+23%) than last week</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
                <XAxis dataKey="time" stroke="rgb(148,163,184)" style={{ fontSize: "12px" }} />
                <YAxis stroke="rgb(148,163,184)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="var(--color-primary)"
                  dot={{ fill: "var(--color-primary)", r: 4 }}
                  name="Temperature"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-6 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="text-sm text-slate-300">Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-slate-300">Clicks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-slate-300">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-300">Items</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">36K</p>
              <p className="text-xs text-slate-400 mt-1">Users</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">2M</p>
              <p className="text-xs text-slate-400 mt-1">Clicks</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">$435</p>
              <p className="text-xs text-slate-400 mt-1">Sales</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">43</p>
              <p className="text-xs text-slate-400 mt-1">Items</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-border shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Rain Probability (7 days)</h2>
              <p className="text-sm text-green-600 mt-1">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                4% more in 2021
              </p>
            </div>
            <button className="p-2 hover:bg-secondary rounded-lg">
              <Settings size={18} className="text-muted-foreground" />
            </button>
          </div>
          <div className="h-[200px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rainProbabilityData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Area
                  type="monotone"
                  dataKey="probability"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="probability"
                  stroke="#1e3a8a"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <span>🤖</span> AI Weather Insights
        </h2>
        <div className="space-y-3 text-foreground">
          <p>
            <strong>Current Conditions:</strong> Partly cloudy skies with comfortable temperatures. The current humidity
            level of 45% is ideal for outdoor activities.
          </p>
          <p>
            <strong>Forecast Alert:</strong> High chance of rain expected on Wednesday and Thursday (60-75%
            probability). We recommend planning indoor activities for those days.
          </p>
          <p>
            <strong>Recommendation:</strong> Pleasant weather continuing for the next 2 days. It's an excellent time for
            outdoor events or recreation.
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Weather Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date/Time</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Condition</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Temp</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Humidity</th>
              </tr>
            </thead>
            <tbody>
              {weatherRecords.map((record, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 text-foreground">{record.date}</td>
                  <td className="py-3 px-4 text-foreground">{record.location}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {record.condition}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground font-semibold">{record.temp}°C</td>
                  <td className="py-3 px-4 text-foreground">{record.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
