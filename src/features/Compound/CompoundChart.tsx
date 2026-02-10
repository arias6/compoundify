"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface Result {
  step: number;
  amount: string;
}

interface Props {
  results: Result[];
}

export default function CompoundChart({ results }: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          if (Array.isArray(params) && params.length > 0) {
            const p = params[0];
            const axisVal = "axisValue" in p ? p.axisValue : p.name;
            const value = "data" in p ? p.data : 0;
            return `Step ${axisVal}: $${value}`;
          }
          return "";
        },
      },
      xAxis: {
        type: "category",
        name: "Step",
        data: results.map((r) => r.step.toString()),
        axisLine: { lineStyle: { color: "#cbd5e1" } },
      },
      yAxis: {
        type: "value",
        name: "Amount ($)",
        axisLine: { lineStyle: { color: "#cbd5e1" } },
      },
      series: [
        {
          type: "line",
          data: results.map((r) => parseFloat(r.amount)),
          smooth: true,
          lineStyle: { width: 3, color: "#fe4066" },
          itemStyle: { color: "#fe4066" },
          areaStyle: { color: "rgba(254,64,102,0.2)" },
        },
      ],
      grid: { left: "10%", right: "10%", top: "20%", bottom: "15%" },
    };

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
    };
  }, [results]);

  return <div ref={chartRef} style={{ width: "100%", height: "250px" }} />;
}
