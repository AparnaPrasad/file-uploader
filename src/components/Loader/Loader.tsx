import React from 'react';
import palette from '../../utilities/palette'; 
import './loader.css';
interface Props {
    percent: number,
    width?: number,
    strokeWidth?: number,
    loaderBackground?: string,
    loaderColor?: string
}
const Loader = ({ percent, width = 120, strokeWidth = 5,
    loaderColor = palette.primaryBlue,
    loaderBackground = palette.lightGrey

}: Props) => {
    const radius = (width - (strokeWidth * 2))/2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - percent / 100 * circumference;
    const padding = 2;
    const containerSize = width + padding;
    const offsetXY = containerSize/2
    return <svg
        className="progress-ring"
        height={containerSize}
        width={containerSize}>
        <circle
            stroke={loaderBackground}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={offsetXY}
            cy={offsetXY}
        />
        <circle
            className="progress-ring__circle"
            stroke={loaderColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={offsetXY}
            cy={offsetXY}
            style={
                {
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: offset,
                    strokeLinecap: "round"
                }
            }

        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
            <tspan className={'progress-percent'}>
                {percent}
            </tspan>
            <tspan baselineShift="super" className={'percent-tspan'}>
                %
            </tspan>
        </text>
    </svg>
}

export default Loader;