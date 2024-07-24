import React, { useEffect, useRef } from 'react';

const Chart = ({ data, settings }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 600;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const margin = 100;
    const axisMarginPerAxis = 70;
    const activeVerticalAxes = settings.filter(setting => setting.visible).length;
    const totalAxisMargin = axisMarginPerAxis * activeVerticalAxes;
    const chartWidth = canvas.width - margin - totalAxisMargin;
    const chartHeight = canvas.height - 2 * margin;
    const xStep = chartWidth / (data.length - 1);
    const maxValue = Math.max(...data.map(d => Math.max(...settings.filter(s => s.visible && !s.individualAxis).map(s => d[s.key]))));
    const yRatio = chartHeight / maxValue;
    const chartStartX = totalAxisMargin + margin;

    const drawLine = (data, key, color, yRatio) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      data.forEach((point, index) => {
        const x = chartStartX + index * xStep;
        const y = canvas.height - margin - point[key] * yRatio;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    };

    const drawAxes = () => {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(chartStartX, margin);
      ctx.lineTo(chartStartX, canvas.height - margin);
      ctx.lineTo(chartStartX + chartWidth, canvas.height - margin);
      ctx.stroke();
    };

    const drawVerticalAxes = () => {
      let offsetX = 0;
      settings.forEach((setting, index) => {
        if (setting.visible) {
          const color = ['#ff6347', '#4682b4', '#32cd32', '#ff69b4', '#ffa500'][index % 5];
          const individualMaxValue = Math.max(...data.map(d => d[setting.key]));
          const individualYRatio = chartHeight / individualMaxValue;
          const axisX = margin + offsetX;

          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(axisX, margin);
          ctx.lineTo(axisX, canvas.height - margin);
          ctx.stroke();

          ctx.fillStyle = color;
          ctx.font = '12px Arial';
          ctx.textAlign = 'right';
          ctx.fillText(setting.label, axisX - 5, margin - 10);

          for (let i = 0; i <= 5; i++) {
            const yValue = individualMaxValue / 5 * i;
            const y = canvas.height - margin - yValue * (setting.individualAxis ? individualYRatio : yRatio);
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

    const drawText = () => {
      const textHeight = 20;
      const maxLabels = Math.floor(chartWidth / textHeight);
      const interval = Math.max(1, Math.floor(data.length / maxLabels));

      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      data.forEach((point, index) => {
        if (index % interval === 0) {
          const x = chartStartX + index * xStep;
          const [month, year] = point["Месяц,год"].split('.');
          const dateStr = new Date(year, month - 1).toLocaleString('ru', { month: 'long', year: 'numeric' });

          ctx.save();
          ctx.translate(x, canvas.height - margin + 10);
          ctx.rotate(Math.PI / 2);
          ctx.textAlign = 'left';
          ctx.fillText(dateStr, 0, 0);
          ctx.restore();
        }
      });
    };

    drawAxes();
    drawText();

    settings.forEach((setting, index) => {
      if (setting.visible) {
        const color = ['#ff6347', '#4682b4', '#32cd32', '#ff69b4', '#ffa500'][index % 5];
        const individualMaxValue = Math.max(...data.map(d => d[setting.key]));
        const individualYRatio = chartHeight / individualMaxValue;
        drawLine(data, setting.key, color, setting.individualAxis ? individualYRatio : yRatio);
      }
    });

    drawVerticalAxes();
  }, [data, settings]);

  return <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }}></canvas>;
};

export default Chart;
