import {arrayColorsCharts, axisMarginPerAxis, ONE, ZERO} from "../../consts";

export const drawLine = (ctx, data, key, color, yRatio, chartStartX, xStep, canvasHeight, margin) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  data?.forEach((point, index) => {
    const x = chartStartX + index * xStep;
    const y = canvasHeight - margin - point[key] * yRatio;
    if (index === ZERO) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
};

export const drawAxes = (ctx, chartStartX, margin, chartWidth, canvasHeight) => {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = ONE;
  ctx.beginPath();
  ctx.moveTo(chartStartX, margin);
  ctx.lineTo(chartStartX, canvasHeight - margin);
  ctx.lineTo(chartStartX + chartWidth, canvasHeight - margin);
  ctx.stroke();
};

export const drawVerticalAxes = (ctx, settings, data, chartHeight, margin, yRatio, canvasHeight) => {
  let offsetX = ZERO;
  settings.forEach((setting, index) => {
    if (setting.visible) {
      const color = arrayColorsCharts[index % 5];
      const individualMaxValue = Math.max(...data?.map(d => d[setting.key]));
      const individualYRatio = chartHeight / individualMaxValue;
      const axisX = margin + offsetX;

      ctx.strokeStyle = color;
      ctx.lineWidth = ONE;
      ctx.beginPath();
      ctx.moveTo(axisX, margin);
      ctx.lineTo(axisX, canvasHeight - margin);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(setting.label, axisX - 5, margin - 10);

      for (let i = ZERO; i <= 5; i++) {
        const yValue = individualMaxValue / 5 * i;
        const y = canvasHeight - margin - yValue * (setting.individualAxis ? individualYRatio : yRatio);
        ctx.fillText(yValue.toFixed(2), axisX - 5, y + 3);
        ctx.beginPath();
        ctx.moveTo(axisX, y);
        ctx.lineTo(axisX + 5, y);
        ctx.stroke();
      }

      offsetX += axisMarginPerAxis;
    }
  });
};

export const drawText = (ctx, data, chartWidth, chartStartX, xStep, canvasHeight, margin) => {
  const textHeight = 20;
  const maxLabels = Math.floor(chartWidth / textHeight);
  const interval = Math.max(ONE, Math.floor(data?.length / maxLabels));

  ctx.fillStyle = '#000';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  data?.forEach((point, index) => {
    if (index % interval === ZERO) {
      const x = chartStartX + index * xStep;
      const [month, year] = point["Месяц,год"].split('.');
      const dateStr = new Date(year, month - ONE).toLocaleString('ru', {month: 'long', year: 'numeric'});

      ctx.save();
      ctx.translate(x, canvasHeight - margin + 10);
      ctx.rotate(Math.PI / 2);
      ctx.textAlign = 'left';
      ctx.fillText(dateStr, ZERO, ZERO);
      ctx.restore();
    }
  });
};
