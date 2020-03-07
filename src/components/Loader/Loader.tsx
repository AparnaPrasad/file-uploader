import React from 'react';
interface Props {
    percent: number
}
const Loader = ({ percent }: Props) => {
    const radius = 58;
    //const percent = 4;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - percent / 100 * circumference;
    return <svg
        className="progress-ring"
        height="130"
        width="130"
    >
        <circle
            stroke='blue'
            strokeWidth="5"
            fill="transparent"
            r="58"
            cx="65"
            cy="65"
        />
        <circle
            className="progress-ring__circle"
            stroke='red'
            strokeWidth="5"
            fill="transparent"
            r="58"
            cx="65"
            cy="65"
            style={
                {
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: offset,
                    strokeLinecap: "round"
                }
            }

        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
            <tspan>
                {percent}
                <tspan baselineShift="super">
                    %
                    </tspan>
            </tspan>
        </text>
    </svg>
}

export default Loader;