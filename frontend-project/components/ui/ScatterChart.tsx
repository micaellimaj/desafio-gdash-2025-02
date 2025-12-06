"use client";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    timestamp: string;
    temperatureCelsius: number;
    humidityPercent: number;
    windSpeed: number;
  }[];
}

export default function WindColoredScatterChart({ data }: Props) {
  return (
    <div className="p-6 bg-slate-900 border-0 shadow-lg rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Temp × Humidity × WindSpeed
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Scatter plot colored by wind intensity
          </p>
        </div>
      </div>

      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />

            {/* eixo X = temperatura */}
            <XAxis
              type="number"
              dataKey="temperatureCelsius"
              name="Temperature (°C)"
              stroke="rgb(148,163,184)"
              style={{ fontSize: "12px" }}
            />

            {/* eixo Y = umidade */}
            <YAxis
              type="number"
              dataKey="humidityPercent"
              name="Humidity (%)"
              stroke="rgb(148,163,184)"
              style={{ fontSize: "12px" }}
            />

            {/* cor dinâmica pelo vento */}
            <ZAxis
              type="number"
              dataKey="windSpeed"
              name="Wind Speed (m/s)"
              range={[80, 400]} // tamanho/brightness
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: any, name: string) => {
                if (name === "temperatureCelsius")
                  return [`${value} °C`, "Temperature"];
                if (name === "humidityPercent")
                  return [`${value}%`, "Humidity"];
                if (name === "windSpeed")
                  return [`${value} m/s`, "Wind Speed"];
                return value;
              }}
            />

            <Scatter
              data={data}
              fill="#3b82f6"
              stroke="#93c5fd"
              name="Samples"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
