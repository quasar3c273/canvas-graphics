import React, { useEffect, useRef } from 'react';
import {
  arrayColorsCharts,
  axisMarginPerAxis,
  canvasHeight,
  margin, ONE,
  paddingCanvas,
  ZERO
} from "../../consts";
import {drawAxes, drawLine, drawText, drawVerticalAxes} from "./utils";

const Chart = ({ data, settings }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = '#fff';
    ctx.fillRect(ZERO, ZERO, canvas.width, canvas.height);

    const activeVerticalAxes = settings.filter(setting => setting.visible).length;
    const totalAxisMargin = axisMarginPerAxis * activeVerticalAxes;
    const chartWidth = canvas.width - margin - totalAxisMargin - paddingCanvas;
    const chartHeight = canvas.height - 2 * margin;
    const xStep = chartWidth / (data?.length - ONE);
    const maxValue = Math.max(...data?.map(d => Math.max(...settings.filter(s => s.visible && !s.individualAxis).map(s => d[s.key]))));
    const yRatio = chartHeight / maxValue;
    const chartStartX = totalAxisMargin + margin;

    drawAxes(ctx, chartStartX, margin, chartWidth, canvas.height);
    drawText(ctx, data, chartWidth, chartStartX, xStep, canvas.height, margin);

    settings.forEach((setting, index) => {
      if (setting.visible) {
        const color = arrayColorsCharts[index % 5];
        const individualMaxValue = Math.max(...data?.map(d => d[setting.key]));
        const individualYRatio = chartHeight / individualMaxValue;

        drawLine(
          ctx,
          data,
          setting.key,
          color,
          setting.individualAxis ? individualYRatio : yRatio,
          chartStartX,
          xStep,
          canvas.height,
          margin
        );
      }
    });

    drawVerticalAxes(ctx, settings, data, chartHeight, margin, yRatio, canvas.height);
  }, [data, settings]);

  return <canvas className="canvasBlock" ref={canvasRef} />;
};

export default Chart;
