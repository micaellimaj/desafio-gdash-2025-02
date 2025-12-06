"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, Wind, Eye, Gauge, TrendingUp, Download, Loader } from "lucide-react"

const API_BASE_URL = "http://localhost:4000"

export default function Dashboard() {
  const router = useRouter()
  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [temperatureData, setTemperatureData] = useState<any[]>([])
  const [humidityData, setHumidityData] = useState<any[]>([])
  const [windData, setWindData] = useState<any[]>([])
  const [tempHumidityData, setTempHumidityData] = useState<any[]>([])
  const [conditionsData, setConditionsData] = useState<any[]>([])
  const [extremes, setExtremes] = useState<any>(null)
  const [weatherLogs, setWeatherLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [isMounted, setIsMounted] = useState(false);
  const [scatterTempHumidityData, setScatterTempHumidityData] = useState<any[]>([]);


  useEffect(() => {
        setIsMounted(true); 
    }, []); 

      const fetchWeatherData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("ERRO: Token JWT não encontrado. Redirecionando...");
          router.push("/sign-in");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        try {
          setLoading(true);

          const [
            logsRes,
            tempRes,
            humidityRes,
            windRes,
            tempHumidityRes,
            conditionsRes,
            extremesRes,
            scatterTempHumidityRes,
          ] = await Promise.all([
            fetch(`${API_BASE_URL}/weather/logs?limit=50`, { headers }),
            fetch(`${API_BASE_URL}/weather/chart/temperature`, { headers }),
            fetch(`${API_BASE_URL}/weather/chart/humidity`, { headers }),
            fetch(`${API_BASE_URL}/weather/chart/wind`, { headers }),
            fetch(`${API_BASE_URL}/weather/chart/temp-humidity`, { headers }),
            fetch(`${API_BASE_URL}/weather/chart/conditions`, { headers }),
            fetch(`${API_BASE_URL}/weather/chart/extremes`, { headers }),
            fetch(`${API_BASE_URL}/weather/chart/scatter-temp-humidity`, { headers })
          ]);

          const logs = await logsRes.json();
          const temps = await tempRes.json();
          const humidity = await humidityRes.json();
          const wind = await windRes.json();
          const tempHumidity = await tempHumidityRes.json();
          const conditions = await conditionsRes.json();
          const extremesData = await extremesRes.json();
          const scatterTempHumidity = await scatterTempHumidityRes.json();


          const safeConditions = Array.isArray(conditions) ? conditions : [];
          const safeLogs = Array.isArray(logs) ? logs : [];
          const safeTemps = Array.isArray(temps) ? temps : [];
          const safeHumidity = Array.isArray(humidity) ? humidity : [];
          const safeWind = Array.isArray(wind) ? wind : [];
          const safeTempHumidity = Array.isArray(tempHumidity) ? tempHumidity : [];
          const safeScatter = Array.isArray(scatterTempHumidity) ? scatterTempHumidity : [];


          const mappedScatter = safeScatter.map((item) => ({
            temperatureCelsius: item.temperatureCelsius,
            humidityPercent: item.humidityPercent,
            windSpeedMS: item.windSpeedMS,
            timestamp: item.timestamp,
          }));

          const mappedTempHumidity = safeTempHumidity.map((item) => ({
            timestamp: item.timestamp,
            temperatureCelsius: item.temperatureCelsius,
            humidityPercent: item.humidityPercent,
          }));

          setWeatherLogs(safeLogs);
          setTemperatureData(safeTemps);
          setHumidityData(safeHumidity);
          setWindData(safeWind);
          setTempHumidityData(mappedTempHumidity);
          setConditionsData(safeConditions);
          setExtremes(extremesData);
          setScatterTempHumidityData(mappedScatter);


          if (safeLogs.length > 0) {
            setCurrentWeather(safeLogs[0]);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setLoading(false);
        }
      };


    useEffect(() => {
      if (isMounted) {
          fetchWeatherData();
}
}, [isMounted, router]);

  const handleExportCSV = async () => {
    try {
      setExporting(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token JWT não encontrado.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/weather/export.csv`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `weather_logs_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error("Error exporting CSV:", error);
    } finally {
      setExporting(false);
    }
  };


  const handleExportXLSX = async () => {
    try {
      setExporting(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token JWT não encontrado.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/weather/export.xlsx`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `weather_logs_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error("Error exporting XLSX:", error);
    } finally {
      setExporting(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Weather Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time weather insights and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            disabled={exporting}
            className="flex items-center gap-2 bg-transparent"
          >
            <Download size={16} />
            {exporting ? "Exporting..." : "Export CSV"}
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
            onClick={handleExportXLSX}
            disabled={exporting}
          >
            <Download size={16} />
            {exporting ? "Exporting..." : "Export XLSX"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Current Temperature</p>
            <p className="text-4xl font-bold text-foreground mt-2">
              {currentWeather?.temperatureCelsius ? `${currentWeather.temperatureCelsius.toFixed(1)}°C` : "N/A"}
            </p>
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp size={14} /> Updated now
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl">
            <Gauge className="w-6 h-6 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Humidity</p>
            <p className="text-4xl font-bold text-foreground mt-2">
              {currentWeather?.humidityPercent ? `${currentWeather.humidityPercent}%` : "N/A"}
            </p>
            <p className="text-sm text-green-600 mt-2">
              {currentWeather?.humidityPercent > 70
                ? "High"
                : currentWeather?.humidityPercent > 40
                  ? "Comfortable"
                  : "Low"}
            </p>
          </div>
          <div className="bg-emerald-100 p-4 rounded-xl">
            <Droplet className="w-6 h-6 text-emerald-500" />
          </div>
        </Card>

        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Wind Speed</p>
            <p className="text-4xl font-bold text-foreground mt-2">
              {currentWeather?.windSpeedMS ? `${(currentWeather.windSpeedMS * 3.6).toFixed(1)} km/h` : "N/A"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {currentWeather?.windSpeedMS < 5 ? "Calm" : currentWeather?.windSpeedMS < 15 ? "Light breeze" : "Windy"}
            </p>
          </div>
          <div className="bg-orange-100 p-4 rounded-xl">
            <Wind className="w-6 h-6 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6 flex items-start justify-between bg-white border border-border hover:shadow-lg transition-shadow">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground font-medium">Condition</p>
            <p className="text-2xl font-bold text-foreground mt-2 line-clamp-2">
              {currentWeather?.conditionDescription || "N/A"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">Current conditions</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl">
            <Eye className="w-6 h-6 text-purple-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <Card className="p-6 bg-white border border-border shadow-lg">
    <h2 className="text-lg font-semibold text-foreground mb-4">Temperature Timeline</h2>
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={temperatureData}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="timestamp"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
            labelFormatter={(value) => new Date(value).toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey="temperatureCelsius"
            stroke="#ef4444"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTemp)"
            name="Temperature (°C)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>

  <Card className="p-6 bg-slate-900 border-0 shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Humidity Composition</h2>
        <p className="text-sm text-slate-400 mt-1">Moisture level analysis</p>
      </div>
    </div>
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={humidityData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
          <XAxis
            dataKey="timestamp"
            stroke="rgb(148,163,184)"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis stroke="rgb(148,163,184)" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelFormatter={(value) => new Date(value).toLocaleString()}
          />
          <Legend wrapperStyle={{ color: "#94a3b8" }} />
          <Bar dataKey="humidityPercent" fill="#10b981" radius={[4, 4, 0, 0]} name="Humidity (%)" />
          <Line
            type="monotone"
            dataKey="humidityPercent"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={false}
            name="Humidity Trend"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </Card>

  <Card className="p-6 bg-white border border-border shadow-lg">
    <h2 className="text-lg font-semibold text-foreground mb-4">Wind Speed Trends</h2>
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={windData}>
          <defs>
            <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="timestamp"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            labelFormatter={(value) => new Date(value).toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey="windSpeedMS"
            stroke="#f97316"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorWind)"
            name="Wind Speed (m/s)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>

  <Card className="p-6 bg-white border border-border shadow-lg">
    <h2 className="text-lg font-semibold text-foreground mb-4">Weather Conditions Distribution</h2>
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={conditionsData} dataKey="count" nameKey="condition" cx="50%" cy="50%" outerRadius={70} label>
            {Array.isArray(conditionsData) &&
              conditionsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][index % 5]} />
              ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </Card>

  {/* Temp × Humidity Correlation (LEFT of the pair) */}
  <Card className="p-6 bg-white border border-border shadow-lg">
    <h2 className="text-lg font-semibold text-foreground mb-4">Temperature & Humidity Correlation</h2>
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="temperatureCelsius"
            type="number"
            name="Temperature (°C)"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            dataKey="humidityPercent"
            type="number"
            name="Humidity (%)"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Temp vs Humidity" data={tempHumidityData} fill="#0ea5e9" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </Card>

  {/* Wind × Humidity × Temp (RIGHT of the pair) */}
  <Card className="p-6 bg-slate-900 border-0 shadow-lg">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Wind × Humidity × Temp</h2>
        <p className="text-sm text-slate-400 mt-1">Wind impact on moisture (temp-colored)</p>
      </div>
    </div>

    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />

          <XAxis
            dataKey="windSpeedMS"
            type="number"
            name="Wind (m/s)"
            stroke="rgb(148,163,184)"
            style={{ fontSize: "12px" }}
          />

          <YAxis
            dataKey="humidityPercent"
            type="number"
            name="Humidity (%)"
            stroke="rgb(148,163,184)"
            style={{ fontSize: "12px" }}
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value, name) => {
              if (name === "windSpeedMS") return [`${value} m/s`, "Wind"];
              if (name === "humidityPercent") return [`${value}%`, "Humidity"];
              if (name === "temperatureCelsius") return [`${value}°C`, "Temp"];
              return [value, name];
            }}
          />

          <Scatter name="Wind × Humidity × Temp" data={scatterTempHumidityData} fill="#3b82f6" shape="circle">
            {scatterTempHumidityData.map((item, index) => {
              const temp = item.temperatureCelsius || 0;

              const color =
                temp < 20 ? "#0ea5e9" : temp < 28 ? "#22c55e" : temp < 33 ? "#eab308" : "#ef4444";

              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  </Card>
</div>

      {extremes && (
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Weather Extremes & Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Max Temperature */}
            <div className="p-4 rounded-xl bg-background/60 shadow-sm border">
              <p className="text-sm text-muted-foreground">Highest Temperature</p>
              <p className="text-3xl font-bold text-foreground">
                {extremes.maxTemperature?.temperatureCelsius?.toFixed(1)}°C
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {extremes.maxTemperature?.city} —{" "}
                {new Date(extremes.maxTemperature?.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {extremes.maxTemperature?.conditionDescription}
              </p>
            </div>

            {/* Min Temperature */}
            <div className="p-4 rounded-xl bg-background/60 shadow-sm border">
              <p className="text-sm text-muted-foreground">Lowest Temperature</p>
              <p className="text-3xl font-bold text-foreground">
                {extremes.minTemperature?.temperatureCelsius?.toFixed(1)}°C
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {extremes.minTemperature?.city} —{" "}
                {new Date(extremes.minTemperature?.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {extremes.minTemperature?.conditionDescription}
              </p>
            </div>

            {/* Max Humidity */}
            <div className="p-4 rounded-xl bg-background/60 shadow-sm border">
              <p className="text-sm text-muted-foreground">Max Humidity</p>
              <p className="text-3xl font-bold text-foreground">
                {extremes.maxHumidity?.humidityPercent}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {extremes.maxHumidity?.city} —{" "}
                {new Date(extremes.maxHumidity?.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {extremes.maxHumidity?.conditionDescription}
              </p>
            </div>

            {/* Min Humidity */}
            <div className="p-4 rounded-xl bg-background/60 shadow-sm border">
              <p className="text-sm text-muted-foreground">Min Humidity</p>
              <p className="text-3xl font-bold text-foreground">
                {extremes.minHumidity?.humidityPercent}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {extremes.minHumidity?.city} —{" "}
                {new Date(extremes.minHumidity?.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {extremes.minHumidity?.conditionDescription}
              </p>
            </div>

            {/* Max Wind */}
            <div className="p-4 rounded-xl bg-background/60 shadow-sm border">
              <p className="text-sm text-muted-foreground">Max Wind Speed</p>
              <p className="text-3xl font-bold text-foreground">
                {extremes.maxWindSpeed?.windSpeedMS?.toFixed(1)} m/s
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {extremes.maxWindSpeed?.city} —{" "}
                {new Date(extremes.maxWindSpeed?.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {extremes.maxWindSpeed?.conditionDescription}
              </p>
            </div>

            {/* Min Wind */}
            <div className="p-4 rounded-xl bg-background/60 shadow-sm border">
              <p className="text-sm text-muted-foreground">Min Wind Speed</p>
              <p className="text-3xl font-bold text-foreground">
                {extremes.minWindSpeed?.windSpeedMS?.toFixed(1)} m/s
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {extremes.minWindSpeed?.city} —{" "}
                {new Date(extremes.minWindSpeed?.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {extremes.minWindSpeed?.conditionDescription}
              </p>
            </div>

          </div>
        </Card>
      )}


      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Weather Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Date/Time</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Condition</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Temperature</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Humidity</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Wind Speed</th>
              </tr>
            </thead>
            <tbody>
              {weatherLogs.slice(0, 10).map((log, index) => (
                <tr key={index} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="py-3 px-4 text-sm">{new Date(log.timestamp).toLocaleString("pt-BR")}</td>
                  <td className="py-3 px-4 text-sm">{log.conditionDescription}</td>
                  <td className="py-3 px-4 text-sm font-medium">{log.temperatureCelsius.toFixed(1)}°C</td>
                  <td className="py-3 px-4 text-sm">{log.humidityPercent}%</td>
                  <td className="py-3 px-4 text-sm">{(log.windSpeedMS * 3.6).toFixed(1)} km/h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
